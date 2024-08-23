declare var wpCardanoConnect: { nonce: string }
// Asset as from wallet
declare type Asset = {
    unit: string
    policyId: string
    assetName: string
    fingerprint: string
    quantity: string
}
// Asset as from WP API
declare type ApiAsset = {
    asset: string
    policy_id: string
    asset_name: string
    fingerprint: string
    quantity: string
    initial_mint_tx_hash: string
    mint_or_burn_count: number
    onchain_metadata: {
        name: string
        type: string
        image: string
        attributes: string[]
    },
    onchain_metadata_standard: string
    onchain_metadata_extra: null
    metadata: null
}
declare type Balance = {
    unit: string
    quantity: string
}
declare type UxTO = {
    input: {
        outputIndex: number
        txHash: string
    }
    output: {
        address: string
        amount: Balance[]
        dataHash: string | null
        plutusData: string | null
        scriptRef: string | null
    }
}
declare type UserData = {
    user: User,
    web3: UserWeb3
}
declare type User = {
    ID: number
    cap_key: string
    caps: {
        administrator: boolean
    }
    data: {
        ID: string
        display_name: string
        user_activation_key: string
        user_email: string
        user_login: string
        user_nicename: string
        user_pass: string
        user_registered: string
        user_status: string
        user_url: string
    }
    filter: string|null
    roles: string[]
}
declare type UserWeb3 = {
    cardano_connect_address: string
    cardano_connect_stake_address: string
    cardano_connect_wallet: string
    cardano_connect_address_testnet: string
    cardano_connect_stake_address_testnet: string
    cardano_connect_network: 'mainnet'|'testnet'
}
declare type UserState = {
    connected: boolean
    network: string | null
    web3: UserWeb3 | null
    user: User | null
    assets?: Asset[]
    balances?: Balance[]
    collateral?: UxTO[]
    nonce: string | null
    error?: string | null
}
declare type OptionState = Options & { error?: string | null }
declare type Options = {
    version: string
    plugin_name: string
    mainnet_active: boolean
    login_redirect: null|string
    logout_redirect: null|string
    label_connect: string
    label_connected: string
    label_connect_cancel: string
    label_empty: string
    label_disconnect: string
    label_error: string
    label_invalid_account: string
    label_switch_to_testnet: string
    label_create_mainnet_prompt: string
    label_create_testnet_prompt: string
    label_welcome_back: string
    label_welcome_new: string
    label_no_assets: string
    assets_whitelist: string
    assets_api_endpoint: string
    assets_api_key: string
    assets_ipfs_endpoint: string
    assets_placeholder: string
}
declare interface AjaxResponse<T>  {
    data: T
    nonce: string
    success: boolean
    message: string
}
declare interface ComponentConnector {
    loader?: string
    classMap?: {
        container: string
        connected: string
        disconnected: string
        list: string
        listButton: string
        listEmpty: string
        button: string
        buttonIcon: string
        buttonContent: string
        buttonText: string
        buttonAddress: string
        errorContainer: string
    }
}
declare interface ComponentAssets {
    perPage?: number
    whitelistString?: string
    loader?: string
    classMap?: {
        container: string
        errorContainer: string
        loader: string
        assetContainer: string
        assetPagination: string
        assetNotFound: string
    }
}

declare interface ComponentAsset {
    asset: ApiAsset
    index: number
    filteredApiAssets: ApiAsset[]
    classMap?: {
        assetTitle: string
        assetItem: string
        assetItemCol: string
        assetItemBlock: string
        assetItemImage: string
        assetItemText: string
        assetItemQuantity: string
        assetItemTitle: string
    }
}


declare interface ComponentBalance {
    loader?: string
    classMap?: {
        container: string
        errorContainer: string
        loader: string
        row: string
        col: string
        total: string
        cost: string
    }
}