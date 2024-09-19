import React from 'react'
import {classMap} from "../../library/utils";
import {setMessage} from "../../library/message";
import {useAppDispatch, useAppSelector} from "../../library/state";
import {getOptionState} from "../../library/option";

export const Copy = ({
  text,
  copyText,
  title = 'Copy',
  className = classMap.copy
}: ComponentCopy) => {

  // APP State

  const dispatch = useAppDispatch()
  const options: OptionState = useAppSelector(getOptionState)

  // Click handler

  const copyClick = async () => {
    try {
      await navigator.clipboard.writeText(copyText || text.toString())
      dispatch(setMessage({
        type: 'success',
        message: options.label_text_copied,
      }))
    } catch (err) {
      dispatch(setMessage({
        type: 'error',
        message: options.label_text_copied_failed,
      }))
    }
  }

  return (
    <div className={className} onClick={copyClick} title={title}>
      {text}
    </div>
  )
}
