import { combineReducers, configureStore } from '@reduxjs/toolkit'

import loaderSlice from '@/redux/slice/loader.slice'
import validationSlice from '@/redux/slice/validation.slice'
import authSlice from '@/redux/slice/auth.slice'
import eventSlice from '@/redux/slice/event.Slice'
import ticketSlice from'@/redux/slice/ticket.slice'
const rootReducer = combineReducers({
    loaderSlice,
    authSlice,
    validationSlice,
    eventSlice,
    ticketSlice
    
})

const store = configureStore({
    reducer: rootReducer,
})

export default store