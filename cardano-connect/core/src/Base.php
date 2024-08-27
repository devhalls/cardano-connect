<?php

namespace WPCC;

abstract class Base
{
    /**
     * Namespacing for the plugin settings.
     * @var string
     **/
    public const SETTING_PREFIX = 'wpcc_settings_';

	/**
	 * @var string[]
	 */
	public const SETTING_FIELD_NAMES = [
		self::SETTING_PREFIX . 'version',
		self::SETTING_PREFIX . 'plugin_name',
		self::SETTING_PREFIX . 'mainnet_active',
		self::SETTING_PREFIX . 'login_redirect',
		self::SETTING_PREFIX . 'logout_redirect',
		self::SETTING_PREFIX . 'label_connect',
		self::SETTING_PREFIX . 'label_connected',
		self::SETTING_PREFIX . 'label_connect_cancel',
		self::SETTING_PREFIX . 'label_empty',
		self::SETTING_PREFIX . 'label_disconnect',
		self::SETTING_PREFIX . 'label_error',
		self::SETTING_PREFIX . 'label_welcome_new',
		self::SETTING_PREFIX . 'label_welcome_back',
		self::SETTING_PREFIX . 'label_switch_to_testnet',
		self::SETTING_PREFIX . 'label_invalid_account',
		self::SETTING_PREFIX . 'label_create_mainnet_prompt',
		self::SETTING_PREFIX . 'label_create_testnet_prompt',
		self::SETTING_PREFIX . 'label_paginate_next',
		self::SETTING_PREFIX . 'label_paginate_prev',
		self::SETTING_PREFIX . 'label_paginate_items',
		self::SETTING_PREFIX . 'label_assets_policy_label',
		self::SETTING_PREFIX . 'label_assets_quantity_label',
		self::SETTING_PREFIX . 'label_no_assets',
		self::SETTING_PREFIX . 'label_text_copied',
		self::SETTING_PREFIX . 'label_text_copied_failed',
		self::SETTING_PREFIX . 'assets_whitelist',
		self::SETTING_PREFIX . 'assets_api_endpoint',
		self::SETTING_PREFIX . 'assets_api_key',
		self::SETTING_PREFIX . 'assets_ipfs_endpoint',
		self::SETTING_PREFIX . 'assets_placeholder',
		self::SETTING_PREFIX . 'user_whitelist',
		self::SETTING_PREFIX . 'user_blacklist'
	];

	/**
	 * Url to the plugin guide.
	 */
	public const PLUGIN_GUIDE = 'https://upstream.org.uk/cardano-connect/';

    /**
     * Current plugin version.
     * @var string
     */
    public string $version;

    /**
     * URL our plugin directory.
     * Ends with forward slash.
     * @var string
     */
    public string $plugin_url;

    /**
     * Full path to our plugin directory.
     * Ends with forward slash.
     * @var string
     */
    public string $plugin_path;

	/**
	 * Full path to our plugin templates directory.
	 * Ends with forward slash.
	 * @var string
	 */
	public string $template_path;

    /**
     * Plugin unique name.
     * @var string
     */
    public string $plugin_name;

    /**
     * The plugin settings, formatted for the WP settings API.
     * @var array
     */
    public array $settings = [];

    /**
     * The plugin options, formatted after being loaded from the WP settings API.
     * @var array
     */
    public array $options = [];

    /**
     * Additional WP_User meta fields.
     * @var array
     */
    public array $user_fields = [];

    /**
     * Set plugin params.
     * @return void
     */
    public function __construct()
    {
        $this->version = '0.1.0';
        $this->plugin_name = 'cardano-connect';
	    $this->plugin_path = plugin_dir_path(__DIR__ . '/../../..');
        $this->plugin_url = plugin_dir_url(__DIR__ . '/../../..');
	    $this->template_path = $this->plugin_path . 'core/template/';
        $this->settings = $this->loadSettings();
        $this->options = $this->loadOptions();
		$this->user_fields = $this->loadUserFields();
    }

	/**
	 * Child class bootstrap method.
	 * @return mixed
	 */
	abstract public function run();

