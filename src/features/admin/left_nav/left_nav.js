import React,{} from 'react'
import {Menu} from 'antd' 
import {Link,useLocation} from 'react-router-dom'
import {menuList} from '../../../config/menu_list'
import logo from '../../../static/imgs/logo.png'
import './css/leftNav.css'

const {SubMenu,Item} = Menu
// 创建菜单
const createMenu= (target)=>{
   return target.map((item)=>{
    if(!item.children){
      return (
        <Item key={item.key} icon={item.icon}>
          <Link to={item.path}>
            {item.title}
          </Link>
        </Item>
      )
    }else{
      return (
        <SubMenu key={item.key} icon={item.icon} title={item.title}>
         { createMenu(item.children)}
        </SubMenu>
      )
    } 
  })
}

export default function LeftNav() {

  const location = useLocation()

  return(
    <div className="left-nav">
      <div className='left-nav-header'>
        <img src={logo} alt="" />
        <h1>商品管理系统</h1>
      </div>
      <Menu 
        mode='inline'
        theme='light'
        defaultSelectedKeys={location.pathname.split('/').reverse()[0]}
        defaultOpenKeys={location.pathname.split('/').splice(2)}
      >
        {
          createMenu(menuList)
        }
      </Menu>
    </div>
    
  )
}