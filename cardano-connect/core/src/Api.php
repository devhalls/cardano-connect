<?php

namespace WPCC;

use WPCC\Connect\Base as ConnectBase;
use WPCC\Connect\Response;
use WPCC\Connect\Providers\Upstream;
use WPCC\Connect\Providers\BlockFrost;

class Api extends Base
{
	public ConnectBase $connectSignerProvider;
	public ConnectBase $connectDataProvider;

    /**
     * @inheritDoc
     */
    public function run(): void
    {
        add_action( 'rest_api_init', [$this, 'registerApi'] );

		// Set signer provider.
	    $endpoint = $this->getSetting(self::SETTING_PREFIX.'endpoint');
		$this->connectSignerProvider = new Upstream( $endpoint );

		// Set chain data provider.
	    $endpoint = $this->getSetting(self::SETTING_PREFIX.'assets_api_endpoint');
	    $api_key = $this->getSetting(self::SETTING_PREFIX.'assets_api_key');
		$this->connectDataProvider = new BlockFrost( $endpoint,  $api_key );
    }

    /**
     * Registers custom API endpoints for authentication flow.
     * /cardano-connect/connect
     * /cardano-connect/disconnect
     * /cardano-connect/options
     * /cardano-connect/user
     * @return void
     */
    public function registerApi(): void
    {
	    register_rest_route(
		    $this->plugin_name,
		    '/user/',
		    [
			    'methods'  => 'GET',
			    'callback' => [$this, 'getUser'],
			    'permission_callback' => '__return_true'
		    ]
	    );
	    register_rest_route(
		    $this->plugin_name,
		    '/options/',
		    [
			    'methods'  => 'GET',
			    'callback' => [$this, 'getOptions'],
			    'permission_callback' => '__return_true'
		    ]
	    );
        register_rest_route(
            $this->plugin_name,
            '/connect/',
            [
                'methods'  => 'POST',
                'callback' => [$this, 'connect'],
                'permission_callback' => '__return_true'
            ]
        );
        register_rest_route(
            $this->plugin_name,
            '/disconnect/',
            [
                'methods'  => 'GET',
                'callback' => [$this, 'disconnect'],
                'permission_callback' => '__return_true'
            ]
        );
	    register_rest_route(
		    $this->plugin_name,
		    '/asset/(?P<id>[a-zA-Z0-9-]+)',
		    [
			    'methods'  => 'GET',
			    'callback' => [$this, 'getAsset'],
			    'permission_callback' => '__return_true'
		    ]
	    );
	    register_rest_route(
		    $this->plugin_name,
		    '/pools/',
		    [
			    'methods'  => 'GET',
			    'callback' => [$this, 'getStakePools'],
			    'permission_callback' => '__return_true'
		    ]
	    );
	    register_rest_route(
		    $this->plugin_name,
		    '/pool/(?P<id>[a-zA-Z0-9-]+)',
		    [
			    'methods'  => 'GET',
			    'callback' => [$this, 'getPool'],
			    'permission_callback' => '__return_true'
		    ]
	    );
	    register_rest_route(
		    $this->plugin_name,
		    '/rewards/',
		    [
			    'methods'  => 'GET',
			    'callback' => [$this, 'getStakeHistory'],
			    'permission_callback' => '__return_true'
		    ]
	    );
    }

	// Locally provided.

	/**
	 * Get the current authenticated user and their metadata.
	 * Returns empty user object with ID=0 if not logged in.
	 * @route /cardano-connect/user
	 */
	public function getUser(): array
	{
		return $this->returnResponse(true, $this->getCurrentUser());
	}

	/**
	 * Get the plugin options.
	 * @route /cardano-connect/options
	 */
	public function getOptions(): array
	{
		return $this->returnResponse(
			true,
			$this->options
		);
	}

	// Connect signer provider.

