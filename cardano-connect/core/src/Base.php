<?php

namespace WPCC;

use WPCC\Connect\Base as ConnectBase;
use WPCC\Connect\Providers\Upstream;
use WPCC\Connect\Responses\Response;
use WPCC\Connect\Providers\BlockFrost;

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
		// Main settings.
		self::SETTING_PREFIX.'mainnet_active',
		self::SETTING_PREFIX.'login_redirect',
		self::SETTING_PREFIX.'logout_redirect',
		self::SETTING_PREFIX.'user_role',
		self::SETTING_PREFIX.'user_whitelist',
		self::SETTING_PREFIX.'user_blacklist',
		self::SETTING_PREFIX.'endpoint',
		self::SETTING_PREFIX.'pools_data_source',
		self::SETTING_PREFIX.'pools_data_source_testnet',
		self::SETTING_PREFIX.'disable_styles',
		// Asset settings.
		self::SETTING_PREFIX.'assets_placeholder',
		self::SETTING_PREFIX.'assets_whitelist',
		self::SETTING_PREFIX.'assets_api_endpoint',
		self::SETTING_PREFIX.'assets_api_endpoint_testnet',
		self::SETTING_PREFIX.'assets_api_key',
		self::SETTING_PREFIX.'assets_api_key_testnet',
		self::SETTING_PREFIX.'assets_ipfs_endpoint',
		// Label settings.
		self::SETTING_PREFIX.'label_connect',
		self::SETTING_PREFIX.'label_connected',
		self::SETTING_PREFIX.'label_connect_cancel',
		self::SETTING_PREFIX.'label_disconnect',
		self::SETTING_PREFIX.'label_empty',
		self::SETTING_PREFIX.'label_disconnect_prompt',
		self::SETTING_PREFIX.'label_disconnected_prompt',
		self::SETTING_PREFIX.'label_error',
		self::SETTING_PREFIX.'label_welcome_new',
		self::SETTING_PREFIX.'label_welcome_back',
		self::SETTING_PREFIX.'label_switch_to_testnet',
		self::SETTING_PREFIX.'label_invalid_account',
		self::SETTING_PREFIX.'label_create_mainnet_prompt',
		self::SETTING_PREFIX.'label_create_testnet_prompt',
		self::SETTING_PREFIX.'label_paginate_prev',
		self::SETTING_PREFIX.'label_paginate_next',
		self::SETTING_PREFIX.'label_paginate_items',
		self::SETTING_PREFIX.'label_paginate_search_text',
		self::SETTING_PREFIX.'label_paginate_search_text_placeholder',
		self::SETTING_PREFIX.'label_paginate_search_metadata',
		self::SETTING_PREFIX.'label_paginate_search_retired',
		self::SETTING_PREFIX.'label_paginate_search_saturation',
		self::SETTING_PREFIX.'label_paginate_search_order',
		self::SETTING_PREFIX.'label_paginate_search_update',
		self::SETTING_PREFIX.'label_paginate_search_reset',
		self::SETTING_PREFIX.'label_assets_policy_label',
		self::SETTING_PREFIX.'label_assets_quantity_label',
		self::SETTING_PREFIX.'label_no_assets',
		self::SETTING_PREFIX.'label_no_pools',
		self::SETTING_PREFIX.'label_no_pool',
		self::SETTING_PREFIX.'label_delegate_to_pool',
		self::SETTING_PREFIX.'label_delegated_to_pool',
		self::SETTING_PREFIX.'label_pool_fees',
		self::SETTING_PREFIX.'label_pool_stake',
		self::SETTING_PREFIX.'label_pool_stake_saturated',
		self::SETTING_PREFIX.'label_pool_pledge_met',
		self::SETTING_PREFIX.'label_pool_pledge_not_met',
		self::SETTING_PREFIX.'label_pool_retiring',
		self::SETTING_PREFIX.'label_pool_retired',
		self::SETTING_PREFIX.'label_pool_synced',
		self::SETTING_PREFIX.'label_pool_lifetime_blocks',
		self::SETTING_PREFIX.'label_pool_last_epoch_blocks',
		self::SETTING_PREFIX.'label_pool_delegators',
		self::SETTING_PREFIX.'label_compare_view_pools',
		self::SETTING_PREFIX.'label_compare_view_dreps',
		self::SETTING_PREFIX.'label_compare_add',
		self::SETTING_PREFIX.'label_compare_remove',
		self::SETTING_PREFIX.'label_compare_no_items',
		self::SETTING_PREFIX.'label_text_copied',
		self::SETTING_PREFIX.'label_text_copied_failed',
	];

	/** @var string[] @var string[] */
	public const OPTION_FIELDS_NAMES = [
		'version',
		'plugin_name',
		// Main settings.
		'mainnet_active',
		'login_redirect',
		'logout_redirect',
		'pools_data_source',
		'disable_styles',
		// Asset settings.
		'assets_placeholder',
		'assets_whitelist',
		'assets_ipfs_endpoint',
		// Label settings.
		'label_connect',
		'label_connected',
		'label_connect_cancel',
		'label_disconnect',
		'label_empty',
		'label_disconnect_prompt',
		'label_disconnected_prompt',
		'label_error',
		'label_welcome_new',
		'label_welcome_back',
		'label_switch_to_testnet',
		'label_invalid_account',
		'label_create_mainnet_prompt',
		'label_create_testnet_prompt',
		'label_paginate_prev',
		'label_paginate_next',
		'label_paginate_items',
		'label_paginate_search_text',
		'label_paginate_search_text_placeholder',
		'label_paginate_search_metadata',
		'label_paginate_search_retired',
		'label_paginate_search_saturation',
		'label_paginate_search_order',
		'label_paginate_search_update',
		'label_paginate_search_reset',
		'label_assets_policy_label',
		'label_assets_quantity_label',
		'label_no_assets',
		'label_no_pools',
		'label_no_pool',
		'label_delegate_to_pool',
		'label_delegated_to_pool',
		'label_pool_fees',
		'label_pool_stake',
		'label_pool_stake_saturated',
		'label_pool_pledge_met',
		'label_pool_pledge_not_met',
		'label_pool_retiring',
		'label_pool_retired',
		'label_pool_synced',
		'label_pool_lifetime_blocks',
		'label_pool_last_epoch_blocks',
		'label_pool_delegators',
		'label_compare_view_pools',
		'label_compare_view_dreps',
		'label_compare_add',
		'label_compare_remove',
		'label_compare_no_items',
		'label_text_copied',
		'label_text_copied_failed',
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
		$ui_options = array_merge(array_flip(self::OPTION_FIELDS_NAMES), [
			'version' => $this->version,
			'plugin_name' => $this->plugin_name]
		);
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
        $role_options = $this->getUserRoles();
		$pool_providers = [[
			'label' => __( 'User data provider only (no local storage)', 'cardano-connect' ),
			'value' => 'default',
			'class' => 'Local',
		],[
			'label' => __( 'Local data storage (Custom post type synced with data provider)', 'cardano-connect' ),
			'value' => 'local_wp',
			'class' => 'Local',
		]];
        return [
            self::SETTING_PREFIX.'main_settings_group' => [
                'tab_label' => __('Main settings', 'cardano-connect'),
                'name' => self::SETTING_PREFIX.'main_settings',
                'sections' => [
                    self::SETTING_PREFIX.'main_settings_section' => [
                        'name' => self::SETTING_PREFIX.'main_settings',
                        'callback' => 'settingsCallback',
                        'fields' => [
	                        self::SETTING_PREFIX.'connector_button_settings' => [
		                        'type' => 'title',
		                        'label' => __('Connection settings', 'cardano-connect'),
		                        'args' => [
									'class' => 'wpcc-row-title',
		                        ]
	                        ],
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
                                'default' => '/',
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
	                        self::SETTING_PREFIX.'style_settings' => [
		                        'type' => 'title',
		                        'label' => __('Plugin styles', 'cardano-connect'),
		                        'args' => [
									'class' => 'wpcc-row-title'
		                        ]
	                        ],
	                        self::SETTING_PREFIX.'disable_styles' => [
		                        'default' => false,
		                        'label' => __('Disable styles?', 'cardano-connect'),
		                        'type' => 'checkbox',
		                        'note' => __('Check this box to disable default plugin styles. You can add your own styles using your theme or other plugins.', 'cardano-connect')
	                        ],
                        ]
                    ]
                ]
            ],
            self::SETTING_PREFIX.'assets_settings_group' => [
	            'tab_label' => __('Data source settings', 'cardano-connect'),
	            'name' => self::SETTING_PREFIX.'assets_settings',
	            'sections' => [
		            self::SETTING_PREFIX.'assets_settings_section' => [
			            'name' => self::SETTING_PREFIX.'assets_settings',
			            'callback' => 'settingsCallback',
			            'fields' => [
				            self::SETTING_PREFIX.'asset_settings' => [
					            'type' => 'title',
					            'label' => __('Asset settings', 'cardano-connect'),
					            'args' => [
						            'class' => 'wpcc-row-title',
					            ]
				            ],
				            self::SETTING_PREFIX.'assets_placeholder' => [
					            'default' => $this->getAssetUrl('logo-dark.svg'),
					            'label' => __('Asset placeholder', 'cardano-connect'),
					            'type' => 'text',
					            'rules' => [
						            'required',
					            ],
					            'note' => __('Displayed in place of asset files when unable to load a file.', 'cardano-connect')
				            ],
				            self::SETTING_PREFIX.'assets_whitelist' => [
					            'default' => '',
					            'label' => __('Global policy whitelist', 'cardano-connect'),
					            'type' => 'textarea',
					            'rules' => [],
					            'note' => __('List of allowed policy IDs, add a new line for each policy ID.', 'cardano-connect')
				            ],
				            self::SETTING_PREFIX.'asset_api_settings' => [
					            'type' => 'title',
					            'label' => __('Data source', 'cardano-connect'),
					            'args' => [
						            'class' => 'wpcc-row-title',
					            ]
				            ],
				            self::SETTING_PREFIX.'assets_api_endpoint' => [
					            'default' => 'https://cardano-mainnet.blockfrost.io/api/v0/',
					            'label' => __('API endpoint', 'cardano-connect'),
					            'type' => 'select',
					            'note' => __('API endpoint to fetch asset metadata.', 'cardano-connect'),
					            'rules' => [
						            'required',
					            ],
					            'options' => $this->getDataProviders('mainnet')
				            ],
				            self::SETTING_PREFIX.'assets_api_endpoint_testnet' => [
					            'default' => 'https://cardano-testnet.blockfrost.io/api/v0/',
					            'label' => __('Asset API endpoint (testnet)', 'cardano-connect'),
					            'type' => 'select',
					            'note' => __('API endpoint to fetch asset metadata. (testnet)', 'cardano-connect'),
					            'options' => $this->getDataProviders()
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
				            self::SETTING_PREFIX.'assets_api_key_testnet' => [
					            'default' => '',
					            'label' => __('API key (testnet)', 'cardano-connect'),
					            'type' => 'text',
					            'note' => __('API endpoint key. (testnet)', 'cardano-connect')
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
				            self::SETTING_PREFIX.'pools_data_settings' => [
					            'type' => 'title',
					            'label' => __('Pool data', 'cardano-connect'),
					            'args' => [
						            'class' => 'wpcc-row-title',
					            ]
				            ],
				            self::SETTING_PREFIX.'pools_data_source' => [
					            'default' => 'https://cardano-mainnet.blockfrost.io/api/v0/',
					            'label' => __('Pool data source', 'cardano-connect'),
					            'type' => 'select',
					            'note' => __('Select the pool data source. Selecting local storage allows for advanced filtering for pools, this will create a custom post type Pools kept updated by wp cron jobs.', 'cardano-connect'),
					            'options' => $pool_providers
				            ],
				            self::SETTING_PREFIX.'pools_data_source_testnet' => [
					            'default' => 'https://cardano-preview.blockfrost.io/api/v0/',
					            'label' => __('Pool data source (testnet)', 'cardano-connect'),
					            'type' => 'select',
					            'note' => __('Select the pool data source for testnet pools', 'cardano-connect'),
					            'options' => $pool_providers
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
	                        self::SETTING_PREFIX.'connector_button_labels' => [
		                        'type' => 'title',
		                        'label' => __('Connect button', 'cardano-connect'),
		                        'args' => [
			                        'class' => 'wpcc-row-title',
		                        ]
	                        ],
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
                            self::SETTING_PREFIX.'label_disconnect' => [
	                            'default' => __('Disconnect', 'cardano-connect'),
	                            'label' => __('Disconnect button', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text shown on the disconnect button', 'cardano-connect')
                            ],
	                        self::SETTING_PREFIX.'label_empty' => [
		                        'default' => __('No wallets detected. Please install a Wallet browser extension or switch browsers.', 'cardano-connect'),
		                        'label' => __('No wallets found', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown when the user has no wallets installed', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'connector_prompt_labels' => [
		                        'type' => 'title',
		                        'label' => __('Connect prompts', 'cardano-connect'),
		                        'args' => [
			                        'class' => 'wpcc-row-title',
		                        ]
	                        ],
                            self::SETTING_PREFIX.'label_disconnect_prompt' => [
	                            'default' => __('Are you sure you would like to disconnect?', 'cardano-connect'),
	                            'label' => __('Disconnect prompt', 'cardano-connect'),
	                            'type' => 'text',
	                            'rules' => [
		                            'required',
	                            ],
	                            'note' => __('Text confirmation shown when user clicks the disconnect button', 'cardano-connect')
                            ],
	                        self::SETTING_PREFIX.'label_disconnected_prompt' => [
		                        'default' => __('Successfully disconnected', 'cardano-connect'),
		                        'label' => __('Disconnected prompt', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown when user has disconnected', 'cardano-connect')
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
                                'default' => __('Welcome back!', 'cardano-connect'),
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
	                        self::SETTING_PREFIX.'pagination_labels' => [
		                        'type' => 'title',
		                        'label' => __('Pagination labels', 'cardano-connect'),
		                        'args' => [
			                        'class' => 'wpcc-row-title',
		                        ]
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
	                        self::SETTING_PREFIX.'label_paginate_search_text' => [
		                        'default' => __('Search by', 'cardano-connect'),
		                        'label' => __('Test search label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown next to the text search field', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_paginate_search_text_placeholder' => [
		                        'default' => __('ticker, name or pool_id', 'cardano-connect'),
		                        'label' => __('Test search placeholder', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown in the text search field', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_paginate_search_metadata' => [
		                        'default' => __('Has metadata', 'cardano-connect'),
		                        'label' => __('Metadata checkbox label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown next to the metadata checkbox field', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_paginate_search_retired' => [
		                        'default' => __('Hide retired', 'cardano-connect'),
		                        'label' => __('Retired checkbox label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown next to the retired checkbox field', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_paginate_search_saturation' => [
		                        'default' => __('Saturation', 'cardano-connect'),
		                        'label' => __('Saturation search label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown next to the saturation slider', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_paginate_search_order' => [
		                        'default' => __('Order', 'cardano-connect'),
		                        'label' => __('Order select label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown next to the order select', 'cardano-connect')
	                        ],

	                        self::SETTING_PREFIX.'label_paginate_search_update' => [
		                        'default' => __('Update', 'cardano-connect'),
		                        'label' => __('Update button text', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown in the update filters button', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_paginate_search_reset' => [
		                        'default' => __('Reset', 'cardano-connect'),
		                        'label' => __('Reset button text', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown in the reset search filters button', 'cardano-connect')
	                        ],

	                        self::SETTING_PREFIX.'asset_labels' => [
		                        'type' => 'title',
		                        'label' => __('Asset labels', 'cardano-connect'),
		                        'args' => [
			                        'class' => 'wpcc-row-title',
		                        ]
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
		                        'default' => __('No assets found', 'cardano-connect'),
		                        'label' => __('No assets found prompt', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown if no assets are found in their wallet', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'pool_labels' => [
		                        'type' => 'title',
		                        'label' => __('Pool labels', 'cardano-connect'),
		                        'args' => [
			                        'class' => 'wpcc-row-title',
		                        ]
	                        ],
	                        self::SETTING_PREFIX.'label_no_pools' => [
		                        'default' => __('No pools found', 'cardano-connect'),
		                        'label' => __('No pools found prompt', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown if no pools are found in the list of pools', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_no_pool' => [
		                        'default' => __('Unable to load pool data', 'cardano-connect'),
		                        'label' => __('Unable to load pool data prompt', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown if we are unable to load a pools data', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_delegate_to_pool' => [
		                        'default' => __('Delegate', 'cardano-connect'),
		                        'label' => __('Delegate to pool button text', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Button text for the delegate to pool button', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_delegated_to_pool' => [
		                        'default' => __('You are delegated to this pool', 'cardano-connect'),
		                        'label' => __('Delegated to pool text', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text shown when user is delegated to  a pool in place of the delegate button', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_pool_fees' => [
		                        'default' => __('Pool fees', 'cardano-connect'),
		                        'label' => __('Pool fees label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed above a pools fees', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_pool_stake' => [
		                        'default' => __('Stake (Saturation)', 'cardano-connect'),
		                        'label' => __('Pools stake and saturation label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed above a pools saturation bar', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_pool_stake_saturated' => [
		                        'default' => __('Stake (SATURATED)', 'cardano-connect'),
		                        'label' => __('Pools stake and saturation label when saturated', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed above a pools saturation bar when their stake is saturated', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_pool_pledge_met' => [
		                        'default' => __('Pledge (Pledge met)', 'cardano-connect'),
		                        'label' => __('Pools pledge met label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed above a pools pledge bar when their pledge is met', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_pool_pledge_not_met' => [
		                        'default' => __('Pledge (Pledge NOT met)', 'cardano-connect'),
		                        'label' => __('Pools pledge NOT met label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed above a pools pledge bar when their pledge is NOT met', 'cardano-connect')
	                        ],

	                        self::SETTING_PREFIX.'label_pool_retiring' => [
		                        'default' => __('Retiring', 'cardano-connect'),
		                        'label' => __('Pools retiring soon text', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed if a pool is retiring soon', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_pool_retired' => [
		                        'default' => __('Pool retired', 'cardano-connect'),
		                        'label' => __('Pools retired text', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed if a pool has retired', 'cardano-connect')
	                        ],



	                        self::SETTING_PREFIX.'label_pool_synced' => [
		                        'default' => __('Last synced -', 'cardano-connect'),
		                        'label' => __('Pool synced time label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed next to the pools last synced time', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_pool_lifetime_blocks' => [
							    'default' => __('Lifetime blocks:', 'cardano-connect'),
							    'label' => __('Pools lifetime block count label', 'cardano-connect'),
							    'type' => 'text',
							    'rules' => [
								    'required',
							    ],
							    'note' => __('Text displayed next to the pools lifetime blocks count', 'cardano-connect')
						    ],
	                        self::SETTING_PREFIX.'label_pool_last_epoch_blocks' => [
							    'default' => __('Last epoch blocks:', 'cardano-connect'),
							    'label' => __('Pool last epochs label', 'cardano-connect'),
							    'type' => 'text',
							    'rules' => [
								    'required',
							    ],
							    'note' => __('Text displayed next to the pools last epoch block count', 'cardano-connect')
						    ],
	                        self::SETTING_PREFIX.'label_pool_delegators' => [
							    'default' => __('Delegators:', 'cardano-connect'),
							    'label' => __('Pool delegator count label', 'cardano-connect'),
							    'type' => 'text',
							    'rules' => [
								    'required',
							    ],
							    'note' => __('Text displayed next to the pools delegator count', 'cardano-connect')
						    ],
	                        self::SETTING_PREFIX.'compare_labels' => [
		                        'type' => 'title',
		                        'label' => __('Copy text labels', 'cardano-connect'),
		                        'args' => [
			                        'class' => 'wpcc-row-title',
		                        ]
	                        ],
	                        self::SETTING_PREFIX.'label_compare_view_pools' => [
		                        'default' => __('Compare Pools', 'cardano-connect'),
		                        'label' => __('Compare Pools modal button', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed in the comparison modal show Pools button and as the modal title, shows the popup when clicked', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_compare_view_dreps' => [
		                        'default' => __('Compare DReps', 'cardano-connect'),
		                        'label' => __('Compare DReps modal button', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed in the comparison modal show DReps button and as the modal title, shows the popup when clicked', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_compare_add' => [
		                        'default' => __('Add to compare', 'cardano-connect'),
		                        'label' => __('Add to compare button label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed on add to compare button tooltips', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_compare_remove' => [
		                        'default' => __('Remove from compare', 'cardano-connect'),
		                        'label' => __('Remove from compare button label', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed on remove from compare button tooltips', 'cardano-connect')
	                        ],
	                        self::SETTING_PREFIX.'label_compare_no_items' => [
		                        'default' => __('No items selected for comparison', 'cardano-connect'),
		                        'label' => __('No items in comparison list text', 'cardano-connect'),
		                        'type' => 'text',
		                        'rules' => [
			                        'required',
		                        ],
		                        'note' => __('Text displayed in the comparison list when no items have ben selected', 'cardano-connect')
	                        ],

	                        self::SETTING_PREFIX.'copy_labels' => [
		                        'type' => 'title',
		                        'label' => __('Copy text labels', 'cardano-connect'),
		                        'args' => [
			                        'class' => 'wpcc-row-title',
		                        ]
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
	 * Return the data provider class for the passed type.
	 * @param string $type 'assets' | 'pools'
	 * @return ConnectBase
	 */
	protected function loadProvider(string $type = 'assets'): ConnectBase {
		$mainnet_active = $this->getSetting(self::SETTING_PREFIX.'mainnet_active');
		$testnet_suffix = $mainnet_active ? '' : '_testnet';
		$providers = $this->getDataProviders($mainnet_active ? 'mainnet' : 'testnet', $type === 'pools');
		$api_key = $this->getSetting( self::SETTING_PREFIX . 'assets_api_key' . $testnet_suffix) ?? '';
		$endpoint = $this->getSetting(self::SETTING_PREFIX.'assets_api_endpoint' . $testnet_suffix) ?? '';
		$class = BlockFrost::class; // default provider

		if ($type === 'pools') {
			$pool_data_source = $this->getSetting(self::SETTING_PREFIX.'pools_data_source' . $testnet_suffix) ?? '';
			if ($pool_data_source === 'local_wp') {
				$endpoint = $pool_data_source;
			}
		}

		foreach ($providers as $p) {
			if ($p['value'] === $endpoint) {
				$class = 'WPCC\\Connect\\Providers\\' . $p['class'];
			}
		}
		return new $class( $endpoint, $api_key );
	}

	/**
	 * Return the data signer class.
	 */
	protected function loadSigner(): ConnectBase
	{
		$mainnet_active = $this->getSetting(self::SETTING_PREFIX.'mainnet_active');
		$testnet_suffix = $mainnet_active ? '' : '_testnet';
		$endpoint = $this->getSetting(self::SETTING_PREFIX.'endpoint' . $testnet_suffix);
		return new Upstream( $endpoint );
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
	 * Get an assets URL path.
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
     * If an option value can equate to false (e.g. 0), then you must check for === false.
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
	protected function getCurrentUser(int $user_id = null, ConnectBase $provider = null): array
	{
		$user = $user_id ? get_user_by('ID', $user_id) : wp_get_current_user();
		$meta = [];
		$provider_data = new Response(false);

		if ($user->ID) {
			foreach ($this->user_fields as $f) {
				$meta[$f['name']] = get_user_meta($user->ID, $f['name'], true);
			}
			$stake_address = $meta['cardano_connect_network'] === 'mainnet'
				? $meta['cardano_connect_stake_address']
				: $meta['cardano_connect_stake_address_testnet'];
			$provider_data = $provider
				? $provider->getAccount($stake_address)
				: $provider_data;
		} else {
			$user = [];
		}

		return [
			'user' => $user,
			'web3' => $meta,
			'account' => (array) $provider_data->response,
		];
	}

	/**
	 * Get a user by an address, checks both testnet and mainnet address and stake fields.
	 */
	protected function getUserByAddress(string $address, ConnectBase $provider = null): array
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
		return $this->getCurrentUser($user->ID ?: null, $provider);
	}

	/**
	 * Get list of user roles formatted as select field option arrays.
	 */
	protected function getUserRoles(): array
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
		return $role_options;
	}

	/**
	 * Get list of data providers formatted as select field option arrays.
	 */
	protected function getDataProviders(string $network = 'testnet', bool $include_local = false): array
	{
		$local = [
			'label' => __( 'Local data storage (Custom post type)', 'cardano-connect' ),
			'value' => 'local_wp',
			'class' => 'Local',
		];
		$providers = [
			[
				'value' => 'https://cardano-mainnet.blockfrost.io/api/v0/',
				'label' => __('BlockFrost (Mainnet)', 'cardano-connect'),
				'class' => 'BlockFrost',
			]
		];
		$providers_testnet = [
			[
				'value' => 'https://cardano-preview.blockfrost.io/api/v0/',
				'label' => __('BlockFrost (Preview)', 'cardano-connect'),
				'class' => 'BlockFrost',
			],
			[
				'value' => 'https://cardano-preprod.blockfrost.io/api/v0/',
				'label' => __('BlockFrost (Preprod)', 'cardano-connect'),
				'class' => 'BlockFrost',
			]
		];

		if ($include_local) {
			$providers = [ ...$providers, $local ];
			$providers_testnet = [ ...$providers_testnet, $local ];
		}

		return $network === 'testnet' ? $providers_testnet : $providers;
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