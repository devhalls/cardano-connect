import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import userSlice from './user'
import optionSlice from './option'
import messageSlide from './message'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants'

const rootReducer = combineReducers({
    user: userSlice,
    option: optionSlice,
    message: messageSlide
})

const persistedReducer = persistReducer(
    {
        key: 'store',
        storage,
        whitelist: ['user', 'option', 'message'],
        stateReconciler: autoMergeLevel2
    },
    rootReducer
)

export const state = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof state.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const persistor = persistStore(state)