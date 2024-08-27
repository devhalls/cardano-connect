import React, {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {classMap, trimText} from "../library/utils";
import {Copy} from "./Copy";
import {Loader} from "./Loader";

export const Asset = ({
    asset,
    showTitle,
}: ComponentAsset) => {

    // APP State

    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const [loadingImage, setLoadingImage] = useState<boolean>(true)
    const [images, setImages] = useState<any[] | null>(null)

    // Helpers

    const formatDataURL = (url: string, callback: (p: ArrayBuffer | string | null) => void) => {
        const xhr = new XMLHttpRequest()
        const reader = new FileReader()
        xhr.onload = () => {
            reader.onloadend = () => callback(reader.result)
            reader.readAsDataURL(xhr.response)
        }
        xhr.onerror = () => callback(null)
        xhr.ontimeout = () => callback(null)
        xhr.onabort = () => callback(null)
        xhr.timeout = 30000
        xhr.responseType = 'blob'
        xhr.open('GET', url)
        xhr.send()
    }

    const loadImage = useCallback((uri: string, title: string) => {
        const placeholder = {
            src: options.assets_placeholder,
            title: title
        }
        if (!options.assets_ipfs_endpoint || !uri) {
            setImages([placeholder])
            setLoadingImage(false)
            return
        }
        let extension: string = uri
            .replace('ipfs://ipfs/', options.assets_ipfs_endpoint)
            .replace('ipfs://', options.assets_ipfs_endpoint);

        formatDataURL(extension, (r) => {
            if (r) {
                setImages([{
                    src: r.toString(),
                    title: title
                }])
            } else {
                setImages([placeholder])
            }
            setLoadingImage(false)
        })
    }, []);

    // Load image data

    useEffect(() => {
        loadImage(
            asset.onchain_metadata.image,
            asset.onchain_metadata.title
        )
    }, []);

    return (
        <>
            {showTitle && (
                <div className={classMap.assetTitle}>
                    <div className={classMap.assetTitleText}>{options.label_assets_policy_label}</div>
                    <Copy text={asset.policy_id} />
                </div>
            )}
            <div className={classMap.assetItem}>
                <div className={classMap.assetItemCol}>
                    <div className={classMap.assetItemImage}>
                        {loadingImage ? <Loader /> : <img src={images[0].src} alt={images[0].title}/>}
                    </div>
                </div>
                <div className={classMap.assetItemCol}>
                    <span className={classMap.assetItemTitle} title={asset.onchain_metadata.name}>
                        {asset.onchain_metadata?.name || asset.metadata?.name}
                    </span>
                    <span className={classMap.assetItemDescription}>
                        {trimText(asset.onchain_metadata?.description || asset.metadata?.description, 44, true)}
                    </span>
                    <span className={classMap.assetItemQuantity}>
                        {options.label_assets_quantity_label} {asset.walletAsset.quantity}
                    </span>
                </div>
            </div>
        </>
    )
}
