// ? 项目中所有请求经由这个文件发出
import myAxios from './myAxios'

export const reqLogin = (username,password)=>myAxios.post('http://localhost:3000/login',{username,password})