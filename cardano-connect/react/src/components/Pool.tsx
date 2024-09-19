import React, {useCallback, useEffect, useState} from "react";
import {classMap, formatBalance, formatPercentage, trimAddress} from "../library/utils";
import {Copy} from "./common/Copy";
import {backendGetPool} from "../library";
import {useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {Loader} from "./common/Loader";
import {Bar} from "./common/Bar";
import {Stats} from "./common/Stats";
import {LinkIcon} from "./common/LinkIcon";

export const Pool = ({poolId, index}: ComponentPool) => {

    // APP State

    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const [loading, setLoading] = useState(true)
    const [poolData, setPoolData] = useState<PoolData | null>(null)

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

    // Set data on load

    useEffect(() => {
        getPool().then()
    }, [getPool]);

    return (
        <div key={poolId + '-' + index} className={classMap.pool}>
            {loading ? <Loader/> : !poolData ?
                <div className={classMap.notFound}>
                    {options.label_no_assets}
                </div> :
                <div className={classMap.poolContent}>
                    <div className={classMap.poolHeader}>
                        <div className={classMap.poolImage}>
                            <img
                                src={poolData.metadata_file_extended?.info?.url_png_icon_64x64 || poolData.metadata_file_extended?.info?.url_png_logo || options.assets_placeholder}
                                alt={poolId}
                            />
                        </div>
                        {poolData.metadata.ticker ? (
                            <div>
                                <Copy text={poolData.metadata.ticker} className={classMap.poolTicker}/>
                                <Copy text={poolData.metadata.name} className={classMap.poolName}/>
                            </div>
                        ) : null}
                        <div className={classMap.poolHeaderRight}>
                            <div className={classMap.poolSocial}>
                                {poolData.metadata_file_extended?.info?.social?.twitter_handle
                                    ? <LinkIcon
                                        title={'Twitter'}
                                        icon={'twitter'}
                                        url={'https://x.com/' + poolData.metadata_file_extended?.info?.social?.twitter_handle}
                                    />
                                    : null}
                                {poolData.metadata_file_extended?.info?.social?.github_handle
                                    ? <LinkIcon
                                        title={'Github'}
                                        icon={'github'}
                                        url={'https://github.com/' + poolData.metadata_file_extended?.info?.social?.github_handle}
                                    />
                                    : null}
                                {poolData.metadata_file_extended?.info?.social?.facebook_handle
                                    ? <LinkIcon
                                        title={'Facebook'}
                                        icon={'facebook'}
                                        url={'https://facebook.com/' + poolData.metadata_file_extended?.info?.social?.facebook_handle}
                                    />
                                    : null}
                                {poolData.metadata_file_extended?.info?.social?.youtube_handle
                                    ? <LinkIcon
                                        title={'Youtube'}
                                        icon={'youtube'}
                                        url={'https://youtube.com/' + poolData.metadata_file_extended?.info?.social?.youtube_handle}
                                    />
                                    : null}
                                {poolData.metadata_file_extended?.info?.social?.telegram_handle
                                    ? <LinkIcon
                                        title={'Telegram'}
                                        icon={'telegram'}
                                        url={'https://t.me/' + poolData.metadata_file_extended?.info?.social?.telegram_handle}
                                    />
                                    : null}
                                {poolData.metadata_file_extended?.info?.social?.discord_handle
                                    ? <LinkIcon
                                        title={'Discord'}
                                        icon={'discord'}
                                        url={'https://discord.com/' + poolData.metadata_file_extended?.info?.social?.discord_handle}
                                    />
                                    : null}
                            </div>
                            <Copy text={trimAddress(poolId)} copyText={poolId} className={classMap.poolId}/>
                        </div>
                    </div>
                    <Stats
                        title={'Pool fees'}
                        stats={[
                            {
                                content: `${(poolData.data.margin_cost * 100).toFixed(2)}%`,
                                color: '#D7D7D7'
                            },
                            {
                                content: `₳${formatBalance(poolData.data.fixed_cost)}`,
                                color: '#D7D7D7'
                            }
                        ]}
                    />
                    <Bar
                        title={'Stake (Saturation)'}
                        content={`₳ ${formatBalance(poolData.data.live_stake)} (${formatPercentage(poolData.data.live_saturation)}%)`}
                        percentage={poolData.data.live_saturation * 100}
                        colorMap={{
                            0: '#4BB543',
                            85: '#FFCC00',
                            95: '#FF3333'
                        }}
                    />
                    <Bar
                        title={`Pledge (Pledge ${poolData.data.live_pledge < poolData.data.declared_pledge ? 'NOT met' : 'met'})`}
                        content={`₳ ${formatBalance(poolData.data.live_pledge)} (${formatPercentage(parseInt(poolData.data.live_pledge) / parseInt(poolData.data.declared_pledge))}%)`}
                        percentage={((parseInt(poolData.data.live_pledge) / parseInt(poolData.data.declared_pledge)) * 100)}
                        defaultColor={'red'}
                        colorMap={{
                            0: '#FF3333',
                            100: '#4BB543',
                        }}
                    />
                </div>
            }
        </div>
    )
}
