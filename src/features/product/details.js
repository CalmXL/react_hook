/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useEffect,useState} from 'react'
import {Card, Button, List, message} from 'antd'
import { ArrowLeftOutlined} from '@ant-design/icons'
import {useHistory,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { reqGetProductById, reqGetCategoryById} from '../../api'
import './css/details.css'


const {Item} = List

export default function Details() {
  
  const history = useHistory() 
  const location = useLocation()
  const {productList} =  useSelector(state=>state.product)// ? redux 商品列表
  const {categoryList} = useSelector(state=>state.category)// ? redux 分类列表
  // ? 商品详情
  const [prodDetail,setProdDetail] = useState({
    desc:'',
    price:'',
    detail:'',
    name:'',
    imgs:[]
  })
  // ? 商品分类
  const [prodCategory,setProdCategory] = useState('')
  const {desc,price,detail,name,imgs} = prodDetail

  useEffect(()=>{
    // 获取对应ID的商品对象
    getProductById()
  },[])

  // 通过 id 遍历查询商品列表
  const getProductById = async()=>{
    // 首先确定redux是否存在produlist
    let product // ? 用来存储商品信息
    let id = location.pathname.split('/').reverse()[0]
    if(productList.length !== 0){
      product = productList.find((item)=>{
        return id === item._id
      })
    }else{ // ? 发请求
      product = await getProduct(id)
    }
    setProdDetail(product)
    getCategoryByCategoryId(product.categoryId)
  }

  // 通过分类id 遍历查询分类列表
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
    setProdCategory(category.name)
  }
  
  // redux中没有，根据id发送请求获取分类
  const getCategoryName = async(id)=>{
    let result = await reqGetCategoryById(id)
    const {status,data,msg} = result
    if(status === 0){
      return data
    }else{
      message.error(msg,1)
    }
  }

  // redux中没有，根据id发送请求获取商品
  const getProduct = async(id)=>{
    let result = await reqGetProductById(id)
      const {status,data,msg} = result
      if(status === 0){
        return data
      }else{
        message.error(msg,1)
      }
  }


  return(
    <>
      <Card
        title={
          <>
            <Button type='link' onClick={()=>{history.goBack()}}>
              <ArrowLeftOutlined />
            </Button>
            商品详情
          </>
        }
      >
        <List className='list'>
          <Item className='list-item'>
            <span className='list-item-title'>商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item className='list-item'>
            <span className='list-item-title'>商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item className='list-item'>
            <span className='list-item-title'>商品价格:</span>
            <span>{price}</span>
          </Item>
          <Item className='list-item'>
            <span className='list-item-title'>所属分类:</span>
            <span>
              {prodCategory}
            </span>
          </Item>
          <Item className='list-item'>
            <span className='list-item-title'>商品图片:</span>
            <span>
              {
                imgs.map((item,index)=>{
                  return <img key={index} src={'/upload/' + item} alt='商品图片'/> 
                }) 
              }
            </span>
          </Item>
          <Item className='list-item'>
            <span className='list-item-title'>商品详情:</span>
            <span className='list-item-detail' dangerouslySetInnerHTML={{__html:detail}}></span>
          </Item>
        </List>
      </Card>
    </>
  )
}

