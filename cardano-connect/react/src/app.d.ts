declare var wpCardanoConnect: { nonce: string }

// Models

declare interface AjaxResponse<T>  {
    data: T
    nonce: string
    success: boolean
    message: string
}
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
    label_disconnect_prompt: string
    label_error: string
    label_invalid_account: string
    label_switch_to_testnet: string
    label_create_mainnet_prompt: string
    label_create_testnet_prompt: string
    label_welcome_back: string
    label_welcome_new: string
    label_paginate_prev: string
    label_paginate_next: string
    label_paginate_items: string
    label_assets_policy_label: string
    label_assets_quantity_label: string
    label_no_assets: string
    label_text_copied: string
    label_text_copied_failed: string
    assets_whitelist: string
    assets_api_endpoint: string
    assets_api_key: string
    assets_ipfs_endpoint: string
    assets_placeholder: string
}
declare type Message = {
    type: 'error' | 'success' | 'notice'
    id: number
    message: string
    timestamp: number
}
declare type Asset = {
    unit: string
    policyId: string
    assetName: string
    fingerprint: string
    quantity: string
}
declare type AssetFile = {
    mediaType: string
    name: string
    src: string
}
declare type ApiAsset = {
    cached?: number
    asset: string
    asset_name: string
    fingerprint: string
    quantity: string
    initial_mint_tx_hash: string
    mint_or_burn_count: number
    onchain_metadata: { [key in string]?: string } & {
        name: string
        description: string
        image: string
        mediaType: string
        files: AssetFile[]
    },
    onchain_metadata_standard: string
    onchain_metadata_extra: null
    policy_id: string
    metadata: {
        decimals: number
        description: string
        logo: string
        name: string
        ticker: string
        url: string
    },
    walletAsset: Asset
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

// States

declare type OptionState = Options
declare type UserState = {
    connected: boolean
    network: string | null
    web3: UserWeb3 | null
    user: User | null
    assets?: Asset[] | null
    apiAssets?: ApiAsset[] | null
    balances?: Balance[] | null
    collateral?: UxTO[]
    nonce: string | null
}
declare type MessageState = {
    messages: Message[]
}

// Component interfaces

declare interface ComponentConnector {}
declare interface ComponentAssets {
    perPage?: number
    hideTitles?: boolean
    notFound?: string
    whitelistString?: string
}
declare interface ComponentAsset {
    asset: ApiAsset
    showTitle?: boolean
    showModal?: boolean
    setShowModal?: (a: ApiAsset | null) => void
}
declare interface ComponentBalance {}
declare interface ComponentCopy {
    text: string | React.ReactElement
    copyText?: string
    title?: string
    className?: string
}
declare interface ComponentLoader {
    className?: string
    color?: string
}