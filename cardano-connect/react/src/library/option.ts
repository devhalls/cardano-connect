import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./state";

// Define the initial slice state
const initialState: OptionState = {
    version: null,
    plugin_name: null,
    mainnet_active: null,
    login_redirect: null,
    logout_redirect: null,
    pools_data_source: null,
    disable_styles: null,
    assets_placeholder: null,
    assets_whitelist: null,
    assets_ipfs_endpoint: null,
    label_connect: null,
    label_connected: null,
    label_connect_cancel: null,
    label_empty: null,
    label_disconnect: null,
    label_disconnect_prompt: null,
    label_disconnected_prompt: null,
    label_error: null,
    label_invalid_account: null,
    label_switch_to_testnet: null,
    label_create_mainnet_prompt: null,
    label_create_testnet_prompt: null,
    label_welcome_back: null,
    label_welcome_new: null,
    label_no_assets: null,
    label_no_pools: null,
    label_no_pool: null,
    label_delegate_to_pool: null,
    label_delegated_to_pool: null,
    label_pool_fees: null,
    label_pool_stake: null,
    label_pool_stake_saturated: null,
    label_pool_pledge_met: null,
    label_pool_pledge_not_met: null,
    label_pool_retiring: null,
    label_pool_retired: null,
    label_pool_synced: null,
    label_pool_lifetime_blocks: null,
    label_pool_last_epoch_blocks: null,
    label_pool_delegators: null,
    label_compare_view_pools: null,
    label_compare_view_dreps: null,
    label_compare_add: null,
    label_compare_remove: null,
    label_compare_no_items: null,
    label_text_copied: null,
    label_text_copied_failed: null,
    label_paginate_prev: null,
    label_paginate_next: null,
    label_paginate_items: null,
    label_paginate_search_text: null,
    label_paginate_search_text_placeholder: null,
    label_paginate_search_metadata: null,
    label_paginate_search_retired: null,
    label_paginate_search_saturation: null,
    label_paginate_search_order: null,
    label_paginate_search_update: null,
    label_paginate_search_reset: null,
    label_assets_policy_label: null,
    label_assets_quantity_label: null,
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
