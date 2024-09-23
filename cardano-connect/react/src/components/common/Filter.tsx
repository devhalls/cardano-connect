import React from "react";
import {classMap} from "../../library/utils";

export const Filter = ({ filter, setFilter }: ComponentFilter) => {
    const handleChange = (e) => {
        if (filter.type === "checkbox") {
            setFilter({...filter, value: e.target.checked});
        } else {
            setFilter({...filter, value: e.target.value})
        }
    }

    return (
        <div className={`${classMap.paginationFilter} ${classMap.paginationFilter}-${filter.type} ${filter.className || ''}`}>
            {filter.label ? <label htmlFor={filter.key}>{filter.label}</label> : null}
            {filter.type ==='select' ? (
                <select
                    id={filter.key}
                    onChange={handleChange}
                >
                    {filter.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    id={filter.key}
                    placeholder={filter.placeholder || undefined}
                    type={filter.type}
                    value={filter.value || ''}
                    onChange={handleChange}
                    checked={filter.type === 'checkbox' ? filter.value : undefined}
                    min={filter.min ? filter.min : undefined}
                    max={filter.max ? filter.max : undefined}
                />
            )}
            {filter.type === 'range' ? <span>{filter.display ? filter.display(filter.value) : filter.value}</span> : null}
        </div>
    )
}
