import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    classMap,
    formatBalance,
    formatPercentageFromDecimal,
    formatPercentageFromBig,
    trimAddress
} from "../library/utils";
import {Tooltip} from 'react-tooltip'
import {Copy} from "./common/Copy";
import {backendGetPool} from "../library";
import {useAppDispatch, useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {Loader} from "./common/Loader";
import {Bar} from "./common/Bar";
import {Stats} from "./common/Stats";
import {LinkIcon} from "./common/LinkIcon";
import {getUserState} from "../library/user";
import {getUxComparePools, setComparePools} from "../library/ux";

export const Pool = ({
    poolId,
    index,
    delegateStake,
    pool
}: ComponentPool) => {

    // APP State

    const dispatch = useAppDispatch()
    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)
    const comparisons: UxState['comparePools'] = useAppSelector(getUxComparePools)

    // Local state

    const [loading, setLoading] = useState(true)
    const [loadingAction, setLoadingAction] = useState(false)
    const [poolData, setPoolData] = useState<PoolData | null>(null)
    const [showDescription, setShowDescription] = useState(false)
    const isComparing = useMemo(() =>
        comparisons?.find(a => a && 'pool_id' in a && a.pool_id === poolId),
        [comparisons, poolId]
    )

    // Handlers

    const handleDelegate = async () => {
        setLoadingAction(true)
        await delegateStake(poolId)
        setLoadingAction(false)
    }

    const handleSetCompare = useCallback(() => {
        const copiedItems = comparisons ? [...comparisons] : [];
        if (isComparing) {
            dispatch(setComparePools(copiedItems.filter(a => a && 'pool_id' in a && a.pool_id !== poolId)))
        } else {
            dispatch(setComparePools([...copiedItems, poolData]))

        }
    }, [dispatch, comparisons, isComparing, poolData, poolId])

    // Helpers

    const getPool = useCallback(async () => {
        if (pool) {
            setPoolData(pool)
        } else {
            setLoading(true)
            const data = await backendGetPool({
                nonce: wpCardanoConnect?.nonce,
                poolId
            })
            if (data.success) {
                setPoolData(data.data)
            }
        }
        setLoading(false)
    }, [poolId, pool])

    const poolPledgePercent = useMemo<number>(() =>
        formatPercentageFromBig(poolData?.live_pledge, poolData?.declared_pledge), [poolData])
    const poolSaturationPercent = useMemo<number>(() =>
        formatPercentageFromDecimal(poolData?.live_saturation), [poolData])
    const userDelegated = useMemo(() =>
        (user?.account?.active && user?.account?.pool_id === poolId), [user, poolId])
    const isSaturated = useMemo(() =>
        ((poolData?.live_saturation ? poolData?.live_saturation * 100 : 0) > 100), [poolData])
    const isNoPledged = useMemo(() =>
        (poolPledgePercent ? poolPledgePercent < 100 : true), [poolPledgePercent])

    // Get pool data on load

    useEffect(() => {
        getPool().then()
    }, [getPool])

    return (
        <div key={poolId + '-' + index} className={`${classMap.pool} pool-${poolId} ${isComparing ? classMap.poolComparing : null}`}>
            {loading ? <Loader/> : !poolData ?
                <div className={classMap.notFound}>
                    {options.label_no_pool}<br/><Copy text={poolId} />
                </div> :
                <div className={classMap.poolContent}>
                    <div className={classMap.poolHeader}>
                        <div className={classMap.poolImage}>
                            <img
                                src={poolData.metadata_extended?.info?.url_png_icon_64x64 || poolData.metadata_extended?.info?.url_png_logo || options.assets_placeholder}
                                alt={poolId}
                            />
                        </div>
                        {poolData.metadata?.ticker ? (
                            <div>
                                <Copy text={poolData.metadata.ticker} className={classMap.poolTicker}/>
                                <div className={classMap.poolName}>
                                    <Copy text={poolData.metadata.name} />
                                    {poolData.metadata.description ? <span className={classMap.poolDescriptionIcon}
                                           onClick={() => setShowDescription(!showDescription)}></span>: null}
                                </div>
                            </div>
                        ) : null}
                        <div className={classMap.poolHeaderRight}>
                            <div className={classMap.poolSocial}>
                                {poolData.retirement?.length
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={poolData.retirement?.length === 1 ? options.label_pool_retiring : options.label_pool_retired}
                                        title={poolData.metadata?.name || poolId}
                                        icon={'retired'}
                                        url={poolData.metadata?.homepage}
                                    /> : null}
                                {poolData.metadata?.homepage
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={'Website'}
                                        title={poolData.metadata?.name || poolId}
                                        icon={'link'}
                                        url={poolData.metadata?.homepage}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.twitter_handle
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={'Twitter'}
                                        title={'Twitter'}
                                        icon={'twitter'}
                                        url={'https://x.com/' + poolData.metadata_extended?.info?.social?.twitter_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.github_handle
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={'Github'}
                                        title={'Github'}
                                        icon={'github'}
                                        url={'https://github.com/' + poolData.metadata_extended?.info?.social?.github_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.linkedin_handle
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={'Linkedin'}
                                        title={'Linkedin'}
                                        icon={'linkedin'}
                                        url={'https://linkedin.com/' + poolData.metadata_extended?.info?.social?.linkedin_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.facebook_handle
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={'Facebook'}
                                        title={'Facebook'}
                                        icon={'facebook'}
                                        url={'https://facebook.com/' + poolData.metadata_extended?.info?.social?.facebook_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.youtube_handle
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={'Youtube'}
                                        title={'Youtube'}
                                        icon={'youtube'}
                                        url={'https://youtube.com/' + poolData.metadata_extended?.info?.social?.youtube_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.telegram_handle
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={'Telegram'}
                                        title={'Telegram'}
                                        icon={'telegram'}
                                        url={'https://t.me/' + poolData.metadata_extended?.info?.social?.telegram_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.discord_handle
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={'Discord'}
                                        title={'Discord'}
                                        icon={'discord'}
                                        url={'https://discord.com/users/' + poolData.metadata_extended?.info?.social?.discord_handle}
                                    />
                                    : null}
                                {poolData.metadata?.url
                                    ? <LinkIcon
                                        toolTipId={`pool-tooltip-${poolId}`}
                                        toolTip={'JSON Metadata'}
                                        title={'JSON Metadata'}
                                        icon={'json'}
                                        url={poolData.metadata?.url}
                                    />
                                    : null}
                            </div>
                            <Copy text={trimAddress(poolId)} copyText={poolId} className={classMap.poolId}/>
                        </div>
                    </div>
                    {poolData.metadata?.description && showDescription ? (
                        <div className={classMap.poolDescription}>{poolData.metadata.description}</div>
                    ) : null}
                    <div className={classMap.poolBody}>
                        <Stats
                            title={options.label_pool_fees}
                            stats={[
                                {
                                    content: `${(poolData.margin_cost * 100).toFixed(2)}%`,
                                    color: '#D7D7D7'
                                },
                                {
                                    content: `₳ ${formatBalance(poolData.fixed_cost, 0)}`,
                                    color: '#D7D7D7'
                                }
                            ]}
                        />
                        <div className={classMap.poolBodyBars}>
                            <Bar
                                title={isSaturated ? options.label_pool_stake_saturated : options.label_pool_stake}
                                content={`₳ ${formatBalance(poolData.live_stake)} (${poolSaturationPercent}%)`}
                                percentage={poolSaturationPercent}
                                colorMap={{
                                    0: '#87e381',
                                    85: '#ffe15e',
                                    95: '#ff6c6c'
                                }}
                            />
                            <Bar
                                title={isNoPledged ? options.label_pool_pledge_not_met : options.label_pool_pledge_met}
                                content={`₳ ${formatBalance(poolData.live_pledge)} (${poolPledgePercent}%)`}
                                percentage={poolPledgePercent}
                                defaultColor={'#ff6c6c'}
                                colorMap={{
                                    0: '#ff6c6c',
                                    100: '#87e381',
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={classMap.actions}>
                            <div className={classMap.actionsButtonPlaceholder}>
                                {options.label_pool_lifetime_blocks} <strong>{poolData.blocks_minted}</strong>
                            </div>
                            <div className={classMap.actionsButtonPlaceholder}>
                                {options.label_pool_last_epoch_blocks} <strong>{poolData.blocks_epoch}</strong>
                            </div>
                            <div className={classMap.actionsButtonPlaceholder}>
                                {options.label_pool_delegators} <strong>{poolData.live_delegators}</strong>
                            </div>
                        </div>
                        <div className={classMap.actions}>
                            {loadingAction ? <Loader className={'wpcc-loader'}/> : (
                                <>
                                    {user?.connected && delegateStake && !userDelegated ?
                                        <button className={classMap.actionsButton} onClick={handleDelegate}
                                                type={'button'}>{options.label_delegate_to_pool}</button> : null}
                                    {user?.connected && userDelegated ? <span
                                        className={classMap.actionsButtonPlaceholder}>{options.label_delegated_to_pool}</span> : null}
                                    <button
                                        data-tooltip-id={`pool-tooltip-${poolId}`}
                                        data-tooltip-content={!isComparing ? options.label_compare_add : options.label_compare_remove}
                                        className={classMap.actionsButtonLight}
                                        onClick={() => handleSetCompare()}
                                        type={'button'}>
                                        {isComparing ? '-' : '+'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={classMap.poolDetail}>
                        {poolData.synced_at ? `${options.label_pool_synced} ${new Date(poolData.synced_at * 1000)}` : ''}
                    </div>
                </div>
            }
            <Tooltip id={`pool-tooltip-${poolId}`}/>
        </div>
    )
}
