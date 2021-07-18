import React,{} from 'react'
import { Form, Input, Button, message } from 'antd';
import { QqOutlined, KeyOutlined } from '@ant-design/icons';
import { useHistory} from 'react-router-dom'
import {saveUserInfo} from './loginSlice'
import {useDispatch} from 'react-redux'
import {reqLogin} from '../../api'
import logo from './imgs/logo.png'
import './css/login.css'


export default function Login() {

  const dispatch = useDispatch()

  let history = useHistory() 

  // ? 提交表单且数据验证成功后回调事件
  const onFinish = async(values)=>{
    const {username,password} = values
    // 请求登录
    let result = await reqLogin(username,password)
    const {status,data,msg} = result
    if(status === 0){
      message.success('请求登录成功')
      // 1.将信息存入store中
      dispatch(saveUserInfo(data))
      
      // 2.跳转admin页面
      history.replace('/admin/home')
    }else{
      message.error(msg,1)
    }
  }

  // ? 用于密码的效验
  const pwdValidate = ()=>({
    validator(_, value ){
      if(!value){
        return Promise.reject(new Error('必须输入密码'))
      }else if(value.length < 4){
        return Promise.reject(new Error('密码长度必须大于等于4'))
      }else if(value.length > 12){
        return Promise.reject(new Error('密码长度必须小于等于12'))
      }else if(!(/^\w+$/).test(value)){
        return Promise.reject(new Error('密码必须是数字、字母、下划线'))
      }
      return Promise.resolve()
    }
  })
  

  return(
    <div className='login'>
      <header>
        <img src={logo} alt="图片加载失败" />
        <h2>后台管理系统</h2>
      </header>
      <section>
        <h2>用户登录</h2>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {required: true,message: '请输入你的用户名!',},
              {max:12, message:'用户名不可以超过12位'},
              {min:4,message:'用户名不可以少于4位'},
              {pattern:/^\w+$/,message:'只能是数字,字母,下划线'}
            ]}
          >
            <Input prefix={<QqOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              pwdValidate
            ]}
          >
            <Input
              prefix={<KeyOutlined  className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}