    /**
     * Returns the WP Cardano Connect plugin options.
     * Loads data from WPCCSettings and formats to array with new keys ready for UI consumption.
     */
    private function loadOptions(): array
    {
        $ui_options = [
            'version' => $this->version,
            'plugin_name' => $this->plugin_name,
            'mainnet_active' => false,
            'login_redirect' => null,
            'logout_redirect' => null,
            'label_connect' => null,
            'label_connected' => null,
            'label_connect_cancel' => null,
            'label_empty' => null,
            'label_disconnect' => null,
            'label_error' => null,
            'label_welcome_new' => null,
            'label_welcome_back' => null,
            'label_switch_to_testnet' => null,
	        'label_invalid_account' => null,
	        'label_create_mainnet_prompt' => null,
			'label_create_testnet_prompt' => null,
	        'label_no_assets' => null,
	        'label_text_copied' => null,
			'label_text_copied_failed' => null,
	        'label_paginate_prev' => null,
			'label_paginate_next' => null,
			'label_paginate_items' => null,
			'label_assets_policy_label' => null,
			'label_assets_quantity_label' => null,
            'assets_whitelist' => null,
            'assets_ipfs_endpoint' => null,
            'assets_placeholder' => null,
        ];

        $configured_options = $this->getSetting();
        foreach ($configured_options as $name => $val) {
            $ui_name = str_replace(self::SETTING_PREFIX, '', $name);
            if (array_key_exists($ui_name, $ui_options)) {
                $ui_options[$ui_name] = $val;
            }
        }
        return $ui_options;
    }

