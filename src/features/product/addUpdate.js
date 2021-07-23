import React,{ useEffect,useState} from 'react'
import {Button,Form,Input,Card,message} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { reqGetProductById,reqGetCategoryById} from '../../api'
import './css/addUpdate.css'

const {Item} = Form

export default function Addupdate() {

  const history = useHistory()
  const location = useLocation()
  // ? 从store中取得categoryList和productList
  const {productList} = useSelector(state => state.product)
  const {categoryList} = useSelector(state => state.category)
  // ? 设置操作形式
  const [operType,setOperType] = useState('add') 
  // ? 得到id
  const id = location.pathname.split('/').reverse()[0]
  // ? 存储商品信息
  const [productMessage,setProductMessage] = useState({})
  // ? 分类信息
  const [prodCategory,setProdCategory] = useState('')

  const {desc,price,detail,name,imgs} = productMessage

  useEffect(()=>{
    // ? 如果有id那么就是更改，获取商品信息
    if(id){
      setOperType('update')
      getProductMes()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // ? 获取商品信息
  const getProductMes = ()=>{
    console.log('-----getProduct---')
    let productMes
    // ? 首先判断redux中是否存在 productList， 否则发送请求获取
    if(productList.length === 0){
      // ? 根据id发送请求获取商品信息
      productMes = getProductName()
    }else{
      // ? 遍历商品列表获得商品信息
      productMes = productList.find((item)=>{
        return id === item._id
      })
    }
    setProductMessage(productMes)
    getCategoryByCategoryId(productMes.categoryId)
  }
  // ? 获取分类
  const getCategoryByCategoryId = async(id)=>{
    // 判断redux中是否存在categorylist
    let category
    if(categoryList.length !== 0){ // ? 从redux中查询
      category = categoryList.find((item)=>{
        return id === item._id
      })
    }else{// ? 发请求获取分类 通过id
      category = await getCategoryName(id)
    }
    console.log(category)
    // setProdCategory(category.name)
  }
  // ? 发请求获取分类信息
  const getCategoryName = async(id)=>{
    
    let result = await reqGetCategoryById(id)
    const {status,data,msg} = result
    if(status === 0){
      message.success('请求分类成功')
      return data
    }else{
      message.error(msg,1)
    }
  }
  // ? 请求获取商品
  const getProductName = async()=>{
    let result = await reqGetProductById(id)
    const {status,data,msg} = result
    if(status === 0){
      message.success('请求商品成功')
      return data
    }else{
      message.error(msg,1)
    }
  }

  return(
    <Card
      title={
        <>
            <Button type='link' onClick={()=>{history.goBack()}}>
              <ArrowLeftOutlined />
            </Button>
            商品修改
          </>
      }
    >
      <Form className='form'>
        <Item
          className='form-item'
          name='producrName'
          label='商品名称'
          initialValue={name}
        >
          
          <Input />
        </Item>
        <Item
        className='form-item'
          name='producrDesc'
          label='商品描述'
          initialValue={operType==='add' ? '' : desc}
        >
          
          <Input />
        </Item>
        <Item
          className='form-item'
          name='producrPrice'
          label='商品价格'
          initialValue={operType==='add' ? '' : price}
        >
          
          <Input />
        </Item>
        <Item
          className='form-item'
          name='producrCategory'
          label='商品分类'
        >
          
          <Input />
        </Item>
        <Item>
          商品图片
        </Item>
        <Item>
          商品详情
        </Item>

      </Form>
    </Card>
  )
}