    /**
     * API endpoint handle.
     * @route /cardano-connect/connect
     */
    public function connect( $request ): array
    {
        // Define local data
	    $data = [];
	    $success = false;
	    $params = $request->get_params();
	    $current_user = $this->getCurrentUser();
	    $stake_address = $this->sanitizeText($params['stake_address']) ?: null;
	    $user_name = $stake_address ? md5($stake_address) : null;
	    $network = $params['network'] === 1 ? 'mainnet' : 'testnet';
	    $address = $this->sanitizeText($params['address']) ?: null;
	    $wallet = $this->sanitizeText($params['wallet']) ?: null;

		// Check white and black lists
	    if (!$this->checkUserList([$stake_address, $address])) {
		    return $this->returnResponse( false, [], __('Account is not allowed', 'cardano-connect') );
	    }

		// Validate the signed message, return on fail
		$signature        = $params['signature'] ?: [];
		$signature_key    = $this->sanitizeText( $signature['key'] ) ?: '';
		$signature_signed = $this->sanitizeText( $signature['signature'] ) ?: '';
		$message          = $this->sanitizeText( $params['message'] ) ?: '';
		$validated        = $this->checkSignature( $stake_address, $message, $signature_key, $signature_signed );
		if ( ! $validated->success ) {
			return $this->returnResponse( false, (array) $validated, __( 'Signature validation failed', 'cardano-connect' ) );
		}

		// Format user wallet metadata
	    $user_meta_data = array_filter([
		    'cardano_connect_network' => $network,
		    'cardano_connect_wallet' => $wallet ?: null,
		    'cardano_connect_address' => $network !== 'testnet' ? $address : null,
		    'cardano_connect_stake_address' => $network !== 'testnet' ? $stake_address : null,
		    'cardano_connect_address_testnet' => $network === 'testnet' ? $address : null,
		    'cardano_connect_stake_address_testnet' => $network === 'testnet' ? $stake_address : null,
	    ]);

		// Load the user by address
	    $user = $this->getUserByAddress($stake_address);
	    $user_id = $user['user']->ID ?? null;
	    $user_addr_field = $network === 'testnet' ? 'cardano_connect_address_testnet' : 'cardano_connect_address';

		// Check if user has a wallet for the network already
		if ( !empty($current_user['web3'][$user_addr_field]) ) {
			return $this->returnResponse(
				false,
				$data,
				$this->options['label_invalid_account']
			);
	    }

	    // If current_user has no saved address for the requested network we assign them this address.
	    if ( !empty($current_user['user']) ) {
		    $user_id = $current_user['user']->ID;
	    }

        // Try to create a new user
        if ( !$user_id ) {
            $user_id = wp_insert_user([
                'user_login' => $user_name,
                'user_pass' => wp_generate_password(32),
                'role' =>  $this->getSetting(self::SETTING_PREFIX.'user_role') ?: 'subscriber'
            ]);
            if ( is_wp_error($user_id) ) {
                $message = $this->translateErrorCode($user_id->get_error_code());
            } else {
	            $passed = true;
				foreach ($user_meta_data as $data_key => $data_value) {
					if (!add_user_meta($user_id, $data_key, $data_value)) {
						$passed = false; break;
					}
				}
				if (!$passed) {
                    $message = $this->translateErrorCode('incomplete_account_setup');
                } else {
                    $success = true;
                    $message = $this->options['label_welcome_new'];
                }
            }
        }

		// Else update connection data for the user
		else {
	        foreach ($user_meta_data as $data_key => $data_value) {
		        update_user_meta($user_id, $data_key, $data_value);
	        }
            $message = $this->options['label_welcome_back'];
            $success = true;
        }

        // Authenticate the user if there is no error
        if ( $success ) {
            wp_set_current_user( $user_id );
            wp_set_auth_cookie( $user_id );
            $data = $this->getCurrentUser();
            return $this->returnResponse( true, $data, $message );
        }

        // Or return the error
        return $this->returnResponse( false, $data, $message );
    }

    /**
     * Disconnect a user (log out from WordPress session).
     * @route /cardano-connect/disconnect
     */
    public function disconnect(): array
    {
        wp_clear_auth_cookie();
        return $this->returnResponse(true, [], $this->options['label_disconnect_prompt']);
    }

	// Connect chain data provider.

