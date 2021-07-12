import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

// ? 创建一个Redux Store
export default configureStore({
  // ? 从切片中导入 reducer 函数并将其添加到我们的store中.
  reducer:{
    counter:counterReducer
  },
})
