<?php
/**
 * @var WPCC\Settings $this
 * @var string $classes
 * @var string $field_name
 * @var string $setting_name
 * @var string $note
 * @var string $default
 * @var array $options
 */
?>
<select
    id="<?php echo esc_html($setting_name) ?>"
	class="<?php echo esc_html($classes) ?>"
    name="<?php echo esc_html($setting_name) ?>[<?php echo esc_html($field_name) ?>]"
>
	<?php foreach ($options as $option) :
		if (array_key_exists($field_name, $this->current_settings)) {
			$selected = $this->current_settings[$field_name] === $option['value'];
		} else {
			$selected = $default === $option['value'];
		}
        ?>
		<option <?php echo $selected ? 'selected="' . esc_html($selected) . '"' : null ?> value="<?php echo esc_html($option['value']) ?>"><?php echo esc_html($option['label']) ?></option>
	<?php endforeach ?>
</select>
<?php if (isset($note)) : ?>
	<p class="description"><?php echo esc_html($note) ?></p>
<?php endif ?>
