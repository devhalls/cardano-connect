import React from 'react'
import {classMap} from "../../library/utils";
import {setMessage} from "../../library/message";
import {useAppDispatch, useAppSelector} from "../../library/state";
import {getOptionState} from "../../library/option";
import {Copy} from "./Copy";

export const DataRows = ({
    rows,
    className
}: ComponentDataRows) => {

    const printTitleRow = (title: string | React.ReactElement): React.ReactElement => {
        return (
            <li className={classMap.assetTitleRow}>{title}</li>
        )
    }

    const printDataRow = (title: string | React.ReactElement, data: string | number | React.ReactElement, copy?: boolean): React.ReactElement => {
        return (
            <li className={classMap.assetDataRow}>
                <span>{title}</span>{' '}
                {copy ? (
                    <span><Copy text={data.toString()}/></span>
                ) : (
                    <span>{data}</span>
                )}
            </li>
        )
    }

  return (
    <ul className={className}>
        {rows.map((row, i) => {
            <>{row.data ? printDataRow(row.title, row.data, false) : printTitleRow(row.title)}</>
        })}
    </ul>
  )
}
