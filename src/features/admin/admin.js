import React,{} from 'react'
import { useHistory,Redirect,Switch,Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import Header from './header/header'
import Home from '../../component/home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import LeftNav from './left_nav/left_nav'
import './css/admin.css'

const {Sider,Content,Footer} = Layout


export default function Admin() {

  const { user, token, isLogin} = useSelector(state=>state.login)
  const history = useHistory()
 

  // ? 退出登录
  // const layOut = ()=>{
    // 1.清除localStorage
  //   localStorage.clear()
    // 2.调转到login页面 ==> 使用Redirect
  //   history.replace('/login')
    
  // }

  if(isLogin){
    return (
      <Layout className='admin'>
        <Sider theme='light' >
          <LeftNav/>
        </Sider>
        <Layout>
          <Header />
          <Content className='content'>
            <Switch>
              <Route path='/admin/home' component={Home}/>
              <Route path='/admin/prod_about/category' component={Category}/>
              <Route path='/admin/prod_about/product' component={Product}/>
              <Route path='/admin/user' component={User}/>
              <Route path='/admin/role' component={Role}/>
              <Route path='/admin/charts/bar' component={Bar}/>
              <Route path='/admin/charts/line' component={Line}/>
              <Route path='/admin/charts/pie' component={Pie}/>
              <Route path='/admin//home' component={Home}/>
              <Redirect to='/admin/home'/>
            </Switch>
          </Content>
          <Footer className='footer'>Footer</Footer>
      </Layout>
      </Layout>
    )
  }else{
    return <Redirect to='/login'/>
  }
  
}