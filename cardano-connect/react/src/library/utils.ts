export const trimAddress = (string: string, padded: number = 6) => {
    return string
        ? `${string.substring(0, padded)}...${string.substring(string.length-(padded), string.length)}`
        : ''
}

export const trimText = (string: string | string[], maxLength: number, ellipsis?: boolean): string => {
    let trimmed: string
    if (!string) {
        return
    }
    if (typeof string === 'string') {
        trimmed = string.substring(0, maxLength)
    } else {
        trimmed = string.join(' ').substring(0, maxLength)
    }
    return (
        trimmed.trim() +
        (ellipsis && trimmed?.length >= maxLength ? '...' : '')
    )
}

export const translateError = (error: string): string => {
    let formattedError: string = error
    const replacements: {match: string; replace: string}[] = [
        {
            match: 'user canceled connection',
            replace: 'User canceled the connection'
        },{
            match: 'no account set',
            replace: 'No account is set for connection, please enable a connection in your wallet then try again'
        }
    ]
    replacements.map(r => {
        if (formattedError.includes(r.match)) {
            formattedError = r.replace
        }
    })
    return formattedError
}

export const formatBalance = (quantity: string): string => {
    const asNumber: number = parseInt(quantity, 10)
    if (asNumber <= 0) {
        return '0'
    }
    const formatted: number = parseInt((asNumber / 1_00).toString(), 10)
    return formatted.toString().slice(0, -4) + '.' + formatted.toString().slice(-4)
}

export const formatNumber = (x: number): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const ucFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const convertToApiAsset = (asset: Asset): ApiAsset => {
    return {
        asset: asset.unit,
        asset_name: asset.assetName,
        fingerprint: asset.fingerprint,
        initial_mint_tx_hash: null,
        metadata: null,
        mint_or_burn_count: 0,
        onchain_metadata: {
            name: asset.assetName,
            description: null,
            image: null,
            mediaType: null,
            files: null
        },
        onchain_metadata_extra: null,
        onchain_metadata_standard: null,
        policy_id: asset.policyId,
        quantity: asset.quantity,
        walletAsset: asset
    }
}

export const classMap = {
    // General use classes.
    loader: 'wpcc-loader wpcc-card',
    error: 'wpcc-error',
    row: 'wpcc-row',
    col: 'wpcc-col',
    notFound: 'wpcc-not-found wpcc-card',
    pagination: 'wpcc-pagination wpcc-card',
    copy: 'wpcc-copy',
    // Connector component classes.
    container: 'connector-container',
    connected: 'connector-content connector-connected',
    disconnected: 'connector-content connector-disconnected',
    list: 'connector-wallet-list wpcc-card',
    menu: 'connector-menu-list wpcc-card',
    listButton: 'connector-list-button',
    listEmpty: 'connector-no-wallets',
    button: 'connector-button',
    buttonIcon: 'connector-icon',
    buttonContent: 'connector-button-content',
    buttonText: 'connector-button-text',
    buttonAddress: 'connector-button-address',
    errorContainer: 'connector-error',
    // Balance classes.
    balanceContainer: 'wpcc-balance wpcc-card',
    balanceRow: 'wpcc-balance-row',
    balanceCol: 'wpcc-balance-col',
    balanceTotalRow: 'wpcc-balance-total-row wpcc-balance-row',
    // Asset list classes.
    assetsContainer: 'wpcc-assets-container',
    assetTitle: 'wpcc-assets-title',
    assetTitleText: 'wpcc-assets-title-text',
    assetItem: 'wpcc-assets-item wpcc-card wpcc-row',
    assetItemCol: 'wpcc-assets-item-col',
    assetItemImage: 'wpcc-assets-item-image',
    assetItemTitle: 'wpcc-assets-item-title',
    assetItemDescription: 'wpcc-assets-item-description',
    assetItemQuantity: 'wpcc-assets-item-quantity',
    // Asset modal classes.
    assetModal: 'wpcc-asset-modal wpcc-card',
    assetModalHeader: 'wpcc-asset-modal-header',
    assetModalTitle: 'wpcc-asset-modal-title',
    assetModalClose: 'wpcc-asset-modal-close',
    assetModalBody: 'wpcc-asset-modal-body',
    assetModalCol: 'wpcc-asset-modal-col',
    assetModalImage: 'wpcc-asset-modal-image',
    assetModalData: 'wpcc-asset-modal-data',
    assetModalTitleRow: 'wpcc-asset-modal-data-row wpcc-asset-modal-data-title',
    assetModalDataRow: 'wpcc-asset-modal-data-row',
    assetModalCode: 'wpcc-asset-modal-code wpcc-card-dark',
    // Message component classes.
    messages: 'wpcc-messages',
    message: 'wpcc-message wpcc-card',
    messageRemove: 'wpcc-message-remove',
    messageError: 'wpcc-message-error',
    messageSuccess: 'wpcc-message-success',
    messageWarning: 'wpcc-message-warning',
    messageNotice: 'wpcc-message-notice',
}