import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../library/state";
import {classMap, ucFirst} from "../library/utils";
import {getMessageState, removeMessage} from "../library/message";

export const Message = () => {

    // APP state

    const dispatch = useAppDispatch()
    const message: MessageState = useAppSelector(getMessageState)

    // Click handlers

    const onClickError = (id: number) => {
        setTimeout(() => {
            dispatch(removeMessage(id))
        }, 300)
    }

    useEffect(() => {
        if (message.messages) {
            message.messages.map(a => {
                setTimeout(() => {
                    dispatch(removeMessage(a.id))
                }, 6000)
            })
        }
    }, [message.messages]);

    return message.messages && message.messages.length > 0 ? (
        <div className={classMap.messages}>
            {message.messages.map(message => (
                <div key={message.id} onClick={() => onClickError(message.id)}
                     className={
                        classMap.message + ' ' +
                        classMap[`message${ucFirst(message.type)}`] + ' '
                    }>
                    {message.message}
                </div>
            ))}
        </div>
    ) : null
}
