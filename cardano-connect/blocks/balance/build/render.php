<?php
/**
 * Render the frontend block HTML.
 * We assign data-* for any configurable block attributes to be read by React.
 */
/** @var $attributes */
/** @var $content */
/** @var $block */
?>
<div <?php echo wp_kses_data(get_block_wrapper_attributes()) ?>>
</div>
