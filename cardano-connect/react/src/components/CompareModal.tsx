import React from "react";
import {useAppDispatch, useAppSelector} from "../library/state";
import {classMap} from "../library/utils";
import {getUxComparePools, getUxCompareModal, setCompareModal, getUxCompareDreps} from "../library/ux";
import {getOptionState} from "../library/option";
import {Pools} from "./Pools";
import {Dreps} from "./Dreps";

export const CompareModal = () => {

    // APP State

    const dispatch = useAppDispatch()
    const compareModal: UxState['compareModal'] = useAppSelector(getUxCompareModal)
    const comparePools: UxState['comparePools'] = useAppSelector(getUxComparePools)
    const compareDreps: UxState['compareDreps'] = useAppSelector(getUxCompareDreps)
    const options: OptionState = useAppSelector(getOptionState)

    // Helpers

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
            {compareModal ? (
                <div className={classMap.modal}>
                    <div className={classMap.modalHeader}>
                        <h2 className={classMap.modalTitle}>
                            {compareModal === 'pools' ? options.label_compare_view_pools : options.label_compare_view_dreps}{' '}
                            ({comparePools?.length || compareDreps?.length})
                        </h2>
                        <button className={classMap.modalClose} onClick={() => dispatch(setCompareModal(null))}>
                            x
                        </button>
                    </div>
                    <div className={classMap.compareModalBody}>
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
                    </div>
                </div>
            ) : null}
        </>
    )
}

