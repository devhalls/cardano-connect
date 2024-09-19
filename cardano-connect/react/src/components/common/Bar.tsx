import React from 'react'
import {classMap} from "../../library/utils";

export const Bar = ({
    title,
    content,
    percentage,
    colorMap,
    defaultColor,
    className = '',
}: ComponentBar) => {
    let found = null
    Object.keys(colorMap).map(key => {
        found = percentage >= parseInt(key) ? key : found
    })
    return (
        <div className={`${classMap.bar} ${className}`}>
            <div className={classMap.barTitle}>{title}</div>
            <div className={classMap.barContent}>
                <div className={classMap.barCoverage}
                     style={{
                         background: defaultColor
                     }}>
                    <div
                        className={classMap.barCoverageInner}
                        style={{
                            width: `${percentage}%`,
                            background: colorMap[found]
                        }}
                    ></div>
                </div>
                <div className={classMap.barContentOverlay}>{content}</div>
            </div>
        </div>
    )
}
