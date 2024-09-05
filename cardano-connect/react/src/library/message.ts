import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./state";

// Define the initial slice state
const initialState: MessageState = {
    messages: null
}

// Define the slice
const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action: PayloadAction<{  type: Message['type']; message: Message['message'] }>) {
            state.messages = [...(state.messages || []), ...[{
                id: new Date().getTime(),
                timestamp: new Date().getTime(),
                ...action.payload,
            }]]
        },
        removeMessage(state, action: PayloadAction<number>) {
            return {...state, ...{ messages: [...(state.messages?.filter(m => m.id !== action.payload) || []) ] }}
        },
        resetMessageState(state) {
            return {...state, ...initialState}
        },
    },
})

// Define getters
export const getMessageState = (state: RootState): MessageState => {
    return state.message
}

// Define mutators
export const { setMessage, removeMessage, resetMessageState } = messageSlice.actions

// Export the slice
export default messageSlice.reducer
