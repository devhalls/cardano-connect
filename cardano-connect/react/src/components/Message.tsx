import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../library/state";
import {classMap, ucFirst} from "../library/utils";
import {getMessageState, removeMessage} from "../library/message";

export const Message = () => {

    // APP state

    const dispatch = useAppDispatch()
    const message: MessageState = useAppSelector(getMessageState)

    // Event handlers

    const onRemoveError = useCallback((id: number, timing = 300) => {
        setTimeout(() => {
            dispatch(removeMessage(id))
        }, timing)
    }, [dispatch])

    // State hooks

    useEffect(() => {
        if (message.messages) {
            message.messages.map(a => {
                onRemoveError(a.id, 6000)
                return a
            })
        }
    }, [message.messages, onRemoveError]);

    return message.messages && message.messages.length > 0 ? (
        <div className={classMap.messages}>
            {message.messages.map(message => (
                <div key={message.id} onClick={() => onRemoveError(message.id)}
                     className={
                        classMap.message + ' ' +
                        classMap[`message${ucFirst(message.type)}`] + ' '
                    }>
                    {ucFirst(message.message)}
                </div>
            ))}
        </div>
    ) : null
}
