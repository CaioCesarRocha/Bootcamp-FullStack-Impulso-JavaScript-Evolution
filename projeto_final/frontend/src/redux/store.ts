import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './reducers/productsReducer';

export const store = configureStore({
    reducer:{
        products: productsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;