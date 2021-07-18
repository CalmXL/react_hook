// ? 项目中所有请求经由这个文件发出
import myAxios from './myAxios'

// ? 登录请求
export const reqLogin = (username,password)=>myAxios.post('http://localhost:3000/login',{username,password})

// ? 获取分类列表
export const reqCategory = ()=>myAxios.get('/manage/category/list')

// ? 添加分类
export const reqAddCategory = (categoryName) => myAxios.post('/manage/category/add',{categoryName})

// ? 修改分类
export const reqUpdateCategory = (categoryId,categoryName) => 
  myAxios.post('/manage/category/update',{categoryId,categoryName})