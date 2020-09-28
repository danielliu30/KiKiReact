import JWTSlice from '../Security/JWTSlice'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import {configureStore} from '@reduxjs/toolkit'

const persistConfig={
    key:'root',
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, JWTSlice)

const store = configureStore({
        reducer:persistedReducer
})

let persistor = persistStore(store);

export{
    store,
    persistor
}