import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import productReducer from '../features/product/productSlice'
import categoryReducer from '../features/category/categorySlice'

export default configureStore({
  reducer:{
    login:loginReducer,
    product:productReducer,
    category:categoryReducer
  }
})