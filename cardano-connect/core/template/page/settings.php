<?php
/**
 * @var WPCC\Settings $this
 */
?>

<div class="wrap">

	<?php $this->getTemplate('partial/title', ['title' => esc_html(get_admin_page_title())], true); ?>

    <?php settings_errors() ?>

    <div class="wpcc-row">
        <div class="wpcc-col-2">
	        <?php $this->getTemplate('partial/info-'.$this->current_settings_group, [], true); ?>
	        <?php $this->getTemplate('partial/notice', [], true); ?>
        </div>
        <div class="wpcc-col-1">
            <div class="nav-tab-wrapper">
                <?php
                foreach ($this->settings as $setting_group => $setting) : ?>
                    <a
                        href="<?php echo esc_html($this->getSettingUrl($setting_group)) ?>"
                        class="nav-tab <?php echo esc_html(($this->current_settings_group === $setting_group ? 'nav-tab-active' : '')) ?>"
                    >
                        <?php echo esc_html($setting['tab_label']) ?>
                    </a>
                <?php endforeach; ?>
            </div>
            <form method="post" action="options.php">
                <input type="hidden"
                       name="<?php echo esc_html(WPCC\Settings::SETTINGS_PAGE) ?>"
                       value="<?php echo esc_html($this->current_settings_group) ?>"
                />
                <?php wp_nonce_field($this->plugin_name) ?>
                <?php settings_fields($this->current_settings_group); ?>
                <?php do_settings_sections($this->current_settings_group); ?>
                <?php submit_button(); ?>
            </form>
        </div>
    </div>
</div>
