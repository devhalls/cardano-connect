declare var wpCardanoConnect: { nonce: string }

declare interface AjaxResponse<T> {
    data: T
    nonce: string
    success: boolean
    message: string
}
declare interface PaginatedData<T> {
    total: number,
    items: T[]
}

// Models

declare type Options = {
    version: string
    plugin_name: string
    mainnet_active: boolean
    disable_styles: boolean
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
    onchain_metadata: any,
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
declare type ImageFormatted = {
    src: string
    title: string
}
declare type Pool = {
    pool_id: string
}
declare type PoolData = {
    metadata?: PoolMetadata
    data?: PoolDetails
    metadata_file?: PoolMetadataFile
    metadata_file_extended?: PoolMetadataFileExtended
}
declare type PoolDetails = {
    pool_id: string
    hex: string
    vrf_key: string
    blocks_minted: number
    blocks_epoch: number
    live_stake: string
    live_size: number
    live_saturation: number
    live_delegators: number
    active_stake: string
    active_size: number
    declared_pledge: string
    live_pledge: string
    margin_cost: number
    fixed_cost: string
    reward_account: string
    owners: string[]
    registration: string[]
    retirement: string[]
}
declare type PoolMetadata = {
    pool_id: string
    hex: string
    url: string
    hash: string
    ticker: string
    name: string
    description: string
    homepage: string
}
declare type PoolMetadataFile = {
    ticker: string
    name: string
    description: string
    homepage: string
    extended?: string
}
declare type PoolMetadataFileExtended = {
    info: {
        url_png_icon_64x64?: string
        url_png_logo?: string
        location?: string
        social: {
            twitter_handle?: string
            telegram_handle?: string
            facebook_handle?: string
            youtube_handle?: string
            twitch_handle?: string
            discord_handle?: string
            github_handle?: string
        },
        about: {
            me: string
            server: string
            company: string
        },
    }
}

// States

declare type UxState = {
    assetModal: { asset: ApiAsset; images: ImageFormatted[] } | null
}
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
}
declare interface ComponentPools {
    whitelistString?: string,
    perPage?: number
    notFound?: string
}
declare interface ComponentPool {
    poolId: string
    index: number
}
declare interface ComponentBalance {
    className?: string
}
declare interface ComponentBar {
    title: string | React.ReactElement
    content?: string | React.ReactElement
    percentage: number
    colorMap?: { [key in number]: string }
    defaultColor?: string
    className?: string
}
declare interface ComponentStats {
    title?: string | React.ReactElement
    stats: {
        content: string | React.ReactElement
        color: string
    }[]
    className?: string
}
declare interface ComponentCopy {
    text: string | React.ReactElement
    copyText?: string
    title?: string
    className?: string
}
declare interface ComponentLinkIcon {
    title: string
    url: string
    icon?: string
    className?: string
}
declare interface ComponentLoader {
    className?: string
    color?: string
}
declare interface ComponentPaginator<T> {
    renderer: (item: T, index: number) => React.ReactElement
    fetcher: (page: number, perPage: number) => Promise<PaginatedData<T>>
    perPage?: number
    className?: string
    notFound?: string
}