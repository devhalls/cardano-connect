<?php
/**
 * Container for assets react node.
 * @var $whitelist string|null Comma seperated string of whitelisted policy IDs.
 * @var $per_page number|null Number of items per page | 0 = disable pagination.
 * @var $hide_titles bool Flag to hide collection titles in lists.
 * @var $not_found string Replaces options text for not found cases.
 */
?>
<div class="wp-block-cardano-connect-assets"
	<?php if ($whitelist) : ?>
        data-whitelist="<?php echo esc_attr( str_replace(",", "\n", $whitelist) ) ?>"
	<?php endif ?>
	<?php if (isset($per_page)) : ?>
        data-per_page="<?php echo esc_attr( $per_page ) ?>"
	<?php endif ?>
	<?php if ($hide_titles) : ?>
        data-hide_titles="<?php echo esc_attr( $hide_titles ) ?>"
	<?php endif ?>
	<?php if ($not_found) : ?>
        data-not_found="<?php echo esc_attr( $not_found ) ?>"
	<?php endif ?>
></div>
