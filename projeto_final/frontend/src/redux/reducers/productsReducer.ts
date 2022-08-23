import {createSlice} from '@reduxjs/toolkit';
import { IProduct } from '../../services/interfaces/product.interface';


const Slice = createSlice({
    name: 'Products',
    initialState:{
        productsList: [] as IProduct[],
        numProducts: 0
    },
    reducers:{
        setProductsList: (state, action) =>{
            state.productsList = action.payload
            state.numProducts =  state.productsList.length
        },
        addProductList: (state,action) =>{
            state.productsList = [...state.productsList, action.payload]
            state.numProducts =  state.productsList.length
        },
        removeProductList:(state, action) =>{
            var newList: IProduct[] = []

            state.productsList.map(product =>{
                if(product.id !== action.payload){
                    newList.push(product)
                }
            })

            state.productsList = newList;
            state.numProducts =  state.productsList.length
        }       
    }
})

export const {setProductsList, removeProductList, addProductList} = Slice.actions

export default Slice.reducer;