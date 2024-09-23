<?php
/**
 * @var WPCC\Settings $this
 */

use WPCC\Base;

if (!empty($this->getSetting( Base::SETTING_PREFIX . 'mainnet_active'))) : ?>
    <div class="wpcc-section wpcc-section-success">
        <h3><strong><?php esc_html_e("Mainnet active", 'cardano-connect') ?></strong></h3>
        <p><?php esc_html_e("Users can will now be allowed to connect with their Mainnet and Testnet wallets. Please read the below notes for ensuring users Testnet accounts are linked to the user Mainnet accounts if required.", 'cardano-connect') ?></p>
        <h4><?php esc_html_e("Linking Mainnet and Testnet accounts", 'cardano-connect') ?></h4>
        <p><?php esc_html_e("When you activate Mainnet your users will also be able to connect with their Mainnet accounts. If the user is already connected with their Testnet account before switching networks and re-connecting with their Mainnet account, this will automatically associate the 2 network accounts and allow you to track cross network activity.", 'cardano-connect') ?></p>
        <a class="button button-primary" target="_blank" href="<?php echo esc_html(WPCC\Base::PLUGIN_GUIDE) ?>"><?php esc_html_e("Using Cardano Connect", 'cardano-connect') ?></a>
    </div>
<?php else : ?>
    <div class="wpcc-section wpcc-section-warning">
        <h3><strong><?php esc_html_e("Testnet active", 'cardano-connect') ?></strong></h3>
        <p><?php esc_html_e("Users can only connect with their Testnet wallets and will be denied access if attempting to connect with Mainnet.", 'cardano-connect') ?></p>
        <p>
	        <?php esc_html_e("Inform your users to use a specific Testnet to keep things easy to manage while you build your Web3 website.", 'cardano-connect') ?>
	        <?php esc_html_e("Inform your users to use a specific Testnet to keep things easy to manage while you build your Web3 website.", 'cardano-connect') ?>
            <a target="_blank" href="https://docs.cardano.org/cardano-testnets/environments/"><?php esc_html_e("Read about Cardano Testnet's", 'cardano-connect') ?></a>.
	        <?php esc_html_e("When your ready activate Mainet access from the Main settings page.", 'cardano-connect') ?>
        </p>
        <a class="button button-primary" href="<?php echo esc_html($this->getSettingUrl()) ?>"><?php esc_html_e("Manage settings", 'cardano-connect') ?></a>
        <h4><?php esc_html_e("Linking Mainnet and Testnet accounts", 'cardano-connect') ?></h4>
        <p><?php esc_html_e("When you activate Mainnet your users will be able to connect with their Mainnet accounts, and tf a user is already connected with their Testnet wallet then follows the below steps, this will automatically associate their Testnet and Mainnet wallets with their WordPress account allowing you to track cross network activity.", 'cardano-connect') ?></p>
        <ol>
            <li><?php esc_html_e("Starting with the user logged in to the website with their Testnet wallet.", 'cardano-connect') ?></li>
            <li><?php esc_html_e("Go to your wallet and change the network to Mainnet.", 'cardano-connect') ?></li>
            <li><?php esc_html_e("Go to your wallet and change the network to Mainnet.", 'cardano-connect') ?></li>
        </ol>
        <a class="button button-primary" target="_blank" href="<?php echo esc_html(WPCC\Base::PLUGIN_GUIDE) ?>"><?php esc_html_e("Using Cardano Connect", 'cardano-connect') ?></a>
    </div>
<?php endif ?>