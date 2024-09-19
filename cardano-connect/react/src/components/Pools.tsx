import React from "react";
import {classMap, filterPaginatedRange} from "../library/utils";
import {backendGetPools} from "../library";
import {Paginator} from "./common/Paginator";
import {Pool as PoolComponent} from "./Pool";

export const Pools = ({
    whitelistString = null,
    perPage = 10, // Set to 0 to disable pagination
    notFound
}: ComponentPools) => {

    const getPools = async (page: number, perPage: number) => {
        if (whitelistString) {
            const poolIds = whitelistString?.length ? whitelistString.split('\n').map(a => a.trim()) : []
            const formatted: Pool[] = poolIds.map(p => {
                return {pool_id: p}
            })
            return {
                total: formatted.length,
                items: filterPaginatedRange(formatted, page, perPage)
            }
        }
        const data = await backendGetPools({
            nonce: wpCardanoConnect?.nonce,
            page,
            perPage
        })
        return data.data
    }

    return (
        <Paginator
            className={classMap.pools}
            perPage={perPage}
            fetcher={getPools}
            notFound={notFound}
            renderer={(p: Pool, i: number) => <PoolComponent key={p.pool_id} poolId={p.pool_id} index={i} />}
        />
    )
}
