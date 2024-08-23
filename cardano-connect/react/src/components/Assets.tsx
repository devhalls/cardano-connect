import React, {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../library/state";
import {getUserAssets, getUserState} from "../library/user";
import {getOptionState} from "../library/option";
import {Asset as AssetComponent} from "./Asset";
import {backendGetAsset} from "../library";
import {convertToApiAsset} from "../library/utils";

export const Assets = ({
    perPage = 10, // if set to 0 pagination will be disabled
    whitelistString = null,
    loader = 'Loading...',
    classMap = {
        container: 'assets-container',
        errorContainer: 'assets-error',
        loader: 'wpcc-loader',
        assetContainer: 'assets-items',
        assetPagination: 'assets-pagination',
        assetNotFound: 'assets-not-found',
    }
}: ComponentAssets) => {
    const user: UserState = useAppSelector(getUserState)
    const assets: Asset[] = useAppSelector(getUserAssets)
    const options: OptionState = useAppSelector(getOptionState)

    // Connector state

    const [errorText, setErrorText] = useState<string|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [apiAssets, setApiAssets] = useState<ApiAsset[] | null>(null)
    const [filteredApiAssets, setFilteredApiAssets] = useState<ApiAsset[] | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(perPage > 0 ? perPage : 10000)

    // Helpers

    const filterAssets = useCallback((page: number, limit: number) => {
        setLoading(true)
        setCurrentPage(page)
        const start = (page - 1) * limit
        const end = page * limit
        setFilteredApiAssets(apiAssets.filter((a, i) => {
            return i >= start && i < end
        }))
        setTimeout(() => setLoading(false), 300)
    }, [apiAssets])

    // Click Handlers

    function onClickError() {
        setErrorText(null)
    }

    // Set data on load

    useEffect(() => {
        const loadAssetsData = async () => {
            const list: ApiAsset[] = []
            const acceptedLocal = whitelistString?.length ? whitelistString.split('\n').map(a => a.trim()) : []
            const acceptedGlobal = options.assets_whitelist?.length ? options.assets_whitelist.split(' ').map(a => a.trim()) : []
            const accepted = [...acceptedLocal, ...acceptedGlobal];
            let errorGenerated: string | null = null
            for (let i = 0; i < assets.length; i++) {
                const a = assets[i]
                const is_accepted = accepted.length ? accepted : [a.policyId]
                if (is_accepted.includes(a.policyId)) {
                    try {
                        const data = await backendGetAsset({
                            nonce: wpCardanoConnect.nonce,
                            asset: a.unit
                        })
                        if (data.data) {
                            list.push(data.data)
                        }
                    } catch (e) {
                        list.push(convertToApiAsset(a))
                        errorGenerated = e?.message ? e?.message : JSON.parse(e).data.message
                    }
                }
            }
            setApiAssets(list)
            if (errorGenerated) {
                console.warn(errorGenerated)
            }
        }
        if (assets && assets.length) {
            loadAssetsData().then(() => setLoading(false))
        }
    }, [assets]);

    // Set filtered data after wallets data has ben loaded

    useEffect(() => {
        if (apiAssets) {
            filterAssets(1, itemsPerPage)
        }
    }, [apiAssets]);

    return user.connected ? (
        <div className={classMap.container}>
            {loading ? (
                <span className={classMap.loader}>
                    {loader}
                </span>
            ) : (
                <div className={classMap.assetContainer}>
                    {errorText && <div className={classMap.errorContainer} onClick={onClickError}>{errorText}</div>}
                    {perPage > 0 && (
                        <div className={classMap.assetPagination}>
                            <span>{currentPage} / {apiAssets.length > itemsPerPage ? Math.ceil(apiAssets.length / itemsPerPage) : 1}</span>
                            <button disabled={currentPage <= 1} onClick={() => filterAssets(currentPage - 1, itemsPerPage)}>
                                Prev
                            </button>
                            <button disabled={currentPage >= Math.ceil(apiAssets.length / itemsPerPage)}
                                    onClick={() => filterAssets(currentPage + 1, itemsPerPage)}>
                                Next
                            </button>
                        </div>
                    )}
                    {filteredApiAssets?.length ? filteredApiAssets?.map((a, i) => (
                        <AssetComponent key={i + a.fingerprint} asset={a} index={i} filteredApiAssets={filteredApiAssets} />
                    )) : (
                        <div className={classMap.assetNotFound}>
                            {options.label_no_assets}
                        </div>
                    )}
                </div>
            )}
        </div>
    ) : null
}
