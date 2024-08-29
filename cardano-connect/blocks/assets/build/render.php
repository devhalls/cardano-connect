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
    data-perpage="<?php echo esc_attr( $attributes['perpage'] ?? 10 ); ?>"
    data-hide_titles="<?php echo esc_attr( $attributes['hide_titles'] ?? false ); ?>"
>
</div>
