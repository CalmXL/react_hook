import {createSlice} from '@reduxjs/toolkit'

let user = JSON.parse(localStorage.getItem('user'))
let token = localStorage.getItem('token')

export const loginSlice =  createSlice({
  name:'login',
  initialState:{
    user: user || {},
    token: token || '',
    isLogin: user && token ? true : false
  },
  reducers:{
    saveUserInfo:(state,action)=>{
      const {user,token} = action.payload
      // ? 将用户信息存入 localstoage
      localStorage.setItem('user',JSON.stringify(user))
      localStorage.setItem('token',token)
      localStorage.setItem('isLogin',true)

      state.user = user
      state.token = token
      state.isLogin = true
    },
    deleteUser:(state)=>{
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('isLogin')
      state.user = {}
      state.token = ''
      state.isLogin = false
    }
  }
})

export const {saveUserInfo, deleteUser} = loginSlice.actions

export default loginSlice.reducer