import React from "react";
import {useAppDispatch, useAppSelector} from "../library/state";
import {classMap, formatNumber} from "../library/utils";
import {Copy} from "./common/Copy";
import {getUxAssetModal, setAssetModal} from "../library/ux";
import {getOptionState} from "../library/option";

export const AssetModal = () => {

    // APP State

    const dispatch = useAppDispatch()
    const assetModal: UxState['assetModal'] = useAppSelector(getUxAssetModal)
    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const ignoreKeys: string[] = ['unit']
    const copyKeys: string[] = ['policyId', 'fingerprint']

    // Helpers

    const printTitleRow = (title: string) => {
        return (
            <li className={classMap.assetTitleRow}>{title}</li>
        )
    }

    const printDataRow = (title: string, data: string, copy?: boolean) => {
        return (
            <li className={classMap.assetDataRow}>
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
        <div className={classMap.modal}>
            <div className={classMap.modalHeader}>
                <h2 className={classMap.modalTitle}>{assetModal.asset.metadata?.name || assetModal.asset.onchain_metadata?.name}</h2>
                <button className={classMap.modalClose} onClick={() => dispatch(setAssetModal(null))}>
                    x
                </button>
            </div>
            <div className={classMap.assetBody}>
                <div className={classMap.assetBodyCol}>
                    <div className={classMap.assetImage}>
                        <img
                            src={assetModal.images?.length ? assetModal.images[0]?.src : options.assets_placeholder}
                            alt={assetModal.images?.length ? assetModal.images[0]?.title : null}
                        />
                    </div>
                    {parseInt(assetModal.asset.quantity) > 0 ? (
                        <ul className={classMap.assetData}>
                            {printDataRow('Owned', formatNumber(parseInt(assetModal.asset.walletAsset.quantity)), true)}
                            {printDataRow('Total Supply', formatNumber(parseInt(assetModal.asset.quantity)), true)}
                        </ul>
                    ) : null}
                </div>
                <div className={classMap.assetBodyCol}>
                    <ul className={classMap.assetData}>
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
                    <ul className={classMap.assetData}>
                        {printObjectKeys(assetModal.asset.onchain_metadata)}
                    </ul>
                    <h3>Raw JSON</h3>
                    <pre className={classMap.assetCode}>
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

