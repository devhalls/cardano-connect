<?php
/**
 * Container for assets react node.
 * @var $whitelist string|null Comma seperated string of whitelisted policy IDs.
 * @var $perpage bool|null Flag to enable / disable pagination.
 */
?>
<div class="wp-block-cardano-connect-assets"
	<?php if (isset($perpage)) : ?>
        data-perpage="<?php echo esc_attr( $perpage ) ?>"
	<?php endif ?>
    <?php if ($whitelist) : ?>
        data-whitelist="<?php echo esc_attr( str_replace(",", "\n", $whitelist) ); ?>"
    <?php endif ?>
></div>
