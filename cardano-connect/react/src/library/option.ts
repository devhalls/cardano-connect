import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./state";

// Define the initial slice state
const initialState: OptionState = {
    assets_placeholder: null,
    assets_api_endpoint: null,
    assets_api_key: null,
    assets_ipfs_endpoint: null,
    version: null,
    plugin_name: null,
    mainnet_active: null,
    login_redirect: null,
    logout_redirect: null,
    label_connect: null,
    label_connected: null,
    label_connect_cancel: null,
    label_empty: null,
    label_disconnect: null,
    label_error: null,
    label_invalid_account: null,
    label_switch_to_testnet: null,
    label_create_mainnet_prompt: null,
    label_create_testnet_prompt: null,
    label_welcome_back: null,
    label_welcome_new: null,
    label_no_assets: null,
    label_text_copied: null,
    label_text_copied_failed: null,
    label_paginate_prev: null,
    label_paginate_next: null,
    label_paginate_items: null,
    label_assets_policy_label: null,
    label_assets_quantity_label: null,
    assets_whitelist: null,
}

// Define the slice
const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        setOptionState(state, action: PayloadAction<OptionState>) {
            return {...state, ...action.payload}
        },
        resetOptionState(state) {
            return {...state, ...initialState}
        },
    },
})

// Define getters
export const getOptionState = (state: RootState): OptionState => {
    return state.option
}

// Define mutators
export const { setOptionState, resetOptionState } = optionSlice.actions

// Export the slice
export default optionSlice.reducer
