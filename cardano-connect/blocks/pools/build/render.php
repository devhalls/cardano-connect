<?php
/**
 * Render the frontend block HTML.
 * We assign data-* for any configurable block attributes to be read by React.
 */
/** @var $attributes */
/** @var $content */
/** @var $block */
?>
<div
    <?php echo wp_kses_data(get_block_wrapper_attributes()) ?>
    data-whitelist="<?php echo esc_attr( $attributes['whitelist'] ?? null ); ?>"
    data-per_page="<?php echo esc_attr( $attributes['per_page'] ?? 10 ); ?>"
    data-not_found="<?php echo esc_attr( $attributes['not_found'] ?? null ); ?>"
>
</div>
