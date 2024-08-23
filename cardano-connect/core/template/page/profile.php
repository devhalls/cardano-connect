<?php
/**
 * @var WP_User $user
 * @var WPCC\Admin $this
 */
?>
<hr class="wpcc-hr">
<div class="wpcc-section">
    <h3 class="wpcc-title">
        <img width="22" height="22" src="<?php echo esc_html($this->getAssetUrl('logo-color.svg')) ?>" alt="<?php esc_html_e("WP Cardano Connect", 'cardano-connect') ?>">
        <span><?php esc_html_e("Cardano Connect", 'cardano-connect'); ?></span>
    </h3>
    <p><?php esc_html_e("This users connected wallet details are listed below. You cannot edit these and users must connect their wallet directly. If you have existing user accounts, ask them to log in with their usual username and password before connecting to associate their web2 account with their wallet.", 'cardano-connect'); ?></p>
    <table class="form-table">
        <?php foreach ($this->user_fields as $f) :
            $value = esc_attr( get_the_author_meta( $f['name'], $user->ID ) );
            ?>
            <tr>
                <th>
                    <label for="<?php echo esc_html($f['name']) ?>"><?php echo esc_html($f['label']) ?></label>
                </th>
                <td>
                    <input
                        class="regular-text"
                        type="<?php echo esc_html($f['type']); ?>"
                        name="<?php echo esc_html($f['name']); ?>"
                        id="<?php echo esc_html($f['name']); ?>"
                        value="<?php echo esc_html($value); ?>"
                        <?php echo $f['required'] ? 'required' : ''; ?>
                        <?php echo $f['disabled'] ? 'disabled' : ''; ?>
                    />
                    <br />
                    <span class="description"><?php echo esc_html($f['description']) ?></span>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</div>