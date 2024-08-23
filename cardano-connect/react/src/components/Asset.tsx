import React, {useCallback} from "react";
import {useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import db from 'mime-db'

export const Asset = ({
    asset,
    index,
    filteredApiAssets,
    classMap = {
        assetTitle: 'asset-title',
        assetItem: 'assets-item',
        assetItemCol: 'assets-item-col',
        assetItemBlock: 'assets-item-block',
        assetItemImage: 'assets-item-image',
        assetItemText: 'assets-item-text',
        assetItemQuantity: 'assets-item-quantity',
        assetItemTitle: 'assets-item-title',
    }
}: ComponentAsset) => {
    const options: OptionState = useAppSelector(getOptionState)

    const formatImage = useCallback((uri: string, mimeType: string) => {
        if (!uri) {
            return options.assets_placeholder
        }
        let extension = uri;
        if (options.assets_ipfs_endpoint) {
            extension = extension
                .replace('ipfs://ipfs/', options.assets_ipfs_endpoint)
                .replace('ipfs://', options.assets_ipfs_endpoint);
            if (db[mimeType]) {
                extension = '.' + db[mimeType].extensions[0]
            }
        }
        return extension
    }, [options]);

    return (
        <>
            {(!filteredApiAssets[index - 1] || asset.policy_id !== filteredApiAssets[index - 1].policy_id) && (
                <div className={classMap.assetTitle}>Policy: {asset.policy_id}</div>
            )}
            <div className={classMap.assetItem}>
                <div className={classMap.assetItemCol}>
                    <div className={classMap.assetItemBlock}>
                        <img src={formatImage(asset.onchain_metadata.image, asset.onchain_metadata.type)}
                             alt={asset.onchain_metadata.image}
                             className={classMap.assetItemImage}/>
                    </div>
                </div>
                <div className={classMap.assetItemCol}>
                    <div className={classMap.assetItemBlock}>
                        <span className={classMap.assetItemTitle} title={asset.onchain_metadata.name}>
                            {asset.onchain_metadata.name}
                        </span>
                        <span className={classMap.assetItemQuantity}>
                            Quantity: {asset.quantity}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
