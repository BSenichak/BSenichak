import { configureStore } from "@reduxjs/toolkit";
import root from "./rootReducer";
import fb from "./firebaseReducer";
// import logger from "redux-logger";
import admin from "./adminReducer";

export const store = configureStore({
    reducer: {
        root,
        fb,
        admin
    },
    devTools: true,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch