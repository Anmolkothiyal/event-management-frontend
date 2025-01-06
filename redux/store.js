import { combineReducers, configureStore } from '@reduxjs/toolkit'

import loaderSlice from '@/redux/slice/loader.slice'
import validationSlice from '@/redux/slice/validation.slice'
import authSlice from '@/redux/slice/auth.slice'

const rootReducer = combineReducers({
    loaderSlice,
    authSlice,
    validationSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store