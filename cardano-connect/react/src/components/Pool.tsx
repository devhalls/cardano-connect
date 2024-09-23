import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    classMap,
    formatBalance,
    formatPercentageFromDecimal,
    formatPercentageFromBig,
    trimAddress
} from "../library/utils";
import {Copy} from "./common/Copy";
import {backendGetPool} from "../library";
import {useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {Loader} from "./common/Loader";
import {Bar} from "./common/Bar";
import {Stats} from "./common/Stats";
import {LinkIcon} from "./common/LinkIcon";
import {getUserState} from "../library/user";

export const Pool = ({
    poolId,
    index,
    delegateStake,
}: ComponentPool) => {

    // APP State

    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const [loading, setLoading] = useState(true)
    const [loadingAction, setLoadingAction] = useState(false)
    const [poolData, setPoolData] = useState<PoolData | null>(null)

    // Handlers

    const handleDelegate = async () => {
        setLoadingAction(true)
        await delegateStake(poolId)
        setLoadingAction(false)
    }

    // Helpers

    const getPool = useCallback(async () => {
        setLoading(true)
        const data = await backendGetPool({
            nonce: wpCardanoConnect?.nonce,
            poolId
        })
        if (data.success) {
            setPoolData(data.data)
        }
        setLoading(false)
    }, [poolId])

    const poolPledgePercent = useMemo<number>(() =>
        formatPercentageFromBig(poolData?.live_pledge, poolData?.declared_pledge), [poolData])
    const poolSaturationPercent = useMemo<number>(() =>
        formatPercentageFromDecimal(poolData?.live_saturation), [poolData])
    const userDelegated = useMemo(() =>
        (user?.account?.active && user?.account?.pool_id === poolId), [user])
    const isSaturated = useMemo(() =>
        ((poolData?.live_saturation ? poolData?.live_saturation * 100 : 0) > 100), [poolData])
    const isNoPledged = useMemo(() =>
        (poolPledgePercent ? poolPledgePercent < 100 : true), [poolData, poolPledgePercent])

    // Get pool data on load

    useEffect(() => {
        getPool().then()
    }, [getPool])

    return (
        <div key={poolId + '-' + index} className={`${classMap.pool} pool-${poolId}`}>
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
                                <Copy text={poolData.metadata.name} className={classMap.poolName}/>
                            </div>
                        ) : null}
                        <div className={classMap.poolHeaderRight}>
                            <div className={classMap.poolSocial}>
                                {poolData.metadata?.homepage
                                    ? <LinkIcon
                                        title={poolData.metadata?.name || poolId}
                                        icon={'link'}
                                        url={poolData.metadata?.homepage}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.twitter_handle
                                    ? <LinkIcon
                                        title={'Twitter'}
                                        icon={'twitter'}
                                        url={'https://x.com/' + poolData.metadata_extended?.info?.social?.twitter_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.github_handle
                                    ? <LinkIcon
                                        title={'Github'}
                                        icon={'github'}
                                        url={'https://github.com/' + poolData.metadata_extended?.info?.social?.github_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.linkedin_handle
                                    ? <LinkIcon
                                        title={'Linkedin'}
                                        icon={'linkedin'}
                                        url={'https://linkedin.com/' + poolData.metadata_extended?.info?.social?.linkedin_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.facebook_handle
                                    ? <LinkIcon
                                        title={'Facebook'}
                                        icon={'facebook'}
                                        url={'https://facebook.com/' + poolData.metadata_extended?.info?.social?.facebook_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.youtube_handle
                                    ? <LinkIcon
                                        title={'Youtube'}
                                        icon={'youtube'}
                                        url={'https://youtube.com/' + poolData.metadata_extended?.info?.social?.youtube_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.telegram_handle
                                    ? <LinkIcon
                                        title={'Telegram'}
                                        icon={'telegram'}
                                        url={'https://t.me/' + poolData.metadata_extended?.info?.social?.telegram_handle}
                                    />
                                    : null}
                                {poolData.metadata_extended?.info?.social?.discord_handle
                                    ? <LinkIcon
                                        title={'Discord'}
                                        icon={'discord'}
                                        url={'https://discord.com/' + poolData.metadata_extended?.info?.social?.discord_handle}
                                    />
                                    : null}
                            </div>
                            <Copy text={trimAddress(poolId)} copyText={poolId} className={classMap.poolId}/>
                        </div>
                    </div>
                    <div className={classMap.poolBody}>
                        <Stats
                            title={options.label_pool_fees}
                            stats={[
                                {
                                    content: `${(poolData.margin_cost * 100).toFixed(2)}%`,
                                    color: '#D7D7D7'
                                },
                                {
                                    content: `₳${formatBalance(poolData.fixed_cost, 0)}`,
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
                    {user?.connected ? <div className={classMap.actions}>
                        {loadingAction ? <Loader className={'wpcc-loader'}/> : (
                            <>
                                {delegateStake && !userDelegated ?
                                    <button className={classMap.actionsButton} onClick={handleDelegate}
                                            type={'button'}>{options.label_delegate_to_pool}</button> : null}
                                {userDelegated ? <span
                                    className={classMap.actionsButtonPlaceholder}>{options.label_delegated_to_pool}</span> : null}
                            </>
                        )}
                    </div> : null}
                    <div className={classMap.poolDetail}>
                        {poolData.synced_at ? `Last synced (${new Date(poolData.synced_at * 1000)})` : ''}
                    </div>
                </div>
            }
        </div>
    )
}
