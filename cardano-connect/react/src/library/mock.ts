export const mockOption: AjaxResponse<Options> = {
    nonce: 'nonce_value',
    success: true,
    message: 'Success',
    data: {
        label_connect: 'Cardano Connect',
        label_connect_cancel: 'Cancel',
        label_connected: 'Connected',
        label_create_mainnet_prompt: 'You are logged in but do not have a Mainnet wallet connected to your account.' +
            ' Please connect now to link your Mainnet account.',
        label_create_testnet_prompt: 'You are logged in but do not have a Tesnet wallet connected to your account.' +
            ' Please connect now to link your Testnet account.',
        label_disconnect: 'Are you sure you would like to disconnect?',
        label_empty: 'No wallets detected. Please install a Wallet browser extension or switch browsers.',
        label_error: 'Unable to sign authentication',
        label_invalid_account: 'Invalid account, please switch to the wallet you originally connected with.',
        label_switch_to_testnet: 'Mainnet connection is currently disabled, please switch to testnet to connect.',
        label_welcome_back: 'Welcome back to the website',
        label_welcome_new: 'Thanks for connecting',
        label_paginate_prev: 'Prev',
        label_paginate_next: 'Next',
        label_paginate_items: 'Items',
        label_assets_policy_label: 'Token Collection',
        label_assets_quantity_label: 'Qty',
        label_no_assets: 'No assets found in your wallet',
        label_text_copied: 'Copied!',
        label_text_copied_failed: 'Copy failed',
        login_redirect: null,
        logout_redirect: null,
        mainnet_active: true,
        plugin_name: 'cardano-connect',
        version: '0.1.0',
        assets_whitelist: "889d2c8073303f7e66d894d6ca3e1ed7ac01906e72b4227b98676e55" +
            " 4bf184e01e0f163296ab253edd60774e2d34367d0e7b6cbc689b567d c48699aa28e497a277c5271b7dff2e747e40e6d6dc46dc2ca963cc32",
        assets_api_endpoint: 'https://cardano-mainnet.blockfrost.io/api/v0/',
        assets_api_key: 'mainnetOLRdsudAM3buVEStJlUlXHAuKTpfYEWS',
        assets_ipfs_endpoint: 'https://ipfs.io/ipfs/',
        assets_placeholder: 'https://upstream.org.uk/wp-content/plugins/cardano-connect/assets/logo-dark.svg'
    }
}

export const mockUser: AjaxResponse<{ user: User|null; web3: UserWeb3|null }> = {
    nonce: 'nonce_value',
    success: true,
    message: '',
    data: {
        user: {
            data: {
                ID: '2',
                user_login: 'superadmin',
                user_pass: '$P$BvjQGVueJFc8QI\/rOniBcw0x7pOslH.',
                user_nicename: 'superadmin',
                user_email: 'wpadmin@pendulumdev.co.uk',
                user_url: '',
                user_registered: '2023-09-26 13:56:40',
                user_activation_key: '',
                user_status: '0',
                display_name: 'Superadmin'
            },
            ID: 2,
            caps: {
                administrator: true
            },
            cap_key: 'wp_capabilities',
            roles: [
                'administrator'
            ],
            filter: null
        },
        web3: {
            cardano_connect_network: 'testnet',
            cardano_connect_address: 'addr1qxszal5f5mm62ppxccd6kkjvf5k5l8ljw7audlnark96fw38kyycd8mpe47gdy6rcxcxh8krxke7v7lnd9crjfwjtqtszy6cnn',
            cardano_connect_stake_address: 'stake1uynmzzvxnasu6lyxjdpurvrtnmpntvlx00ekjupeyhf9s9cld72hf',
            cardano_connect_wallet: 'eternl',
            cardano_connect_address_testnet: 'addr_test1qrt7n958gtzy4cvsuarsu6gr058tj9s64zahd3ezrkq7f20zvgd6cz0xh86sq70jvk7z56zztgpfnt9v85zryhag9lcq2p9ezh',
            cardano_connect_stake_address_testnet: 'stake_test1ur3xyxavp8ntnagq08ext0p2dpp95q5e4jkr6ppjt75zluq9706vn'
        }
    },
}

export const mockUserUnauthenticated: AjaxResponse<{ user: User|null; web3: UserWeb3|null }> = {
    nonce: 'nonce_value',
    success: true,
    message: '',
    data: {
        user: null,
        web3: null
    },
}

export const mockApiAsset: AjaxResponse<ApiAsset> = {
    nonce: 'nonce_value',
    success: true,
    message: '',
    data: {
        asset: "c48699aa28e497a277c5271b7dff2e747e40e6d6dc46dc2ca963cc32557073747265616d4576656e745061737330303031",
        asset_name: "557073747265616d4576656e745061737330303031",
        fingerprint: "asset1cmeen64ysswcf2tckjhj6w2helpc20f5xfr9xz",
        initial_mint_tx_hash: "2a2b6363b545ae8634793201d688a5c1a55af5f924e6850265cabc9148af0fa1",
        metadata: null,
        mint_or_burn_count: 1,
        onchain_metadata: {
            Publisher: "https://upstream.org.uk",
            Rarity: "Bear",
            Type: "Torrent",
            description: "Ongoing access to Upstream and partnered events and unlockables",
            files: null,
            image: "ipfs://QmdanSQgrSHS1vsUen9tYk168rS12P3mMKh3yhPgQ4LJ2T",
            mediaType: "image/gif",
            name: "Upstream Event Pass 0001",
        },
        onchain_metadata_extra: null,
        onchain_metadata_standard: "CIP25v1",
        policy_id: "c48699aa28e497a277c5271b7dff2e747e40e6d6dc46dc2ca963cc32",
        quantity: "1",
        walletAsset: {
            policyId: "c48699aa28e497a277c5271b7dff2e747e40e6d6dc46dc2ca963cc32",
            assetName: '',
            quantity: '1',
            fingerprint: '',
            unit: '',
        }
    }
}