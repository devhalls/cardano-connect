<?php

namespace WPCC;

class Plugin extends Base
{
    /**
     * @inheritDoc
     */
    public function run(): void
    {
	    add_action( 'init', [$this, 'registerBlocks'] );
	    add_shortcode( 'cardano-connect-connector', [$this, 'registerConnectorShortcode']  );
	    add_shortcode( 'cardano-connect-assets', [$this, 'registerAssetsShortcode']  );
	    add_shortcode( 'cardano-connect-balance', [$this, 'registerBalanceShortcode']  );

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
    }

    /**
     * Include the shortcode template.
     */
    public function registerConnectorShortcode(): string
    {
		return $this->getTemplate('shortcode/cardano-connect-connector');
    }

	/**
	 * Include the shortcode template.
	 */
	public function registerAssetsShortcode($attributes = []): string
	{
		$formatted_attributes = shortcode_atts(
			array(
				'whitelist' => null,
				'perpage' => null,
			), $attributes
		);
		return $this->getTemplate('shortcode/cardano-connect-assets', $formatted_attributes);
	}

	/**
	 * Include the shortcode template.
	 */
	public function registerBalanceShortcode(): string
	{
		return $this->getTemplate('shortcode/cardano-connect-balance');
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
                $defaults[$name] = $settings_field['default'];
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