import React from "react";
import {classMap, filterPaginatedRange} from "../library/utils";
import {backendGetDreps} from "../library";
import {Paginator} from "./common/Paginator";
import {Drep as DrepComponent} from "./Drep";
import {useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";

export const Dreps = ({
    whitelistString = null,
    perPage = 10, // Set to 0 to disable pagination
    notFound,
    dreps
}: ComponentDreps) => {

    // APP State

    const options: OptionState = useAppSelector(getOptionState)

    const getDreps = async (page: number, perPage: number, filters?: Filter[]|null) => {
        if (whitelistString) {
            const drepIds = whitelistString?.length ? whitelistString.split('\n').map(a => a.trim()) : []
            const formatted: Drep[] = drepIds.map(p => {
                return {drep_id: p}
            })
            return {
                total: formatted.length,
                items: filterPaginatedRange(formatted, page, perPage)
            }
        }
        const data = await backendGetDreps({
            nonce: wpCardanoConnect?.nonce,
            page,
            perPage,
            filters
        })
        return data.data
    }

    return dreps ? (
        <>
            {dreps.length > 0 ? dreps.map(((d, i) => (
                <DrepComponent
                    key={d.drep_id}
                    drepId={d.drep_id}
                    index={i}
                />
            ))) : (
                <div className={classMap.notFound}>{notFound || options.label_no_pools}</div>
            )}
        </>
    ) : (
        <Paginator
            className={classMap.dreps}
            perPage={perPage}
            fetcher={getDreps}
            notFound={notFound || options.label_no_pools}
            renderer={(d: Drep, i: number) =>
                <DrepComponent
                    key={d.drep_id}
                    drepId={d.drep_id}
                    index={i}
                />
            }
        />
    )
}
