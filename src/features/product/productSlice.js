import {createSlice} from '@reduxjs/toolkit'

export const productSilce = createSlice({
  name:'product',
  initialState:{
    productList:[]
  },
  reducers:{
    saveProductList:(state,action)=>{
      state.productList = action.payload
    }
  }
})

export const {saveProductList} = productSilce.actions
export default productSilce.reducer