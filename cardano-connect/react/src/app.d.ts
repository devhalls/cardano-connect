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
    login_redirect: null|string
    logout_redirect: null|string
    pools_data_source: string
    disable_styles: boolean
    assets_placeholder: string
    assets_whitelist: string
    assets_ipfs_endpoint: string
    label_connect: string
    label_connected: string
    label_connect_cancel: string
    label_disconnect: string
    label_empty: string
    label_disconnect_prompt: string
    label_disconnected_prompt: string
    label_error: string
    label_welcome_new: string
    label_welcome_back: string
    label_switch_to_testnet: string
    label_invalid_account: string
    label_create_mainnet_prompt: string
    label_create_testnet_prompt: string
    label_paginate_prev: string
    label_paginate_next: string
    label_paginate_items: string
    label_paginate_search_text: string
    label_paginate_search_text_placeholder: string
    label_paginate_search_metadata: string
    label_paginate_search_retired: string
    label_paginate_search_saturation: string
    label_paginate_search_order: string
    label_paginate_search_update: string
    label_paginate_search_reset: string
    label_assets_policy_label: string
    label_assets_quantity_label: string
    label_no_assets: string
    label_no_pools: string
    label_no_pool: string
    label_delegate_to_pool: string
    label_delegated_to_pool: string
    label_pool_fees: string
    label_pool_stake: string
    label_pool_stake_saturated: string
    label_pool_pledge_met: string
    label_pool_pledge_not_met: string
    label_pool_retiring: string
    label_pool_retired: string
    label_pool_synced: string
    label_pool_lifetime_blocks: string
    label_pool_last_epoch_blocks: string
    label_pool_delegators: string
    label_compare_view_pools: string
    label_compare_view_dreps: string
    label_compare_add: string
    label_compare_remove: string
    label_compare_no_items: string
    label_text_copied: string
    label_text_copied_failed: string
}
declare type Message = {
    type: 'error' | 'success' | 'notice'
    id: number
    message: string
    timestamp: number
    timeout?: number
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
    web3: UserWeb3,
    account: UserAccount
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
declare type UserAccount = {
    stake_address: string
    active: boolean
    active_epoch: number
    controlled_amount: string
    rewards_sum: string
    withdrawals_sum: string
    reserves_sum: string
    treasury_sum: string
    drep_id: string,
    withdrawable_amount: string,
    pool_id: string
}
declare type ImageFormatted = {
    src: string
    title: string
}
declare type Pool = {
    pool_id: string
}
declare type PoolData = {
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
    reward_account: string|null
    owners: string[]|null
    registration: string[]|null
    retirement: string[]|null
    metadata: PoolMetadata|null
    metadata_extended: PoolMetadataExtended|null
    synced_at: string | null
}
declare type PoolMetadata = {
    url: string|null
    hash: string|null
    ticker: string|null
    name: string|null
    description: string|null
    homepage: string|null
    extended: string|null
}
declare type PoolMetadataExtended = {
    info: {
        url_png_icon_64x64: string|null
        url_png_logo: string|null
        location: string|null
        social: {
            twitter_handle: string|null
            telegram_handle: string|null
            facebook_handle: string|null
            youtube_handle: string|null
            twitch_handle: string|null
            discord_handle: string|null
            github_handle: string|null
            linkedin_handle: string|null
        },
        verification_cexplorer: string|null,
        // about?: {
        //     me?: string
        //     server?: string
        //     company?: string
        // },
    },
    itn: {
        owner: string,
        witness: string
    }|null,
    //votes: string[]|null
}
declare type Filter = {
    type: 'text' | 'checkbox' | 'range' | 'select'
    key: string,
    value: any
    label?: string,
    className?: string
    placeholder?: string,
    options?: any
    min?: number
    max?: number
    format?: (value: any) => any
    display?: (value: any) => any
    order: number
}
declare type FilterPost = {
    type: Filter['type']
    key: Filter['key']
    value: Filter['value']
}
declare type Drep = {
    drep_id: string
}
declare type DrepData = {
    drep_id: string
    hex: string
    amount: string
    active: boolean
    active_epoch: number
    has_script: boolean
    metadata: DrepMetadata|null
}
declare type DrepMetadata = {
    drep_id: string
    hex: string
    url: string
    hash: string
    json_metadata: any
    bytes: string
}

// States

declare type UxState = {
    assetModal: { asset: ApiAsset; images: ImageFormatted[] } | null
    compareModal: 'pools' | 'dreps' | null
    comparePools: PoolData[] | null
    compareDreps: DrepData[] | null
}
declare type OptionState = Options
declare type UserState = {
    connected: boolean
    network: string | null
    web3: UserWeb3 | null
    user: User | null
    account: UserAccount | null
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
    pools?: PoolData[]
}
declare interface ComponentPool {
    poolId: string
    index: number
    delegateStake?: (poolId: string) => Promise<void>
    key?: string
    pool?: PoolData
}
declare interface ComponentDreps {
    whitelistString?: string,
    perPage?: number
    notFound?: string
    dreps?: Drep[]
}
declare interface ComponentDrep {
    drepId: string
    index: number
    delegateStake?: (drepId: string) => Promise<void>
    key?: string
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
    toolTip?: string
    toolTipId?: string
}
declare interface ComponentLoader {
    className?: string
    color?: string
}
declare interface ComponentPaginator<T> {
    renderer: (item: T, index: number) => React.ReactElement
    fetcher: (page: number, perPage: number, filters?: FilterPost[]) => Promise<PaginatedData<T>>
    perPage?: number
    className?: string
    notFound?: string
    defaultFilters?: Filter[]
}
declare interface ComponentFilter {
    filter: Filter,
    setFilter: (filter: Filter) => void
    key?: string
}