    /**
     * Returns the WP settings API array
     * Ready to build the WordPress settings fields.
     */
	private function loadSettings(): array
    {
        $roles = wp_roles();
        $role_options = [];
        if ($roles->roles) {
            foreach ($roles->roles as $id => $role) {
                $role_options[] = [
                    'value' => $id,
                    'label' => $role['name'],
                ];
            }
        }
        return [
            self::SETTING_PREFIX.'main_settings_group' => [
                'tab_label' => __('Main settings', 'cardano-connect'),
                'name' => self::SETTING_PREFIX.'main_settings',
                'sections' => [
                    self::SETTING_PREFIX.'main_settings_section' => [
                        'name' => self::SETTING_PREFIX.'main_settings',
                        'callback' => 'settingsCallback',
                        'fields' => [
                            self::SETTING_PREFIX.'mainnet_active' => [
                                'default' => false,
                                'label' => __('Activate mainnet?', 'cardano-connect'),
                                'type' => 'checkbox',
                                'note' => __('Check this box to activate mainnet connections. If you change this option, users on the other network will need to create new accounts with a new wallet on this network.', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'login_redirect' => [
                                'default' => null,
                                'label' => __('Connected redirection', 'cardano-connect'),
                                'type' => 'text',
                                'note' => __('Leave blank to disable redirect (refresh page) when a user connects their wallet.', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'logout_redirect' => [
                                'default' => '',
                                'label' => __('Logout redirection', 'cardano-connect'),
                                'type' => 'text',
                                'note' => __('Leave blank to disable redirect (refresh page) when a user disconnects their wallet.', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'user_role' => [
	                            'default' => 'subscriber',
	                            'label' => __('Connected user role', 'cardano-connect'),
	                            'type' => 'select',
	                            'note' => __('Select the user role connecting user will be granted when connecting their wallet. If changed existing users must disconnect and then reconnect to gain the updated role.', 'cardano-connect'),
	                            'options' => $role_options
                            ],
                            self::SETTING_PREFIX.'user_whitelist' => [
	                            'default' => '',
	                            'label' => __('Global user whitelist', 'cardano-connect'),
	                            'type' => 'textarea',
	                            'rules' => [],
	                            'note' => __('List of user address allowed to login. One address per line. Blacklist take priority over whitelist.', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'user_blacklist' => [
	                            'default' => '',
	                            'label' => __('Global user blacklist', 'cardano-connect'),
	                            'type' => 'textarea',
	                            'rules' => [],
	                            'note' => __('List of user address that will not be allowed to login. One address per line. Blacklist take priority over whitelist.', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'endpoint' => [
	                            'default' => 'https://cardano-connect-verify.vercel.app/',
	                            'label' => __('Validation endpoint', 'cardano-connect'),
	                            'type' => 'text',
	                            'note' => __('Use our endpoint to validate signatures, or add your own to take full control over the authentication lifecycle.', 'cardano-connect'),
                            ],
                        ]
                    ]
                ]
            ],
            self::SETTING_PREFIX.'assets_settings_group' => [
	            'tab_label' => __('Assets settings', 'cardano-connect'),
	            'name' => self::SETTING_PREFIX.'assets_settings',
	            'sections' => [
		            self::SETTING_PREFIX.'assets_settings_section' => [
			            'name' => self::SETTING_PREFIX.'assets_settings',
			            'callback' => 'settingsCallback',
			            'fields' => [
				            self::SETTING_PREFIX.'assets_whitelist' => [
					            'default' => '',
					            'label' => __('Global Policy Whitelist', 'cardano-connect'),
					            'type' => 'textarea',
					            'rules' => [],
					            'note' => __('List of policy IDs, add a new line for each policy ID.', 'cardano-connect')
				            ],
				            self::SETTING_PREFIX.'assets_placeholder' => [
					            'default' => $this->getAssetUrl('logo-dark.svg'),
					            'label' => __('Asset placeholder', 'cardano-connect'),
					            'type' => 'text',
					            'rules' => [
						            'required',
					            ],
					            'note' => __('Displayed in place of an images when unable to fetch the image.', 'cardano-connect')
				            ],
				            self::SETTING_PREFIX.'assets_api_endpoint' => [
					            'default' => 'https://cardano-mainnet.blockfrost.io/api/v0/',
					            'label' => __('API endpoint', 'cardano-connect'),
					            'type' => 'text',
					            'rules' => [
						            'required',
					            ],
					            'note' => __('API endpoint to fetch asset metadata.', 'cardano-connect')
				            ],
				            self::SETTING_PREFIX.'assets_api_key' => [
					            'default' => '',
					            'label' => __('API key', 'cardano-connect'),
					            'type' => 'text',
					            'rules' => [
						            'required',
					            ],
					            'note' => __('API endpoint key.', 'cardano-connect')
				            ],
				            self::SETTING_PREFIX.'assets_ipfs_endpoint' => [
					            'default' => 'https://ipfs.io/ipfs/',
					            'label' => __('IPFS gateway', 'cardano-connect'),
					            'type' => 'text',
					            'rules' => [
						            'required',
					            ],
					            'note' => __('IPFS gateway URL.', 'cardano-connect')
				            ],
			            ]
		            ]
	            ]
            ],
            self::SETTING_PREFIX.'label_settings_group' => [
                'tab_label' => __('Label settings', 'cardano-connect'),
                'name' => self::SETTING_PREFIX.'label_settings',
                'sections' => [
                    self::SETTING_PREFIX.'label_settings_section' => [
                        'name' => self::SETTING_PREFIX.'label_settings',
                        'callback' => 'settingsCallback',
                        'fields' => [
                            self::SETTING_PREFIX.'label_connect' => [
                                'default' => __('Cardano Connect', 'cardano-connect'),
                                'label' => __('Connect button', 'cardano-connect'),
                                'type' => 'text',
                                'rules' => [
                                    'required',
                                ],
                                'note' => __('Button text shown when users is not connected', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_connected' => [
                                'default' => __('Connected', 'cardano-connect'),
                                'label' => __('Connected button', 'cardano-connect'),
                                'type' => 'text',
                                'rules' => [
                                    'required',
                                ],
                                'note' => __('Button text shown when users is connected, along with their wallet address', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_connect_cancel' => [
                                'default' => __('Cancel', 'cardano-connect'),
                                'label' => __('Cancel connect button', 'cardano-connect'),
                                'type' => 'text',
                                'rules' => [
                                    'required',
                                ],
                                'note' => __('Text shown when displaying the wallet list', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_empty' => [
                                'default' => __('No wallets detected. Please install a Wallet browser extension or switch browsers.', 'cardano-connect'),
                                'label' => __('No wallets available', 'cardano-connect'),
                                'type' => 'text',
                                'rules' => [
                                    'required',
                                ],
                                'note' => __('Text shown when the user has no compatible wallet extensions installed', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_disconnect' => [
                                'default' => __('Are you sure you would like to disconnect?', 'cardano-connect'),
                                'label' => __('Disconnect prompt', 'cardano-connect'),
                                'type' => 'text',
                                'rules' => [
                                    'required',
                                ],
                                'note' => __('Text confirmation shown when user clicks the disconnect button', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_error' => [
                                'default' => __('Unable to sign authentication', 'cardano-connect'),
                                'label' => __('Connect generic error', 'cardano-connect'),
                                'type' => 'text',
                                'rules' => [
                                    'required',
                                ],
                                'note' => __('Text shown when the wallet fails to connect', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_welcome_new' => [
                                'default' => __('Thanks for connecting', 'cardano-connect'),
                                'label' => __('Connected new user', 'cardano-connect'),
                                'type' => 'text',
                                'rules' => [
                                    'required',
                                ],
                                'note' => __('Text shown when successfully connected for the first time', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_welcome_back' => [
                                'default' => __('Welcome back to the website', 'cardano-connect'),
                                'label' => __('Connected welcome back', 'cardano-connect'),
                                'type' => 'text',
                                'rules' => [
                                    'required',
                                ],
                                'note' => __('Text shown when successfully connected again', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_switch_to_testnet' => [
	                            'default' => __('Mainnet connection is currently disabled, please switch to Testnet to connect.', 'cardano-connect'),
	                            'label' => __('Switch to Testnet', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown when user is connected to Mainnet, but the Mainnet option is disabled.', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_invalid_account' => [
	                            'default' => __('Invalid account, please switch to the wallet you originally connected with.', 'cardano-connect'),
	                            'label' => __('Invalid account', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown when user is connected but their address does not match their WordPress account.', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_create_mainnet_prompt' => [
	                            'default' => __('You do not have a Mainnet account, please connect now to link your Mainnet account', 'cardano-connect'),
	                            'label' => __('Create Mainnet wallet prompt', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown when user is logged in but connected to a network they have not connected to before', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_create_testnet_prompt' => [
	                            'default' => __('You do not have a Testnet account, please connect now to link your Testnet account', 'cardano-connect'),
	                            'label' => __('Create Testnet wallet prompt', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown when user is logged in but connected to a network they have not connected to before', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_paginate_prev' => [
	                            'default' => __('Prev', 'cardano-connect'),
	                            'label' => __('Previous button', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown on the pagination previous button', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_paginate_next' => [
	                            'default' => __('Next', 'cardano-connect'),
	                            'label' => __('Next button', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown on the pagination next button', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_paginate_items' => [
	                            'default' => __('Items', 'cardano-connect'),
	                            'label' => __('Total text', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown next to the pagination total results number', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_assets_policy_label' => [
	                            'default' => __('Token Collection', 'cardano-connect'),
	                            'label' => __('Policy label text', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Policy label shown next to the policy ID', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_assets_quantity_label' => [
	                            'default' => __('Qty', 'cardano-connect'),
	                            'label' => __('Quantity label text', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Quantity label shown next to the assets quantity', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_no_assets' => [
		                        'default' => __('No assets found in your wallet', 'cardano-connect'),
		                        'label' => __('No assets found prompt', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown if no assets are found in their wallet', 'cardano-connect')
	                        ],
                            self::SETTING_PREFIX.'label_text_copied' => [
	                            'default' => __('Copied', 'cardano-connect'),
	                            'label' => __('Copied text prompt', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown when user copies text (click to copy)', 'cardano-connect')
                            ],
                            self::SETTING_PREFIX.'label_text_copied_failed' => [
	                            'default' => __('Copied failed', 'cardano-connect'),
	                            'label' => __('Copied failed text prompt', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown when user copies text but the action fails (click to copy)', 'cardano-connect')
                            ],
                        ]
                    ]
                ]
            ],
        ];
    }

	/**
	 * Returns the WP user profile meta field config.
	 */
	private function loadUserFields(): array
	{
		return [
			[
				'type' => 'text',
				'label' => __('Connected Network', 'cardano-connect'),
				'name' => 'cardano_connect_network',
				'description' => __('Last network the user connected with.', 'cardano-connect'),
				'disabled' => true,
				'column' => false,
			],
			[
				'type' => 'text',
				'label' => __('Address', 'cardano-connect'),
				'name' => 'cardano_connect_address',
				'description' => __('The users Cardano wallet display address.', 'cardano-connect'),
				'disabled' => true,
				'column' => __('Cardano Connect', 'cardano-connect'),
			],
			[
				'type' => 'text',
				'label' => __('Stake Address', 'cardano-connect'),
				'name' => 'cardano_connect_stake_address',
				'description' => __('The users Cardano wallet stake address they signed their connection message with.', 'cardano-connect'),
				'disabled' => true,
				'column' => false,
			],
			[
				'type' => 'text',
				'label' => __('Cardano Wallet', 'cardano-connect'),
				'name' => 'cardano_connect_wallet',
				'description' => __('The Cardano wallet used to initially connect their account.', 'cardano-connect'),
				'disabled' => true,
				'column' => false,
			],
			[
				'type' => 'text',
				'label' => __('Address (TESTNET)', 'cardano-connect'),
				'name' => 'cardano_connect_address_testnet',
				'description' => __('The users Cardano wallet display address.', 'cardano-connect'),
				'disabled' => true,
				'column' => false,
			],
			[
				'type' => 'text',
				'label' => __('Stake Address (TESTNET)', 'cardano-connect'),
				'name' => 'cardano_connect_stake_address_testnet',
				'description' => __('The users Cardano wallet stake address they signed their connection message with.', 'cardano-connect'),
				'disabled' => true,
				'column' => false,
			],
		];
	}

	/**
	 * Load a template.
	 * @param string $template Path under $this->template_path.
	 * @param array $data Passed to the template.
	 * @param bool $print
	 * @return string|null
	 */
	protected function getTemplate(string $template, array $data = [], bool $print = false): ?string {
		if ($print) {
			extract( $data );
			include $this->template_path . $template . '.php';
		} else {
			ob_start();
			extract( $data );
			include $this->template_path . $template . '.php';
			$content = ob_get_contents();
			ob_clean();
			return $content;
		}
		return null;
	}

	/**
	 * Load a template.
	 * @param string $file Path under $this->template_path.
	 * @return string
	 */
	protected function getAssetUrl(string $file): string
	{
		return $this->plugin_url . 'assets/' . $file;
	}

    /**
     * Fetch a setting value based on its field name. Returns null if not found.
     * $field_key = 'all' will return the full settings array.
     * If an option value can equate to false (eg. 0), then you must check for === false.
     * @return mixed
     */
    protected function getSetting(string $field_key = 'all')
    {
        $all_options = [];
        foreach ($this->settings as $settings) {
            $all_options += get_option($settings['name']) ?: [];
        }
        if ($field_key === 'all') {
            return $all_options;
        }
        return $all_options[$field_key] ?? null;
    }

	/**
	 * Get plugin settings admin page url for a tab.
	 */
	protected function getSettingUrl(string $tab = null): string
	{
		$tab = $tab ?: Settings::DEFAULT_SETTINGS_TAB;
		$page = Settings::SETTINGS_PAGE;
		return wp_nonce_url("?page=$page&tab=$tab");
	}

	/**
	 * Get the current authenticated user and their metadata.
	 * Returns empty user object with ID=0 if not logged in.
	 */
	protected function getCurrentUser(int $user_id = null): array
	{
		$user = $user_id ? get_user_by('ID', $user_id) : wp_get_current_user();
		$meta = [];

		if ($user->ID) {
			foreach ($this->user_fields as $f) {
				$meta[$f['name']] = get_user_meta($user->ID, $f['name'], true);
			}
		} else {
			$user = [];
		}

		return [
			'user' => $user,
			'web3' => $meta
		];
	}

	/**
	 * Get a user by an address, checks both tesnet and mainnet address and stake fields.
	 */
	protected function getUserByAddress(string $address): array
	{
		$user = get_users([
			'meta_query' => [
				'relation' => 'OR',
				[
					'key' => 'cardano_connect_address',
					'value' => $address
				],
				[
					'key' => 'cardano_connect_address_testnet',
					'value' => $address
				],
				[
					'key' => 'cardano_connect_stake_address',
					'value' => $address
				],
				[
					'key' => 'cardano_connect_stake_address_testnet',
					'value' => $address
				]
			]
		])[0];
		return $this->getCurrentUser($user->ID ?: null);
	}

	/**
	 * Translate WP error codes to human-readable strings.
	 */
	protected function translateErrorCode(string $code): string
	{
		if ($code === 'invalid_username') {
			return __('Your address is not registered on this website', 'cardano-connect');
		}
		if ($code === 'empty_username') {
			return __('Your address cannot be empty', 'cardano-connect');
		}
		if ($code === 'incomplete_account_setup') {
			return __('Your account was setup but could not be connected with your Web3 address. Please each out to the website admin to resolve this issue.', 'cardano-connect');
		}
		return $code;
	}

	/**
	 * Sanitize an array of input data
	 **/
	protected function sanitizeArray(array $input): array
	{
		$output = [];
		foreach($input as $key => $value) {
			if(!empty($value)) {
				$output[$key] = $this->sanitizeText($value);
			}
		}
		return $output;
	}

	/**
	 * Sanitize text inputs.
	 */
	protected function sanitizeText(string $input): string
	{
		return sanitize_text_field($input);
	}

	protected function log($data): void
	{
		error_log(print_r($data, true), 0, $this->plugin_path . 'logs/error.log');
	}
}