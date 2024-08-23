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
  assets_whitelist: null,
  error: null
}

// Define the slice
const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    setOptionError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setOptionState(state, action: PayloadAction<OptionState>) {
      return {...state, ...action.payload}
    },
    resetOptionState(state) {
      return {...state, ...initialState}
    },
  },
})

// Define getters
export const getOptionError = (state: RootState): string | null => {
  return state.option.error
}
export const getOptionState = (state: RootState): OptionState => {
  return state.option
}

// Define mutators
export const { setOptionError, setOptionState, resetOptionState } = optionSlice.actions

// Export the slice
export default optionSlice.reducer
