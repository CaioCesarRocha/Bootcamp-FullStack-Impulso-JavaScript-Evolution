import {createSlice} from '@reduxjs/toolkit';

const Slice = createSlice({
    name: 'Theme',
    initialState:{
        theme: 'light'
    },
    reducers:{
        changeTheme: (state, action) =>{
            state.theme= action.payload
        },    
    }
})

export const {changeTheme} = Slice.actions

export default Slice.reducer;