	/**
	 * Get an assets data from the external db-sync API.
	 * @route /cardano-connect/asset/{id}
	 */
	public function getAsset( $data ): array
	{
		$asset_id = $this->sanitizeText($data['id']) ?: null;
		$data = $this->connectDataProvider->getAsset($asset_id);
		if ($data->success) {
			return $this->returnResponse(
				true,
				(array) $data->response
			);
		}
		return $this->returnResponse(
			false,
			[]
		);
	}

	public function getStakePools( $data ): array
	{
		$page = $data->get_param('page') ?: 1;
		$per_page = $data->get_param('perPage') ?: 10;
		$data = $this->connectDataProvider->getStakePools($page, $per_page);
		if ($data->success) {
			return $this->returnResponse(
				true,
				[
					'total' => 3000,
					'items' => (array) $data->response
				]
			);
		}
		return $this->returnResponse(
			false,
			[]
		);
	}

	public function getPool( $data ): array
	{
		$pool_id = $this->sanitizeText($data['id']) ?: null;
		$data = $this->connectDataProvider->getStakePoolData($pool_id);
		$metadata = $this->connectDataProvider->getStakePoolMetaData($pool_id);
		if ($metadata->success) {
			$metadata_array = (array) $metadata->response;
			$metadata_file = $this->connectDataProvider->getStakePoolMetadataFile($metadata_array['url']);
			$metadata_file_array = $metadata_file->success ? (array) $metadata_file->response : null;
			if (isset($metadata_file_array['extended'])) {
				$metadata_file_extended = $this->connectDataProvider->getStakePoolMetadataFile($metadata_file_array['extended']);
				$metadata_file_extended_array = $metadata_file_extended->success ? (array) $metadata_file_extended->response : null;
			} else {
				$metadata_file_extended_array = null;
			}
			return $this->returnResponse(
				true,
				[
					'data' => (array) $data->response,
					'metadata' => $metadata_array,
					'metadata_file' => $metadata_file_array,
					'metadata_file_extended' => $metadata_file_extended_array
				]
			);
		}
		return $this->returnResponse(
			false,
			[$pool_id]
		);
	}

	/**
	 * Get a users reward history data from the external db-sync API.
	 * @route /cardano-connect/rewards
	 */
	public function getStakeHistory(): array
	{
		$user_data = $this->getCurrentUser();
		$address = $user_data['web3']['cardano_connect_network'] === 'mainnet'
			? $user_data['web3']['cardano_connect_stake_address']
			: $user_data['web3']['cardano_connect_stake_address_testnet'];
		$data = $this->connectDataProvider->getStakeHistory($address);
		if ($data->success) {
			return $this->returnResponse(
				true,
				(array) $data->response
			);
		}
		return $this->returnResponse(
			false,
			[]
		);
	}

	// Private helper methods.

    /**
     * Return a formatted API response with a new wp_create_nonce( 'wp_rest' ).
     * @param string|null $message
     */
    private function returnResponse(bool $success, array $data, string $message = '' ): array
    {
        return [
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'nonce' => wp_create_nonce( 'wp_rest' )
        ];
    }

	/**
	 * Call external API to validate the signature was signed by the address.
	 */
	private function checkSignature(string $stake_address, string $message, string $signature_key, string $signature_signed): Response
	{
		return $this->connectSignerProvider->verify($stake_address, $message, $signature_key, $signature_signed);
	}

	/**
	 * Check if user is allowed to access the site based on whitelist and blacklist configs.
	 */
	private function checkUserList(array $addresses): bool
	{
		$allowed = false;
		$user_whitelist = $this->getSetting(self::SETTING_PREFIX.'user_whitelist');
		$user_blacklist = $this->getSetting(self::SETTING_PREFIX.'user_blacklist');
		$user_whitelist = $user_whitelist ? explode(' ', $user_whitelist) : null;
		$user_blacklist = $user_blacklist ? explode(' ', $user_blacklist) : null;
		if (empty($user_whitelist) && empty($user_blacklist)) {
			$allowed = true;
		}
		else {
			foreach ($addresses as $address) {
				if ( ! empty( $user_whitelist ) && in_array( $address, $user_whitelist, true ) ) {
					$allowed = true;
				}
				if ( ! empty( $user_blacklist ) && in_array( $address, $user_blacklist, true ) ) {
					$allowed = false;
				}
			}
		}
		return $allowed;
	}
}