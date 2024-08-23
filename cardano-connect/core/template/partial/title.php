<?php
/**
 * @var WPCC\Settings $this
 * @var string $title
 */
?>

<h2 class="wpcc-title">
	<img width="31" height="31" src="<?php echo esc_html($this->getAssetUrl('logo-color.svg')) ?>"  alt="<?php
    esc_html_e("WP Cardano Connect", 'cardano-connect') ?>"/>
	<?php echo esc_html($title) ?>
</h2>