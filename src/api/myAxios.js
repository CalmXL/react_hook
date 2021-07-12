import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建axios实例
const instance = axios.create({
  timeout: 4000
})

// 请求拦截器
instance.interceptors.request.use(config => {

  // ? 进度条开始
  NProgress.start()

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
  return Promise.reject(error);
});

export default instance