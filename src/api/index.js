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

// ? 获取商品列表
export const reqProductList = (pageNum,pageSize)=>myAxios.get('/manage/product/list',{params:{pageNum,pageSize}}) 

// ? 更新商品状态
export const reqUpdateStatus = (productId,status)=>{
  return myAxios.post('/manage/product/updateStatus',{productId,status})
}

// ? 根据名称搜索
export const reqNameSearch = (productName,pageNum,pageSize) => {
  // console.log('-----ByName------')
  // console.log(productName,pageNum,pageSize)
  return myAxios.get('/manage/product/search',{params:{productName,pageNum,pageSize}})
}

// ? 根据详情搜索
export const reqDescSearch = (productDesc,pageNum,pageSize) => {
  // console.log('-----ByDesc------')
  // console.log(productDesc,pageNum,pageSize)
  return myAxios.get('/manage/product/search',{params:{productDesc,pageNum,pageSize}})
}

// ? 搜索
export const reqSearch = (option,pageNum,pageSize,keyWord) => {
  return myAxios.get('/manage/product/search',{params:{[option]:keyWord,pageNum,pageSize}})
}

// ? 添加商品
export const reqAddProduct = () => myAxios.post('/manage/product/add',{})

// ? 根据商品id获取商品
export const reqGetProductById = (productId) => myAxios.get('/manage/product/info',{params:{productId}})

// ? 根据分类id获取商品
export const reqGetCategoryById = (categoryId) => myAxios.get('/manage/category/info',{params:{categoryId}})