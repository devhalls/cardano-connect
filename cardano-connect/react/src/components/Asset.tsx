import React, {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {classMap, formatNumber, trimText} from "../library/utils";
import {Copy} from "./Copy";
import {Loader} from "./Loader";

export const Asset = ({
    asset,
    showTitle,
    showModal,
    setShowModal,
}: ComponentAsset) => {

    // APP State

    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const [loadingImage, setLoadingImage] = useState<boolean>(true)
    const [images, setImages] = useState<any[] | null>(null)
    const ignoreKeys = ['unit']
    const copyKeys = ['policyId', 'fingerprint']

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

    const printTitleRow = (title: string) => {
        return (
            <li className={classMap.assetModalTitleRow}>{title}</li>
        )
    }

    const printDataRow = (title: string, data: string, copy?: boolean) => {
        return (
            <li className={classMap.assetModalDataRow}>
                <span>{title}</span>{' '}
                {copy ? (
                    <span><Copy text={data}/></span>
                ) : (
                    <span>{data}</span>
                )}
            </li>
        )
    }

    const printObjectKeys = (object: any, showTitles: boolean = true) => {
        return Object.keys(object).filter(k => !ignoreKeys.includes(k)).map(k => {
            if (!object[k]) {
                return null
            }
            switch (typeof object[k]) {
                case 'string':
                    return printDataRow(k, object[k], copyKeys.includes(k))
                case 'object':
                    return (
                        <>
                            {showTitles ? printTitleRow(k) : null}
                            {printObjectKeys(object[k], false)}
                        </>
                    )
                default:
                    return null
            }
        })
    }

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
                <div className={`${classMap.assetTitle} ${classMap.assetTitle}-${asset.policy_id}`}>
                    <div className={classMap.assetTitleText}>{options.label_assets_policy_label}</div>
                    <Copy text={asset.policy_id} />
                </div>
            )}
            <div onClick={() => {
                console.log(asset)
                setShowModal(asset)
            }} className={`${classMap.assetItem} ${classMap.assetItem}-${asset.fingerprint}`}>
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
            {showModal && (
                <div className={classMap.assetModal}>
                    <div className={classMap.assetModalHeader}>
                        <h2 className={classMap.assetModalTitle}>{asset.metadata?.name || asset.onchain_metadata.name}</h2>
                        <button className={classMap.assetModalClose} onClick={() => setShowModal(null)}>
                            Close
                        </button>
                    </div>
                    <div className={classMap.assetModalBody}>
                        <div className={classMap.assetModalCol}>
                            <div className={classMap.assetModalImage}>
                                {loadingImage
                                    ? <Loader />
                                    : <img
                                        src={images[0].src}
                                        alt={images[0].title}
                                    />}
                            </div>
                            {parseInt(asset.quantity) > 0 ? (
                                <ul className={classMap.assetModalData}>
                                    {printDataRow('Total Supply', formatNumber(parseInt(asset.quantity)), true)}
                                    {printDataRow('Owned', formatNumber(parseInt(asset.walletAsset.quantity)), true)}
                                </ul>
                            ) : null}
                        </div>
                        <div className={classMap.assetModalCol}>
                            <ul className={classMap.assetModalData}>
                                {asset.metadata && (
                                    <>
                                        {printDataRow('Ticker', asset.metadata.ticker, true)}
                                        {printDataRow('Description', asset.metadata.description, true)}
                                        {printDataRow('Website', asset.metadata.url, true)}
                                    </>
                                )}
                                {printDataRow('Asset Name', asset.asset_name, true)}
                                {printDataRow('Fingerprint', asset.fingerprint, true)}
                                {printDataRow('Policy ID', asset.policy_id, true)}
                            </ul>
                            <h3>Metadata</h3>
                            <ul className={classMap.assetModalData}>
                                {printObjectKeys(asset.onchain_metadata)}
                            </ul>
                            <h3>Raw JSON</h3>
                            <pre className={classMap.assetModalCode}>
                                <code>{JSON.stringify(asset.onchain_metadata, null, 4)}</code>
                            </pre>
                            <Copy
                                text={<button>Copy Raw JSON</button>}
                                copyText={JSON.stringify(asset.onchain_metadata, null, 4)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
