import React, {useCallback, useEffect, useState} from "react";
import {Loader} from "./Loader";
import {useAppSelector} from "../../library/state";
import {getOptionState} from "../../library/option";
import {classMap} from "../../library/utils";

export const Paginator = ({
    renderer,
    fetcher,
    perPage = 10, // Set to 0 to disable pagination
    className,
    notFound
}: ComponentPaginator<ApiAsset | Asset | Pool>) => {

    // APP state

    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [items, setItems] = useState<(ApiAsset | Pool | Asset)[] | null>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(perPage)

    // Click handlers

    const changePage = useCallback((dir: '+' | '-') => {
        const newPage = (dir === '+' ? page + 1 : page - 1);
        setLoading(true)
        fetcher(newPage, itemsPerPage).then(data => {
            setItems(data.items)
            setTotal(data.total)
            setPage(newPage)
            setLoading(false)
        })
    }, [page, itemsPerPage])

    // Set data on load

    useEffect(() => {
        fetcher(page, itemsPerPage).then(data => {
            setItems(data.items)
            setTotal(data.total)
            setLoading(false)
        })
    }, []);

    return (
        <>
            {perPage > 0 ? <div className={classMap.pagination}>
                <span>{page} / {total > itemsPerPage ? Math.ceil(total / itemsPerPage) : 1}</span>
                <button
                    disabled={loading || page <= 1}
                    onClick={() => changePage('-')}>
                    {options.label_paginate_prev}
                </button>
                <button
                    disabled={loading || (items && page >= Math.ceil(total / itemsPerPage))}
                    onClick={() => changePage('+')}>
                    {options.label_paginate_next}
                </button>
                <span>{total} {options.label_paginate_items}</span>
            </div> : null }
            <div className={className}>
                {loading
                    ? <Loader/>
                    : items?.length
                    ? items.map((item, i) => renderer(item, i))
                    : <div className={classMap.notFound}>{notFound || options.label_no_assets}</div>
                }
            </div>
        </>
    )
}
