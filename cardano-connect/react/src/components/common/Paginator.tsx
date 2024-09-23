import React, {useCallback, useEffect, useState} from "react";
import {Loader} from "./Loader";
import {useAppSelector} from "../../library/state";
import {getOptionState} from "../../library/option";
import {classMap} from "../../library/utils";
import {Filter} from "./Filter";

export const Paginator = ({
    renderer,
    fetcher,
    perPage = 10, // Set to 0 to disable pagination
    className,
    notFound,
    defaultFilters
}: ComponentPaginator<ApiAsset | Asset | Pool>) => {

    // APP state

    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [items, setItems] = useState<(ApiAsset | Pool | Asset)[] | null>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(perPage)
    const [filters, setFilters] = useState<Filter[] | null>(defaultFilters)
    const [updatedPage, setUpdatedPage] = useState<number>(1);
    const [updatedFilters, setUpdatedFilters] = useState<Filter[] | null>(filters)
    const [hideFilters, setHideFilters] = useState<boolean>(true);

    // Click handlers

    const changePage = useCallback((newPage: number, filtersSubmittable: Filter[]) => {
        setLoading(true)
        const submittableFilters: FilterPost[] = filtersSubmittable.map(f => {
            return {
                value: f.format ? f.format(f.value) : f.value,
                key: f.key,
                type: f.type
            }
        })
        fetcher(newPage, itemsPerPage, submittableFilters).then(data => {
            setItems(data.items)
            setTotal(data.total)
            setPage(newPage)
            setUpdatedPage(newPage)
            setLoading(false)
            setFilters(filtersSubmittable)
        })
    }, [itemsPerPage])

    // Set data on load

    useEffect(() => {
        const submittableFilters: FilterPost[] = filters.map(f => {
            return {
                value: f.format ? f.format(f.value) : f.value,
                key: f.key,
                type: f.type
            }
        })
        fetcher(page, itemsPerPage, submittableFilters).then(data => {
            setItems(data.items)
            setTotal(data.total)
            setLoading(false)
        })
    }, []);

    return (
        <>
            {perPage > 0 ? <div className={classMap.pagination}>
                <div className={classMap.paginationPaged}>
                    <div className={classMap.paginationPage}>
                        <input
                            onChange={(v) => setUpdatedPage(parseInt(v.currentTarget.value || '1'))}
                            type={'number'}
                            value={updatedPage}
                            min={1}
                            max={Math.ceil(total / itemsPerPage)}
                        />{' '}
                        <div>/ {total > itemsPerPage ? Math.ceil(total / itemsPerPage) : 1}</div>
                    </div>
                    <button
                        className={classMap.paginationPrev}
                        disabled={loading || page <= 1}
                        onClick={() => changePage(page - 1, updatedFilters)}>
                        {options.label_paginate_prev}
                    </button>
                    <button
                        className={classMap.paginationNext}
                        disabled={loading || (items && page >= Math.ceil(total / itemsPerPage))}
                        onClick={() => changePage(page + 1, updatedFilters)}>
                        {options.label_paginate_next}
                    </button>
                    {updatedPage !== page || JSON.stringify(updatedFilters) !== JSON.stringify(filters) ? <button
                        className={classMap.paginationUpdate}
                        disabled={loading}
                        onClick={() => changePage(updatedPage, updatedFilters)}>
                        Update
                    </button> : null}
                    {1 !== page || JSON.stringify(defaultFilters) !== JSON.stringify(filters) ? <button
                        className={classMap.paginationReset}
                        disabled={loading}
                        onClick={() => {
                            setUpdatedFilters(defaultFilters)
                            changePage(1, defaultFilters)
                        }}>
                        Reset
                    </button> : null}
                    <span className={classMap.paginationTotal}>{total} {options.label_paginate_items}</span>
                    {options.pools_data_source === 'local_wp' ? <button
                        className={classMap.paginationToggle}
                        onClick={() => setHideFilters(!hideFilters)}
                    ><span className={hideFilters ? classMap.paginationToggleIcon : classMap.paginationToggleIconClose}></span></button>: null}
                </div>
                {hideFilters && options.pools_data_source === 'local_wp' ? <div className={classMap.paginationFilters}>
                    {filters?.sort((a, b) => a.order < b.order ? -1 : 1).map((f) =>
                        <Filter
                            key={f.key}
                            filter={updatedFilters?.find(g => g.key === f.key) || f}
                            setFilter={(f) => {
                                const updated = updatedFilters.filter(g => g.key !== f.key)
                                setUpdatedFilters([...updated, f])
                            }}
                        />
                    )}
                </div> : null}
            </div> : null}
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
