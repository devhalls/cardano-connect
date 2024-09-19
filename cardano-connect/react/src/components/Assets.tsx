import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../library/state";
import {getUserApiAssets, getUserAssets, getUserState, setUserApiAssets} from "../library/user";
import {getOptionState} from "../library/option";
import {Asset as AssetComponent} from "./Asset";
import {classMap, convertToApiAsset} from "../library/utils";
import {Loader} from "./common/Loader";
import {backendGetAsset} from "../library";

export const Assets = ({
    perPage = 10, // if set to 0 pagination will be disabled
    hideTitles = null,
    notFound = null,
    whitelistString = null,
}: ComponentAssets) => {

    // APP State

    const dispatch = useAppDispatch()
    const user: UserState = useAppSelector(getUserState)
    const assets: Asset[] = useAppSelector(getUserAssets)
    const apiAssets: ApiAsset[] = useAppSelector(getUserApiAssets)
    const options: OptionState = useAppSelector(getOptionState)

    // Connector state

    const [loading, setLoading] = useState<boolean>(true)
    const [filteredAssets, setFilteredAssets] = useState<Asset[] | null>(null)
    const [pagedAssets, setPagedAssets] = useState<ApiAsset[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(perPage > 0 ? perPage : 10000)
    const [total, setTotal] = useState<number | null>(null)

    // Helpers

    const filterAssets = useCallback(() => {
        const list: Asset[] = []
        const acceptedLocal = whitelistString?.length ? whitelistString.split('\n').map(a => a.trim()) : []
        const acceptedGlobal = options.assets_whitelist?.length ? options.assets_whitelist.split(' ').map(a => a.trim()) : []
        const accepted = acceptedLocal.length || acceptedGlobal.length ? [...acceptedLocal, ...acceptedGlobal] : null;
        for (let i = 0; i < assets.length; i++) {
            const a = assets[i]
            if (!accepted || accepted.includes(a.policyId)) {
                list.push(a)
            }
        }
        if (accepted) {
            list.sort((a, b) => {
                return Object.keys(accepted).find(key => accepted[key] === a.policyId)
                > Object.keys(accepted).find(key => accepted[key] === b.policyId)
                    ? 1 : -1
            })
        }
        setFilteredAssets(list)
        setTotal(list.length)
        filterPage(1, itemsPerPage).then()
    }, [assets, options, whitelistString])

    const filterPage = useCallback(async (page: number, limit: number) => {
        if (!filteredAssets) {
            return
        }
        setLoading(true)
        const pageApiAssets: ApiAsset[] = []
        for (let i = 0; i < filteredAssets.length; i++) {
            if (i >= ((page - 1) * limit) && i < (page * limit)) {
                let formatted = apiAssets?.find(asset => asset.walletAsset.unit === filteredAssets[i].unit)
                if (!formatted) {
                    try {
                        const assetRes = await backendGetAsset({
                            asset: filteredAssets[i].unit,
                            nonce: wpCardanoConnect?.nonce
                        })
                        formatted = assetRes.success ? {
                            ...assetRes.data,
                            walletAsset: filteredAssets[i]
                        } : convertToApiAsset(filteredAssets[i])
                    } catch (error) {
                        formatted = convertToApiAsset(filteredAssets[i])
                    }
                }
                pageApiAssets.push(formatted)
            }
        }
        dispatch(setUserApiAssets(pageApiAssets))
        setPagedAssets(pageApiAssets)
        setCurrentPage(page)
        setLoading(false)
    }, [filteredAssets, apiAssets])

    // Set data on load

    useEffect(() => {
        if (user.connected && assets && assets.length) {
            filterAssets()
        } else {
            setLoading(false)
        }
    }, [user.connected, assets, filterAssets]);

    return user.connected ? (
        <div className={classMap.assetsContainer}>
            {perPage > 0 && (
                <div className={classMap.pagination}>
                    <span>{currentPage} / {filteredAssets?.length > itemsPerPage ? Math.ceil(filteredAssets?.length / itemsPerPage) : 1}</span>
                    <button disabled={loading || currentPage <= 1}
                            onClick={() => filterPage(currentPage - 1, itemsPerPage)}>
                        {options.label_paginate_prev}
                    </button>
                    <button disabled={loading || (filteredAssets && currentPage >= Math.ceil(filteredAssets.length / itemsPerPage))}
                            onClick={() => filterPage(currentPage + 1, itemsPerPage)}>
                        {options.label_paginate_next}
                    </button>
                    <span>{total} {options.label_paginate_items}</span>
                </div>
            )}
            {loading ? (
                <Loader />
            ) : (
                <>
                    {pagedAssets?.length ? pagedAssets?.map((a, i) => (
                        <AssetComponent
                            key={i + a.fingerprint}
                            asset={a}
                            showTitle={!hideTitles && (!pagedAssets[i - 1] || a.policy_id !== pagedAssets[i - 1].policy_id)}
                        />
                    )) : (
                        <div className={classMap.notFound}>
                            {notFound || options.label_no_assets}
                        </div>
                    )}
                </>
            )}
        </div>
    ) : null
}
