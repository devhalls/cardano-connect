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
        label_no_assets: 'No assets found in your wallet',
        login_redirect: null,
        logout_redirect: null,
        mainnet_active: true,
        plugin_name: 'cardano-connect',
        version: '0.1.0',
        assets_whitelist: null,
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