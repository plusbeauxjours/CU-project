import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import {
    persistStore,
    persistReducer,
} from "redux-persist";
import rootReducer from "./rootReducer"
import { AsyncStorage } from "react-native"

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);

export default store;