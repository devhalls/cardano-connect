import React from 'react'
import {classMap} from "../../library/utils";

export const LinkIcon = ({
    title,
    url,
    icon,
    className = '',
    toolTip,
    toolTipId
}: ComponentLinkIcon) => {
    return (
        <a data-tooltip-id={toolTip ? toolTipId : undefined} data-tooltip-content={toolTip ? toolTip : undefined} className={`${classMap.linkIcon} ${className}`} href={url} title={title} target="_blank" rel="noopener noreferrer">
            {icon ? <span className={`${classMap.icon} ${classMap.icon}-${icon}`}></span> : null}
            {!icon ? title : null}
        </a>
    )
}
