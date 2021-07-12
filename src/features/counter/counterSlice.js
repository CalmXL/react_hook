import { createSlice } from "@reduxjs/toolkit"

// ? 创建切片需要用一个字符串名称来标记切片,一个初始状态值
// ? 以及一个或多个 reducer 函数来定义如何更新状态
// ? 创建切片后,我门可以导出生成的 Redux action creators 和整个的reducer函数.

export const counterSlice = createSlice({
  name:'counter',
  initialState:{
    value:0,
  },
  reducers:{
    increment:(state) => {
      state.value += 1    
    },
    decrement:(state)=>{
      state.value -= 1
    },
    incrementByAmount:(state,action)=>{
      state.value += action.payload
    }
  }
})

export const incrementAsync = (amount) => {
  return (dispatch)=>
    setTimeout(() => {
      dispatch(incrementByAmount(amount))
    },1000)
  
}

export const {increment, decrement, incrementByAmount} = counterSlice.actions

export default counterSlice.reducer