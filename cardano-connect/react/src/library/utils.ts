export const trimAddress = (string: string, padded: number = 6) => {
    return string
        ? `${string.substring(0, padded)}...${string.substring(string.length-(padded), string.length)}`
        : ''
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

export const convertToApiAsset = (asset: Asset): ApiAsset => {
    return {
        asset: asset.unit,
        asset_name: asset.assetName,
        fingerprint: asset.fingerprint,
        initial_mint_tx_hash: null,
        metadata: null,
        mint_or_burn_count: 0,
        onchain_metadata: {
            image: null,
            name: asset.assetName,
            type: '',
            attributes: null
        },
        onchain_metadata_extra: null,
        onchain_metadata_standard: null,
        policy_id: asset.policyId,
        quantity: asset.quantity
    }
}