<?php

namespace WPCC;

use JsonException;

class Assets extends Base
{
    /**
     * Ends in forward slash.
     * @var string
     */
    private string $react_cdn;

    /**
     * Ends in forward slash.
     * @var string
     */
    private string $asset_cdn;

    /**
     * @inheritDoc
     */
    public function run(): void
    {
        $this->asset_cdn = $this->plugin_url . 'assets/';
        $this->react_cdn = $this->plugin_url . 'react/build/';
        add_action( 'admin_enqueue_scripts', [$this, 'registerAdminAssets'] );
        add_action( 'wp_enqueue_scripts', [$this, 'registerFrontendAssets'] );
    }

    /**
     * Output plugin admin JS and CSS.
     * @return void
     */
    public function registerAdminAssets(): void
    {
        wp_enqueue_style('wpcc-settings-css', $this->asset_cdn . 'admin.css', [], $this->version);
    }

	/**
	 * Output plugin frontend JS and CSS.
	 * Calling wp_localize_script adding wp_create_nonce('wp_rest') for js and reacts scope.
	 * @return void
	 */
    public function registerFrontendAssets(): void
    {
        if (!is_admin()) {
			try {
				ob_start();
				include $this->plugin_path . 'react/build/asset-manifest.json';
				$content = ob_get_contents();
				ob_clean();
				$json = json_decode( $content, false, 512, JSON_THROW_ON_ERROR );
			} catch (JsonException $e) {
				error_log($e->getMessage());
				return;
			}
			foreach ($json->entrypoints as $entrypoint) {
				if (strpos($entrypoint, '.js') !== false) {
                    wp_enqueue_script('wpcc-react-js', $this->react_cdn . $entrypoint, [], $this->version, true);
                    wp_localize_script('wpcc-react-js', 'wpCardanoConnect', [
                        'nonce' => wp_create_nonce('wp_rest')
                    ]);
				} else {
					wp_enqueue_style('wpcc-react-css', $this->react_cdn . $entrypoint, [], $this->version);
				}
			}
        }
    }
}