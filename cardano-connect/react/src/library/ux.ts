import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./state";

// Define the initial slice state
const initialState: UxState = {
    assetModal: null,
    compareModal: null,
    comparePools: null,
    compareDreps: null
}

// Define the slice
const uxSlice = createSlice({
    name: 'ux',
    initialState,
    reducers: {
        setAssetModal(state, action: PayloadAction<UxState['assetModal'] | null>) {
            state.assetModal = action.payload
        },
        setCompareModal(state, action: PayloadAction<UxState['compareModal'] | null>) {
            state.compareModal = action.payload
        },
        setComparePools(state, action: PayloadAction<UxState['comparePools'] | null>) {
            return {...state, comparePools: [...action.payload]}
        },
        setCompareDreps(state, action: PayloadAction<UxState['compareDreps'] | null>) {
            return {...state, compareDreps: [...action.payload]}
        },
    },
})

// Define getters
export const getUxAssetModal = (state: RootState): UxState['assetModal'] => {
    return state.ux.assetModal
}
export const getUxCompareModal = (state: RootState): UxState['compareModal'] => {
    return state.ux.compareModal
}
export const getUxComparePools = (state: RootState): UxState['comparePools'] => {
    return state.ux.comparePools
}
export const getUxCompareDreps = (state: RootState): UxState['compareDreps'] => {
    return state.ux.compareDreps
}

// Define mutators
export const { setAssetModal, setCompareModal, setComparePools, setCompareDreps } = uxSlice.actions

// Export the slice
export default uxSlice.reducer
