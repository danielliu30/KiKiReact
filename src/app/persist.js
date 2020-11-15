import JWTSlice from '../componets/Security/JWTSlice'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import {configureStore} from '@reduxjs/toolkit'
import allReducers from '../componets/Security/CombineSlice'
const persistConfig={
    key:'root',
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = configureStore({
        reducer:persistedReducer
})

let persistor = persistStore(store);

export{
    store,
    persistor
}