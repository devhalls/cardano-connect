import React from 'react'
import {classMap} from "../../library/utils";

export const Stats = ({
    title,
    stats,
    className = '',
}: ComponentStats) => {
    return (
        <div className={`${classMap.stats} ${className}`}>
            {title ? <div className={classMap.statsTitle}>{title}</div> : null}
            {stats.map(s =>
                <div className={classMap.statsContent} style={{ borderColor: s.color }}>{s.content}</div>
            )}
        </div>
    )
}
