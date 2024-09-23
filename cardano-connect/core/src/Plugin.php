<?php

namespace WPCC;

use WPCC\Connect\PostTypes\StakePool;

class Plugin extends Base
{
    /**
     * @inheritDoc
     */
    public function run(): void
    {
	    add_action( 'init', [$this, 'registerBlocks'] );
	    add_action( 'init', [$this, 'registerPostTypes'] );
	    add_shortcode( 'cardano-connect-connector', [$this, 'registerConnectorShortcode']  );
	    add_shortcode( 'cardano-connect-assets', [$this, 'registerAssetsShortcode']  );
	    add_shortcode( 'cardano-connect-balance', [$this, 'registerBalanceShortcode']  );
	    add_shortcode( 'cardano-connect-pools', [$this, 'registerPoolsShortcode']  );

        (new Settings())->run();
        (new Assets())->run();
	    (new Api())->run();

        if ( is_admin() ) {
            (new Admin())->run();
        }
    }

    /**
     * Registers the block using the metadata loaded from the `block.json` file.
     * @return void
     */
    public function registerBlocks(): void
    {
	    register_block_type( $this->plugin_path . 'blocks/connector/build' );
	    register_block_type( $this->plugin_path . 'blocks/assets/build' );
	    register_block_type( $this->plugin_path . 'blocks/balance/build' );
	    register_block_type( $this->plugin_path . 'blocks/pools/build' );
    }

    /**
     * Include the connector shortcode template.
     */
    public function registerConnectorShortcode(): string
    {
		return $this->getTemplate('shortcode/cardano-connect-connector');
    }

	/**
	 * Include the assets shortcode template.
	 */
	public function registerAssetsShortcode($attributes = []): string
	{
		$formatted_attributes = shortcode_atts(
			array(
				'whitelist' => null,
				'per_page' => null,
				'hide_titles' => null,
				'not_found' => null,
			), $attributes
		);
		return $this->getTemplate('shortcode/cardano-connect-assets', $formatted_attributes);
	}

	/**
	 * Include the balance shortcode template.
	 */
	public function registerBalanceShortcode(): string
	{
		return $this->getTemplate('shortcode/cardano-connect-balance');
	}

	/**
	 * Include the pools shortcode template.
	 */
	public function registerPoolsShortcode($attributes = []): string
	{
		$formatted_attributes = shortcode_atts(
			array(
				'whitelist' => null,
				'per_page' => null,
				'not_found' => null,
			), $attributes
		);
		return $this->getTemplate('shortcode/cardano-connect-pools', $formatted_attributes);
	}

	public function registerPostTypes(): void
	{
		$stake_pool = new StakePool();
		$testnet_suffix = $this->getSetting( Base::SETTING_PREFIX . 'mainnet_active' ? '' : '_testnet');
		if ($this->getSetting(Base::SETTING_PREFIX.'pool_data_source'.$testnet_suffix) === 'local') {
			register_post_type(
				$stake_pool->getName(),
				$stake_pool->getConfig()
			);
		}
	}

    /**
     * Ran on activation.
     * Set default plugin options (existing options will not be updated).
     * @return void
     */
    public function onActivate(): void {
        foreach ($this->settings as $setting) {
            $settings_fields = array_column(
                $setting['sections'],
                'fields'
            )[0];
            $defaults = [];
            foreach ($settings_fields as $name => $settings_field) {
				if (isset($settings_field['default'])) {
					$defaults[ $name ] = $settings_field['default'];
				}
            }
            add_option($setting['name'], $defaults);
        }
    }

    /**
     * Ran on deactivation.
     * @return void
     */
    public function onDeactivate(): void {}
}