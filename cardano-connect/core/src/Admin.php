<?php

namespace WPCC;

use WP_User;

class Admin extends Base
{
    /**
     * @inheritDoc
     */
    public function run(): void
    {
        // Register user table columns.
        add_filter( 'manage_users_columns', [$this, 'renderUserProfileColumnHead'] );
        add_filter( 'manage_users_custom_column', [$this, 'renderUserProfileColumnRow'] , 10, 3 );

        // Register plugin user meta fields.
        add_action( 'show_user_profile', [$this, 'renderUserProfileFields'] );
        add_action( 'edit_user_profile', [$this, 'renderUserProfileFields'] );

        // Register save actions for custom user meta fields.
        add_action( 'personal_options_update', [$this, 'saveUserProfileFields'] );
        add_action( 'edit_user_profile_update', [$this, 'saveUserProfileFields'] );
    }

	/**
	 * @param $columns
	 * @return array
	 */
    public function renderUserProfileColumnHead( $columns ): array {
        foreach ( $this->user_fields as $c ) {
            if ($c['column']) {
                $columns[$c['name']] = $c['column'];
            }
        }
        return $columns;
    }

    /**
     * @return void
     */
    public function renderUserProfileColumnRow( $val, $column_name, $user_id )
    {
        foreach ( $this->user_fields as $c ) {
			if ($column_name === 'cardano_connect_address' && $column_name === $c['name']) {
				$mainnet_address = get_user_meta( $user_id, 'cardano_connect_address', true);
				$mainnet_stake_address = get_user_meta( $user_id, 'cardano_connect_stake_address', true);
				if ($mainnet_address) {
					$val .= '<div><strong>Mainnet:</strong></div>';
					$val .= "<div class='wpcc-table-address'>$mainnet_address</div>";
					$val .= "<div class='wpcc-table-address'>$mainnet_stake_address</div>";
				}
				$testnet_address = get_user_meta( $user_id, 'cardano_connect_address_testnet', true);
				$testnet_stake_address = get_user_meta( $user_id, 'cardano_connect_stake_address_testnet', true);
				if ($testnet_address) {
					$val .= '<strong>Testnet:</strong> ';
					$val .= "<div class='wpcc-table-address'>$testnet_address</div>";
					$val .= "<div class='wpcc-table-address'>$testnet_stake_address</div>";
				}
			}
            else if ($c['column'] && $column_name === $c['name']) {
                $val = get_user_meta( $user_id, $c['name'], true);
            }
        }
        return $val;
    }

	/**
	 * @param WP_User $user
	 * @return void
	 */
    public function renderUserProfileFields( WP_User $user ): void {
        $this->getTemplate('page/profile', ['user' => $user], true);
    }

    /**
     * Save profile fields with update_user_meta
     */
    public function saveUserProfileFields( int $user_id ): bool {
	    if (wp_verify_nonce( sanitize_text_field( $_POST[ '_wpnonce' ] ))) {
		    return false;
	    }

        if ( !current_user_can( 'edit_user', $user_id ) ) {
            return false;
        }
        foreach ( $this->user_fields as $field ) {
			if ( ! $field['disabled'] ) {
				update_user_meta( $user_id, $field['name'], $this->sanitizeText($_POST[ $field['name'] ]) );
			}
        }
        return true;
    }
}