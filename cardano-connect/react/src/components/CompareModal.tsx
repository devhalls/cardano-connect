import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../library/state";
import {
    classMap,
    formatNumberFromBig,
    formatNumberShort, formatPercentageFromBig,
    translateError
} from "../library/utils";
import {getUxComparePools, getUxCompareModal, setCompareModal, getUxCompareDreps} from "../library/ux";
import {getOptionState} from "../library/option";
import {Pools} from "./Pools";
import {Dreps} from "./Dreps";
import {backendGetPoolsStats} from "../library";
import {setMessage} from "../library/message";
import {Loader} from "./common/Loader";
import {ScatterPlot} from "./graph/ScatterPlot";
import {PoolGraph} from "./PoolGraph";

export const CompareModal = () => {

    // APP State

    const dispatch = useAppDispatch()
    const compareModal: UxState['compareModal'] = useAppSelector(getUxCompareModal)
    const comparePools: UxState['comparePools'] = useAppSelector(getUxComparePools)
    const compareDreps: UxState['compareDreps'] = useAppSelector(getUxCompareDreps)
    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const [loading, setLoading] = useState(true)
    const [views, setViews] = useState<any[]|null>(null)
    const [selectedView, setSelectedView] = useState(null)
    const [allPoolStats, setAllPoolStats] = useState<PoolGraph[]|null>(null)
    const getPoolStats = useCallback(async () => {
        setLoading(true)
        const data = await backendGetPoolsStats({
            nonce: wpCardanoConnect?.nonce,
        })
        if (data.success) {
            setAllPoolStats(data.data.items)
        } else {
            dispatch(setMessage({
                message: translateError(data.message),
                type: 'error'
            }))
        }
        setLoading(false)
    }, [])

    // Action handlers

    const handleClose = () => {
        dispatch(setCompareModal(null))
        setViews(null)
        setSelectedView(null)
        setAllPoolStats(null)
    }

    const handleChangeView = useCallback((e) => {
        setLoading(true)
        setSelectedView(views.find(v => v.key === e.target.value))
        setLoading(false)
    }, [views])

    // Load view data after fetching data

    useEffect(() => {
        if (loading || !allPoolStats || !comparePools) {
            return
        }
        const viewConfig: {
            key: string
            type: string
            title: string
            graph?: GraphScatterComponent<GraphPlot<PoolGraph>, GraphPlot<PoolGraph>>
        }[] = [
            {
                key: 'block',
                type: 'block',
                title: 'Stake pools',
            },
            {
                key: 'scatter',
                type: 'scatter',
                title: 'Stake to pledge ratio',
                description: 'Pool live stake, live pledge comparison. ',
                graph: {
                    width: Math.max(window.innerWidth, 480),
                    height: Math.max(window.innerHeight - 200, 800),
                    color: '#D2D7D3',
                    data: allPoolStats.map(p => {
                        const factor = 2
                        const minSize = 5
                        const maxSize = 50
                        const percentage = formatPercentageFromBig(p.live_pledge, p.live_stake) / factor
                        const getColor = () => percentage > maxSize / factor
                                ? 'rgb(217,130,4)'
                                : percentage > maxSize / factor / 2
                                    ? 'rgb(222,143,27)'
                                    : 'rgb(236,179,87)'
                        return {
                            x: formatNumberFromBig(p.live_stake),
                            y: formatNumberFromBig(p.live_pledge),
                            id: p.pool_id,
                            radius: Math.max(Math.min(percentage, maxSize), minSize),
                            fill: getColor(),
                            stroke: getColor(),
                            data: p
                        }
                    }),
                    axisX: {
                        tick: {
                            spacing: 40,
                            length: 10,
                            format: (a) => formatNumberShort(a, undefined, 2),
                        },
                        label: {
                            label: 'LIVE STAKE',
                            color: 'black',
                            position: {
                                x: '40px',
                                y: '60px'
                            }
                        }
                    },
                    axisY: {
                        tick: {
                            spacing: 40,
                            length: 6,
                            format: (a) => formatNumberShort(a, undefined, 2),
                        },
                        label: {
                            label: 'LIVE PLEDGE',
                            color: 'black',
                            position: {
                                x: '-40px',
                                y: '-60px'
                            }
                        }
                    },
                    ToolTip: PoolGraph
                }
            }
        ]
        setViews(viewConfig)
        if (!selectedView) {
            setSelectedView(viewConfig[1])
        }
    }, [loading, selectedView, comparePools, allPoolStats]);

    // Load data on mount.

    useEffect(() => {
        if (compareModal === 'pools') {
            getPoolStats().then()
        }
    }, [compareModal, getPoolStats]);

    return (
        <>
            <div className={classMap.compareButtonContainer}>
                {comparePools?.length ? <button
                    className={classMap.compareButton}
                    onClick={() => dispatch(setCompareModal('pools'))}>
                    {options.label_compare_view_pools} ({comparePools.length})
                </button> : null}
                {compareDreps?.length ? <button
                    className={classMap.compareButton}
                    onClick={() => dispatch(setCompareModal('dreps'))}>
                    {options.label_compare_view_dreps} ({compareDreps.length})
                </button> : null}
            </div>
            {loading ? <Loader /> : compareModal ? (
                <div className={classMap.modal}>
                    <div className={classMap.modalHeader}>
                        <h2 className={classMap.modalTitle}>
                            {compareModal === 'pools' ? options.label_compare_view_pools : options.label_compare_view_dreps}{' '}
                            ({comparePools?.length || compareDreps?.length})
                        </h2>
                        <select name="compare_view" id="compare_view" onChange={(e) => handleChangeView(e)}>
                            {views?.map(v => (
                                <option key={v.key} value={v.key}>{v.title}</option>
                            ))}
                        </select>
                        <button className={classMap.modalClose} onClick={() => handleClose()}>
                            x
                        </button>
                    </div>
                    <div className={classMap.compareModalBody}>

                        {selectedView?.key === 'block' ? (
                            <>
                                {compareModal === 'pools' ? <Pools
                                    perPage={0}
                                    pools={comparePools}
                                    notFound={options.label_compare_no_items}
                                /> : null}
                                {compareModal === 'dreps' ? <Dreps
                                    perPage={0}
                                    dreps={compareDreps}
                                    notFound={options.label_compare_no_items}
                                /> : null}
                            </>
                        ) : null}

                        {selectedView?.key === 'scatter' ? (
                            <ScatterPlot {...selectedView.graph}/>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    )
}

