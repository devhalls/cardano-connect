<?php

namespace WPCC;

class Settings extends Base
{
    /**
     * Plugin settings page slug / name.
     * @var string
     **/
    public const SETTINGS_PAGE = self::SETTING_PREFIX . 'settings';

    /**
     * Default settings display tab.
     * @var string
     **/
    public const DEFAULT_SETTINGS_TAB = self::SETTING_PREFIX . 'main_settings_group';

    /**
     * The currently displayed settings tab, defaults to self::DEFAULT_SETTINGS_TAB.
     * @var string
     **/
    public string $current_settings_group;

    /**
     * All plugin setting values are loaded here.
     * @var array
     **/
    public array $current_settings = [];

    /**
     * @inheritDoc
     */
    public function run(): void
    {
        add_action('admin_init', [$this, 'registerSettings']);
        add_action('admin_menu', [$this, 'adminMenu'], 1);
	    $this->current_settings_group = self::DEFAULT_SETTINGS_TAB;
        $this->current_settings = get_option($this->settings[$this->current_settings_group]['name']) ?: [];
    }

    /**
     * @return  void
     */
    public function registerSettings(): void
    {
        foreach ($this->settings as $setting_group => $setting) {
            register_setting(
                $setting_group,
                $setting['name'],
                [$this, 'validateSettings']
            );

            foreach ($setting['sections'] as $section_name => $section) {
                add_settings_section(
                    $section_name,
                    '',
                    [$this, $section['callback']],
                    $setting_group
                );

                foreach ($section['fields'] as $field_name => $field) {
                    $params = [
                        'setting_name' => $setting['name'],
                        'field_name' => $field_name,
                        'field_data' => $field
                    ];

                    /**
                     * Removes unnecessary array item and merges creates new params array by merging
                     * current params with additional args
                     */
                    if (isset($field['args'])) {
                        unset($params['field_data']['args']);
                        $params += $field['args'];
                    }

                    add_settings_field(
                        $field_name,
                        $field['label'],
                        [$this, 'renderField'],
                        $setting_group,
                        $section_name,
                        $params
                    );
                }
            }
        }

		// Set the active page based on tab navigation.

	    if (
			isset($_GET['tab'], $_GET['_wpnonce']) &&
	        wp_verify_nonce( sanitize_text_field( $_GET[ '_wpnonce' ] ))
	    ) {
		    $this->current_settings_group = $_GET['tab'];
		    $this->current_settings = get_option($this->settings[$this->current_settings_group]['name']) ?: [];
	    }
    }

    /**
     * @return void
     */
    public function adminMenu(): void
    {
        add_menu_page(
            __('Cardano Connect', 'cardano-connect'),
	        __('Cardano Connect', 'cardano-connect'),
            'manage_options',
            self::SETTING_PREFIX.'dashboard',
            [$this, 'dashboardOutput'],
            $this->getAssetUrl('menu-icon.svg')
        );

        add_submenu_page(
            self::SETTING_PREFIX.'dashboard',
	        __('Cardano Connect &rarr; Settings', 'cardano-connect'),
	        __('Settings', 'cardano-connect'),
            'manage_options',
            self::SETTING_PREFIX.'settings',
            [$this, 'settingsOutput']
        );
    }

    /**
     * @return void
     */
    public function dashboardOutput(): void
    {
        $this->getTemplate('page/dashboard', [], true);
    }

    /**
     * @return void
     */
    public function settingsOutput(): void
    {
	    $this->getTemplate('page/settings', [], true);
    }

    /**
     * Apply field validation to $_POST data and sanitize.
     **/
    public function validateSettings($input): array
    {
		if (wp_verify_nonce( sanitize_text_field( $_POST[ '_wpnonce' ] ))) {
			return [];
		}

        if (
            isset($_POST['action'], $_POST[self::SETTINGS_PAGE]) &&
            $_POST['action'] === 'update'
        ) {
            $settings_fields = array_column(
                $this->settings[$_POST[self::SETTINGS_PAGE]]['sections'],
                'fields'
            )[0];

            // Apply validation rules
            foreach ($settings_fields as $field_name => $field_array) {
                if (!array_key_exists('rules', $field_array)) {
                    continue;
                }
                foreach ($field_array['rules'] as $rule) {
                    if (($rule === 'required') && empty($input[$field_name])) {
                        add_settings_error($field_name, 'required-'.$field_name, $field_array['label'] . __(' is required', 'cardano-connect'), 'error');
                        $input[$field_name] = $this->getSetting($field_name);
                    }
                    if (($rule === 'email') && false === is_email($input[$field_name])) {
                        add_settings_error($field_name, 'invalid-'.$field_name, $field_array['label'] . __(' invalid email address', 'cardano-connect'), 'error');
                        $input[$field_name] = $this->getSetting($field_name);
                    }
                }
            }
        }

        return is_array($input) ? $this->sanitizeArray($input) : $input;
    }

