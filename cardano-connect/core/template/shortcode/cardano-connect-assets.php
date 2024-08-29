<?php
/**
 * Container for assets react node.
 * @var $whitelist string|null Comma seperated string of whitelisted policy IDs.
 * @var $perpage number|null Number of items per page | 0 = disable pagination.
 * @var $hide_titles bool Flag to hide collection titles in lists.
 */
?>
<div class="wp-block-cardano-connect-assets"
	<?php if (isset($perpage)) : ?>
        data-perpage="<?php echo esc_attr( $perpage ) ?>"
	<?php endif ?>
    <?php if ($whitelist) : ?>
        data-whitelist="<?php echo esc_attr( str_replace(",", "\n", $whitelist) ); ?>"
    <?php endif ?>
	<?php if ($hide_titles) : ?>
        data-hide_titles="<?php echo esc_attr( $hide_titles ); ?>"
	<?php endif ?>
></div>
