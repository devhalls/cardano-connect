import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./state";

// Define the initial slice state
const initialState: UxState = {
    assetModal: null
}

// Define the slice
const uxSlice = createSlice({
    name: 'ux',
    initialState,
    reducers: {
        setAssetModal(state, action: PayloadAction<UxState['assetModal'] | null>) {
            state.assetModal = action.payload
        },
    },
})

// Define getters
export const getUxAssetModal = (state: RootState): UxState['assetModal'] => {
    return state.ux.assetModal
}

// Define mutators
export const { setAssetModal } = uxSlice.actions

// Export the slice
export default uxSlice.reducer
