import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './reducers/productsReducer';
import themeReducer from './reducers/themeReducer';

export const store = configureStore({
    reducer:{
        products: productsReducer,
        theme: themeReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;