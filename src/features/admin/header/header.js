import React,{ useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {Button, Modal} from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import {menuList} from '../../../config/menu_list'
import {deleteUser} from '../../login/loginSlice'
import screenfull from 'screenfull'
import './css/header.css'

export default function Header() {

  const location = useLocation()
  const dispatch = useDispatch()
  const [date,SetDate] = useState(null)
  const [isfullScreen,setIsFullScreen] = useState(false)
  const {user} = useSelector(state=>state.login)
  const [title,setTitle] = useState('')

  useEffect(()=>{
    // 1.更新时间
    const dateTimer = setInterval(() => {
      SetDate(dayjs().format('YYYY年 MM月DD日 HH:mm:ss'))
    }, 1000);
    // 2.确认标题
    matchTitle(location.pathname)
    return ()=>{
      clearInterval(dateTimer)
    }
  },[location.pathname])
  // 全屏
  const isFull = ()=>{
    screenfull.toggle()
    setIsFullScreen(!isfullScreen)
  }
  // 退出登录
  const layout = ()=>{
    const {confirm} = Modal 
    confirm({
      title: '是否退出?',
      icon: <ExclamationCircleOutlined />,
      content: '请你确认,是否需要退出登录?',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        dispatch(deleteUser())
      },
      onCancel:()=>{}
    })
  }

  // 匹配标题
  const matchTitle = (path)=>{
    menuList.forEach((item)=>{
      // ? 判断item是否有chilren
      if(item.children instanceof Array){
        let result = item.children.find((children)=>{
          return children.path === path
        })
        if(result) setTitle(result.title)
      }else{
        if(item.path === path){
          setTitle(item.title)
        }
      }
    })  
  }

  return(
    <>
      <div className='header-top'>
        <Button  onClick={isFull} size='small'>
          {isfullScreen ? <FullscreenOutlined />: <FullscreenExitOutlined />}
          {/* <Icon type={isfullScreen ? 'FullscreenOutlined' : 'FullscreenExitOutlined'} style={{fontSize:'35px'}}/> */}
        </Button>
        <span>欢迎,{user.username}</span>
        <Button type='link' onClick={layout}>退出</Button>
      </div>
      <div className='header-bottom'>
        <div className='header-bottom-left'>
        {title}
        </div>
        <div className='header-bottom-right'>
          {date}
          <span>晴 温度: -2~15</span>
        </div>
      </div>

    </>
  )
}