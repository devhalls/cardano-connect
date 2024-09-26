<?php
/**
 * Container for DReps react node.
 * @var $whitelist string|null Comma seperated string of whitelisted pool IDs.
 * @var $per_page number|null Number of items per page | 0 = disable pagination.
 * @var $not_found string Replaces options text for not found cases.
 */
?>
<div class="wp-block-cardano-connect-dreps"
	<?php if ($whitelist) : ?>
        data-whitelist="<?php echo esc_attr( str_replace(",", "\n", $whitelist) ) ?>"
	<?php endif ?>
	<?php if (isset($per_page)) : ?>
        data-per_page="<?php echo esc_attr( $per_page ) ?>"
	<?php endif ?>
	<?php if ($not_found) : ?>
        data-not_found="<?php echo esc_attr( $not_found ) ?>"
	<?php endif ?>
></div>
