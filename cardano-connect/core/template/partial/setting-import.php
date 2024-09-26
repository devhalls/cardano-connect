<?php
/**
 * @var WPCC\Settings $this
 */

use WPCC\Connect\PostTypes\StakePool;

$sync_items = !empty($_GET['sync_items']) && is_numeric($_GET['sync_items']) ? min([50, $_GET['sync_items']]) : 1;
$sync_item_ids = !empty($_GET['sync_item_ids']) ? [$_GET['sync_item_ids']] : null;
$sync_start = !empty($_GET['sync_start']) && is_numeric($_GET['sync_start']) ? $_GET['sync_start'] : null;
$sync_loop = !empty($_GET['sync_loop']) && is_numeric($_GET['sync_loop']) ? min([50, $_GET['sync_loop']]) : 1;
$sync_start_next = $sync_start ? $sync_start + 1 : 1;

$response = $sync_start
	? ( new StakePool() )->syncPools($this->loadProvider(), $sync_item_ids ?: $sync_items, $sync_start, $sync_loop)
	: null ;
?>

<form action="<?php echo $this->getSettingUrl() ?>#pool-import" method="get" class="wpcc-section" id="pool-import">
    <h3><?php esc_html_e("Sync pools", 'cardano-connect') ?></h3>
    <p><?php esc_html_e("Use these controls to manually sync pool data from the data provider.", 'cardano-connect') ?></p>

    <div class="wpcc-row">
        <div class="wpcc-col">
            <div class="wpcc-settings-sync-fields">
                <div>
                    <label for="sync_items">Page</label>
                    <input type="number" id="sync_start" name="sync_start" value="<?php echo $sync_start_next ?>" />
                </div>
                <div>
                    <label for="sync_items">Loops</label>
                    <input type="number" id="sync_loop" name="sync_loop" value="<?php echo $sync_loop ?>" />
                </div>
                <div>
                    <label for="sync_items">Items</label>
                    <input type="number" id="sync_items" name="sync_items" value="<?php echo $sync_items ?>" />
                </div>
            </div>
        </div>
        <div class="wpcc-col">
            <div class="wpcc-settings-sync-fields">
                <div>
                    <label for="sync_item_ids">Pool ID</label>
                    <input type="text" id="sync_item_ids" name="sync_item_ids" value="<?php echo $sync_item_ids ? $sync_item_ids[0] : null ?>" />
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" name="page" value="<?php echo $_GET['page'] ?? null ?>" />
    <button type="submit" class="button">Sync pools</button>

    <?php if ($response) : ?>
        <pre class="wpcc-pre">
            <code class="wpcc-code"><?php print_r( (array) $response->response ); ?></code>
        </pre>
    <?php endif; ?>
</form>
