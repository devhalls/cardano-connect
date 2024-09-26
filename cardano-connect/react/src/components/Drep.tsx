import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    classMap, formatBalance,
    trimAddress
} from "../library/utils";
import {Tooltip} from 'react-tooltip'
import {Copy} from "./common/Copy";
import {backendGetDrep} from "../library";
import {useAppDispatch, useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";
import {Loader} from "./common/Loader";
import {LinkIcon} from "./common/LinkIcon";
import {getUserState} from "../library/user";
import {getUxCompareDreps, setCompareDreps} from "../library/ux";

export const Drep = ({
    drepId,
    index,
    delegateStake,
}: ComponentDrep) => {

    // APP State

    const dispatch = useAppDispatch()
    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)
    const comparisons: UxState['compareDreps'] = useAppSelector(getUxCompareDreps)

    // Local state

    const [loading, setLoading] = useState(true)
    const [loadingAction, setLoadingAction] = useState(false)
    const [drepData, setDrepData] = useState<DrepData | null>(null)
    const isComparing = useMemo(() => comparisons?.find(a => a && 'drep_id' in a && a.drep_id === drepId), [comparisons, comparisons])

    // Handlers

    const handleDelegate = async () => {
        setLoadingAction(true)
        await delegateStake(drepId)
        setLoadingAction(false)
    }

    const handleSetCompare = useCallback(() => {
        const copiedItems = comparisons ? [...comparisons] : [];
        if (isComparing) {
            dispatch(setCompareDreps(copiedItems.filter(a => a && 'drep_id' in a && a.drep_id !== drepId)))
        } else {
            dispatch(setCompareDreps([...copiedItems, drepData]))

        }
    }, [comparisons, isComparing, drepData])

    // Helpers

    const getDrep = useCallback(async () => {
        if (drepId === 'drep_always_abstain') {
            setLoading(false)
            return
        }
        setLoading(true)
        const data = await backendGetDrep({
            nonce: wpCardanoConnect?.nonce,
            drepId
        })
        if (data.success) {
            setDrepData(data.data)
        }
        setLoading(false)
    }, [drepId])

    const userDelegated = useMemo(() =>
        (user?.account?.active && user?.account?.drep_id === drepId), [user])

    // Get drep data on load

    useEffect(() => {
        getDrep().then()
    }, [getDrep])

    return (
        <div key={drepId + '-' + index} className={`${classMap.drep} drep-${drepId} ${isComparing ? 'wpcc-drep-comparing' : null}`}>
            {loading ? <Loader/> : !drepData ?
                <div className={classMap.notFound}>
                    {options.label_no_pool}<br/><Copy text={drepId} />
                </div> :
                <div className={classMap.drepContent}>
                    <div className={classMap.drepHeader}>
                        <div className={classMap.drepImage}>
                            <img
                                src={options.assets_placeholder}
                                alt={drepId}
                            />
                        </div>
                        <div className={classMap.drepHeaderRight}>
                            <div className={classMap.drepSocial}>
                                {drepData?.metadata?.url
                                    ? <LinkIcon
                                        toolTipId={`drep-tooltip-${drepId}`}
                                        toolTip={'JSON Metadata'}
                                        title={'JSON Metadata'}
                                        icon={'json'}
                                        url={drepData.metadata?.url}
                                    />
                                    : null}
                            </div>
                            <Copy text={trimAddress(drepId)} copyText={drepId} className={classMap.drepId}/>
                        </div>
                    </div>
                    <div>
                        <div className={classMap.actions}>
                            <div className={classMap.actionsButtonPlaceholder}>
                                {drepData ? (
                                    <>Delegation <strong> ₳ {formatBalance(drepData.amount)}</strong></>
                                ) : 'DRep always abstain'}
                            </div>
                            {loadingAction ? <Loader className={'wpcc-loader'}/> : (
                                <>
                                    {user?.connected && delegateStake && !userDelegated ?
                                        <button className={classMap.actionsButton} onClick={handleDelegate}
                                                type={'button'}>{options.label_delegate_to_pool}</button> : null}
                                    {user?.connected && userDelegated ? <span
                                        className={classMap.actionsButtonPlaceholder}>{options.label_delegated_to_pool}</span> : null}
                                    <button
                                        data-tooltip-id={`drep-tooltip-${drepId}`}
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
                </div>
            }
            <Tooltip id={`drep-tooltip-${drepId}`}/>
        </div>
    )
}