	/**
	 * Render the fields HTML.
	 * @param array $params
	 * @return void
	 */
    public function renderField(array $params): void
    {
        switch ($params['field_data']['type']) {
            case 'text':
                $this->renderFieldText($params['setting_name'], $params['field_name'], $params['field_data']);
                break;

            case 'textarea':
                $this->renderFieldTextarea($params['setting_name'], $params['field_name'], $params['field_data']);
                break;

            case 'wysiwyg':
                $this->renderFieldWysiwyg($params['setting_name'], $params['field_name'], $params['field_data']);
                break;

            case 'email':
                $this->renderFieldEmail($params['setting_name'], $params['field_name'], $params['field_data']);
                break;

            case 'checkbox':
                $this->renderFieldCheckbox($params['setting_name'], $params['field_name'], $params['field_data']);
                break;

	        case 'select':
		        $this->renderFieldSelect($params['setting_name'], $params['field_name'], $params['field_data']);
		        break;

	        case 'title':
		        $this->renderFieldTitle($params['setting_name'], $params['field_name'], $params['field_data']);
		        break;
        }
    }

    public function renderFieldText($setting_name, $field_name, $field_data): void
    {
        $default = $field_data['default'] ?: null;
        $extra_classes = $field_data['extra_classes'] ?? '';
        printf(
            '<input type="text" class="regular-text %s" id="%s" name="%s[%s]" value="%s" /> %s',
	        esc_html($extra_classes),
            esc_html($field_name),
            esc_html($setting_name),
            esc_html($field_name),
	        esc_html($this->current_settings[$field_name] ?? $default),
	        isset($field_data['note']) ? '<p class="description">' . esc_html($field_data['note']) . '</p>' : ''
        );
    }

    public function renderFieldTextarea($setting_name, $field_name, $field_data): void
    {
        $default = $field_data['default'] ?: null;
        $extra_classes = $field_data['extra_classes'] ?? '';
        printf(
            '<textarea type="text" class="regular-text %s" id="%s" name="%s[%s]" rows="10">%s</textarea>%s',
	        esc_html($extra_classes),
			esc_html($field_name),
			esc_html($setting_name),
			esc_html($field_name),
            esc_html($this->current_settings[$field_name] ?? $default),
            isset($field_data['note']) ? '<p class="description">' . esc_html($field_data['note']) . '</p>' : ''
        );
    }

    public function renderFieldWysiwyg($setting_name, $field_name, $field_data): void
    {
        $default = $field_data['default'] ?: null;
        $content = $this->current_settings[$field_name] ?? $default;
        $settings = array(
            'teeny' => true,
            'textarea_rows' => 15,
            'textarea_name' => $setting_name.'['.$field_name.']',
        );
        wp_editor($content, $field_name, $settings);
    }

    public function renderFieldEmail($setting_name, $field_name, $field_data): void
    {
        $default = $field_data['default'] ?: null;
        $extra_classes = $field_data['extra_classes'] ?? '';
        printf(
            '<input type="email" class="regular-text %s" id="%s" name="%s[%s]" value="%s" /> %s',
	        esc_html($extra_classes),
	        esc_html($field_name),
	        esc_html($setting_name),
	        esc_html($field_name),
	        esc_html($this->current_settings[$field_name] ?? $default),
            isset($field_data['note']) ? '<p class="description">' . esc_html($field_data['note']) . '</p>' : ''
        );
    }

    public function renderFieldCheckbox($setting_name, $field_name, $field_data): void
    {
        $default = $field_data['default'] ?? null;
        $extra_classes = $field_data['extra_classes'] ?? '';
        printf(
            '<input type="checkbox" class="%s" id="%s" name="%s[%s]" value="1" %s /> %s',
	        esc_html($extra_classes),
	        esc_html($field_name),
	        esc_html($setting_name),
	        esc_html($field_name),
	        esc_html((isset($this->current_settings[$field_name]) && $this->current_settings[$field_name]) || $default ? 'checked' : ''),
            esc_html($field_data['note'] ?? '')
        );
    }

    public function renderFieldSelect($setting_name, $field_name, $field_data): void
    {
        $default = $field_data['default'] ?: null;
        $extra_classes = $field_data['extra_classes'] ?? '';
		$this->getTemplate('partial/setting-select', [
			'classes' => $extra_classes,
			'options' => $field_data['options'],
			'field_name' => $field_name,
			'setting_name' => $setting_name,
			'note' => $field_data['note'] ?? null,
			'default' => $default,
		], true);
    }

	public function renderFieldTitle($setting_name, $field_name, $field_data): void
	{
		echo isset($field_data['note']) ? '<p>' . esc_html($field_data['note']) . '</p>' : null;
	}

    /**
     * Settings group callback, intentionally black, unused but necessary for WP settings API.
     * @return void
     */
    public function settingsCallback(): void {}
}