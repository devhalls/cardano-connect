import React from 'react'
import {classMap} from "../../library/utils";

export const LinkIcon = ({
    title,
    url,
    icon,
    className = '',
}: ComponentLinkIcon) => {
    return (
        <a className={`${classMap.linkIcon} ${className}`} href={url} title={title} target="_blank" rel="noopener noreferrer">
            {icon ? <span className={`${classMap.icon} ${classMap.icon}-${icon}`}></span> : null}
            {!icon ? title : null}
        </a>
    )
}
