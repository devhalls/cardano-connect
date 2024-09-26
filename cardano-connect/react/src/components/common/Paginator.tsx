import React, {useCallback, useEffect, useRef, useState} from "react";
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
}: ComponentPaginator<ApiAsset | Asset | Pool | Drep>) => {

    // APP state

    const options: OptionState = useAppSelector(getOptionState)

    // Local state

    const containerRef = useRef()
    const [containerHeight, setContainerHeight] = useState<number>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [items, setItems] = useState<(ApiAsset | Pool | Asset | Drep)[] | null>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(perPage)
    const [filters, setFilters] = useState<Filter[] | null>(defaultFilters)
    const [updatedPage, setUpdatedPage] = useState<number>(1);
    const [updatedFilters, setUpdatedFilters] = useState<Filter[] | null>(filters)
    const [showFilters, setShowFilters] = useState<boolean>(true);

    // Click handlers

    const changePage = useCallback((newPage: number, filtersSubmittable: Filter[]) => {
        setContainerHeight(containerRef.current.clientHeight)
        setLoading(true)
        const submittableFilters: FilterPost[] = filtersSubmittable.map(f => {
            return {
                value: f.format ? f.format(f.value) : f.value,
                key: f.key,
                type: f.type
            }
        })
        const calculatedPage= JSON.stringify(filters) === JSON.stringify(filtersSubmittable)
            ? newPage
            : 1;
        fetcher(calculatedPage, itemsPerPage, submittableFilters).then(data => {
            setItems(data.items)
            setTotal(data.total)
            setPage(calculatedPage)
            setUpdatedPage(calculatedPage)
            setLoading(false)
            setFilters(filtersSubmittable)
            setContainerHeight(null)
            containerRef.current.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            })
        })
    }, [itemsPerPage, filters])

    // Set data on load

    useEffect(() => {
        const submittableFilters: FilterPost[] = filters?.map(f => {
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
        <div className={classMap.paginationContainer} ref={containerRef} style={{height: containerHeight}}>
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
                    <span className={classMap.paginationTotal}>{total} {options.label_paginate_items}</span>
                    {defaultFilters && options.pools_data_source === 'local_wp' ? <button
                        className={classMap.paginationToggle}
                        onClick={() => setShowFilters(!showFilters)}
                    ><span className={showFilters ? classMap.paginationToggleIcon : classMap.paginationToggleIconClose}></span></button>: null}
                </div>
                {defaultFilters && showFilters ? <div className={classMap.paginationFiltersContainer}>
                    {options.pools_data_source === 'local_wp' ? <div className={classMap.paginationFilters}>
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
                    <div className={classMap.paginationFiltersButtons}>
                        {!loading && (updatedPage !== page || JSON.stringify(updatedFilters) !== JSON.stringify(filters)) ? <button
                            className={classMap.paginationUpdate}
                            disabled={loading}
                            onClick={() => changePage(updatedPage, updatedFilters)}>
                            {options.label_paginate_search_update}
                        </button> : null}
                        {!loading && (1 !== page || JSON.stringify(defaultFilters) !== JSON.stringify(filters)) ? <button
                            className={classMap.paginationReset}
                            disabled={loading}
                            onClick={() => {
                                setUpdatedFilters(defaultFilters)
                                changePage(1, defaultFilters)
                            }}>
                            {options.label_paginate_search_reset}
                        </button> : null}
                    </div>
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
        </div>
    )
}
