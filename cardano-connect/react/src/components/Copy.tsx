import React, {useCallback} from 'react'
import {classMap} from "../library/utils";
import {resetMessageState, setMessage} from "../library/message";
import {useAppDispatch, useAppSelector} from "../library/state";
import {getOptionState} from "../library/option";

export const Copy = ({
  text,
  copyText,
  title = 'Copy'
}: ComponentCopy) => {

  // APP State

  const dispatch = useAppDispatch()
  const options: OptionState = useAppSelector(getOptionState)

  // Click handler

  const copyClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(copyText || text.toString())
      dispatch(setMessage({
        id: new Date().getTime(),
        type: 'success',
        message: options.label_text_copied,
        timestamp: new Date().getTime(),
      }))
    } catch (err) {
      dispatch(setMessage({
        id: new Date().getTime(),
        type: 'error',
        message: options.label_text_copied_failed,
        timestamp: new Date().getTime(),
      }))
    }
  }, [options])

  return (
    <span className={classMap.copy} onClick={copyClick} title={title}>
      {text}
    </span>
  )
}
