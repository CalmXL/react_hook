import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import store from '../app/store'
import { deleteUser } from '../features/login/loginSlice'
import 'nprogress/nprogress.css'
import { message } from 'antd'

// 创建axios实例
const instance = axios.create({
  timeout: 4000
})

// 请求拦截器                                                                                                                                
instance.interceptors.request.use(config => {                                                                                                                                                                                       
  // ? 进度条开始
  NProgress.start()
  // 从redux中获取token
  const {token} = store.getState().login
  if (token) config.headers.Authorization = 'atguigu_' + token
  let {method,data} = config
  // 判断请求形式
  if(method.toLowerCase() === 'post'){
    // 判断参数是否为json格式
    if(typeof data === 'object'){
      // console.log('json==>urlencoded')
      config.data = qs.stringify(data)
    }                                                                                                                                         
  }

  return config;
},error => {
// Do something with request error
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(response => {

  NProgress.done()
  return response.data;
},error => {
  NProgress.done()
  if(error.response.status === 401){
    message.error('您的登录身份已过期,请您重新登录',1)
    // ? 跳转回 login 页面
    store.dispatch(deleteUser())

  }else{
    message.error(error.message,1)
  }
  return new Promise(()=>{});
});

export default instance