import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name:'category',
  initialState:{
    categoryList:[]
  },
  reducers:{
    saveCategoryList:(state,action)=>{
      state.categoryList = action.payload
    }
  }
})

export const { saveCategoryList } = categorySlice.actions

export default categorySlice.reducer