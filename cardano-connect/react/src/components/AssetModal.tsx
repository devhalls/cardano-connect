import React from "react";
import {useAppDispatch, useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {classMap, formatNumber} from "../library/utils";
import {Copy} from "./Copy";
import {getUxAssetModal, setAssetModal} from "../library/ux";

export const AssetModal = () => {

    // APP State

    const dispatch = useAppDispatch()
    const options: OptionState = useAppSelector(getOptionState)
    const assetModal: UxState['assetModal'] = useAppSelector(getUxAssetModal)

    // Local state

    const ignoreKeys: string[] = ['unit']
    const copyKeys: string[] = ['policyId', 'fingerprint']

    // Helpers

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

    return assetModal && (
        <div className={classMap.assetModal}>
            <div className={classMap.assetModalHeader}>
                <h2 className={classMap.assetModalTitle}>{assetModal.asset.metadata?.name || assetModal.asset.onchain_metadata.name}</h2>
                <button className={classMap.assetModalClose} onClick={() => dispatch(setAssetModal(null))}>
                    Close
                </button>
            </div>
            <div className={classMap.assetModalBody}>
                <div className={classMap.assetModalCol}>
                    <div className={classMap.assetModalImage}>
                        <img
                            src={assetModal.images[0]?.src}
                            alt={assetModal.images[0]?.title}
                        />
                    </div>
                    {parseInt(assetModal.asset.quantity) > 0 ? (
                        <ul className={classMap.assetModalData}>
                            {printDataRow('Owned', formatNumber(parseInt(assetModal.asset.walletAsset.quantity)), true)}
                            {printDataRow('Total Supply', formatNumber(parseInt(assetModal.asset.quantity)), true)}
                        </ul>
                    ) : null}
                </div>
                <div className={classMap.assetModalCol}>
                    <ul className={classMap.assetModalData}>
                        {assetModal.asset.metadata && (
                            <>
                                {printDataRow('Ticker', assetModal.asset.metadata.ticker, true)}
                                {printDataRow('Description', assetModal.asset.metadata.description, true)}
                                {printDataRow('Website', assetModal.asset.metadata.url, true)}
                            </>
                        )}
                        {printDataRow('Asset Name', assetModal.asset.asset_name, true)}
                        {printDataRow('Fingerprint', assetModal.asset.fingerprint, true)}
                        {printDataRow('Policy ID', assetModal.asset.policy_id, true)}
                    </ul>
                    <h3>Metadata</h3>
                    <ul className={classMap.assetModalData}>
                        {printObjectKeys(assetModal.asset.onchain_metadata)}
                    </ul>
                    <h3>Raw JSON</h3>
                    <pre className={classMap.assetModalCode}>
                        <code>{JSON.stringify(assetModal.asset.onchain_metadata, null, 4)}</code>
                    </pre>
                    <Copy
                        text={<button>Copy Raw JSON</button>}
                        copyText={JSON.stringify(assetModal.asset.onchain_metadata, null, 4)}
                    />
                </div>
            </div>
        </div>
    )
}

