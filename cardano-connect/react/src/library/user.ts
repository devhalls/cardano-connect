import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./state";

// Define the initial slice state
const initialState: UserState = {
    connected: null,
    web3: null,
    user: null,
    account: null,
    network: null,
    assets: null,
    apiAssets: null,
    balances: null,
    collateral: null,
    nonce: null,
}

export const cachePeriod: number = 3600000 // 1 hour cache for apiAssets

// Define the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserNetwork(state, action: PayloadAction<string | null>) {
            state.network = action.payload
        },
        setUserAssets(state, action: PayloadAction<Asset[]>) {
            state.assets = action.payload
        },
        setUserApiAssets(state, action: PayloadAction<ApiAsset[]>) {
            const data = action.payload.map(a => {
                return {...a, ...{ cached: new Date().getTime() }}
            })
            state.apiAssets = [
                ...data,
                ...(state.apiAssets?.filter(
                    a => action.payload.find(
                        b => a.asset !== b.asset
                    )
                ) || [])
            ]
        },
        setUserBalances(state, action: PayloadAction<Balance[]>) {
            state.balances = action.payload
        },
        setUserCollateral(state, action: PayloadAction<UxTO[]>) {
            state.collateral = action.payload
        },
        setUserState(state, action: PayloadAction<UserState>) {
            return {...state, ...action.payload}
        },
        resetUserState(state) {
            return {...state, ...initialState}
        },
    },
})

// Define getters
export const getUserNetwork = (state: RootState): string | null => {
    return state.user.network
}
export const getUserAssets = (state: RootState): Asset[] => {
    return state.user.assets
}
export const getUserApiAssets = (state: RootState): ApiAsset[] => {
    return state.user.apiAssets?.filter(
        asset => asset.cached > (new Date().getTime() - cachePeriod)
    )
}
export const getUserCollateral = (state: RootState): UxTO[] => {
    return state.user.collateral
}
export const getUserBalances = (state: RootState): Balance[] => {
    return state.user.balances
}
export const getUserState = (state: RootState): UserState => {
    return state.user
}

// Define mutators
export const {
    setUserNetwork,
    setUserAssets,
    setUserApiAssets,
    setUserBalances,
    setUserCollateral,
    setUserState,
    resetUserState
} = userSlice.actions

// Export the slice
export default userSlice.reducer
