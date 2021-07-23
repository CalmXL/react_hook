import React,{useEffect,createRef,useState} from 'react'
import { Card, Input, Button, Select, Table, message } from 'antd'
import { reqProductList, reqUpdateStatus, reqSearch } from '../../api'
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveProductList } from '../product/productSlice'
import {PAGE_SIZE} from '../../config'
import './css/product.css'

const { Option } = Select
export default function Product() {

  const history = useHistory()
  const dispatch = useDispatch()
  const searchInputRef = createRef()
  const pageSize = PAGE_SIZE
  // 请求页数
  const [pageNum,setPageNum] = useState(1)
  // 商品列表
  const [productList,setProductList] = useState([])
  // 列表数据总数
  const [total,setTotal] = useState('')
  // 搜索条件
  const [option,setOption] = useState('productName')
  // 是否为搜索
  const [isSearch,setIsSearch] = useState(false)
  // 搜索类型keyWord,默认productName
  const [keyWord,setKeyWord] = useState('')
  
  

  useEffect(()=>{
    getProductList()
    // if(isSearch && option === 'productName') searchByName()
    // if(isSearch && option === 'productDesc') searchByDesc()
  },[pageNum,isSearch])// eslint-disable-line react-hooks/exhaustive-deps

  // ? 请求
  const getProductList = async()=>{
    let result = {}
    console.log('getProductList',keyWord,isSearch)
    // ? 请求产品
    if(!isSearch)  result = await reqProductList(pageNum,pageSize)
    else  result = await reqSearch(option,pageNum,pageSize,keyWord)
    const {status,data,msg} = result
    if(status === 0){
      setProductList(data.list)
      setTotal(data.total)
      dispatch(saveProductList(data.list))
    }else{
      message.error(msg,1)
    }
  }

  const dataSource = productList;
  
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width:'20%'
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      width:'50%'
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '状态',
      key: 'status',
      width:'10%',
      render: (item)=>(
        <div>
          <Button
            danger={item.status === 1 ? false : true}
            type='primary'
            onClick={()=>{handleUpdate(item)}}
          >
            {item.status === 1 ? '上架' : '下架'}
          </Button>
          <p>{item.status === 1 ? '已下架' : '在售'}</p>
        </div>
      )
    },
    {
      title: '操作',
      // dataIndex: 'oper',
      key: 'oper',
      width:'5%',
      render:(item)=>(
        <div>
          <Button type='link' onClick={()=>{history.push(`/admin/prod_about/product/details/${item._id}`)}}>详情</Button>
          <Button type='link' onClick={()=>{history.push(`/admin/prod_about/product/addupdate/${item._id}`)}}>修改</Button>
        </div>
      )
    },
  ];

  // ? 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
  const tableChange = (page)=>{
    setPageNum(page.current)
  }
  // ? 点击下架，更新状态
  const handleUpdate = async(item)=>{
    const {_id} = item
    console.log(item.status)
    item.status === 1 ? item.status = 2 : item.status = 1
    updateStatus(_id,item.status)
  }
  // ? 状态更新
  const updateStatus = async(categoryId,prodStatus)=>{
    let result = await reqUpdateStatus(categoryId,prodStatus)
    const {status,msg} = result
    if(status === 0){
      message.success('更新状态成功',1)
      // 刷新页面
      getProductList()
    }else{
      message.error(msg,1)
    }
  }

  // ? Select变化回调
  const selectChange = (value)=>{
    setOption(value)
  }

  // ? 搜索
  const search = ()=>{
    console.log('search--')
    let searchContent = searchInputRef.current.state.value; 
    if(option === 'productName') setOption('productName')
    if(option === 'productDesc') setOption('productDesc')
    setKeyWord(searchContent)
    if(searchContent === '') setIsSearch(false)
    else setIsSearch(true)
  }

  // ? 添加商品
  const addProduct = ()=>{
  
  }



  // ? 搜索
   /*  const search = ()=>{
     
      console.log('click search')
      // ? 根据条件判断用哪个请求
      if(option === 'productName'){
        searchByName()
      }
      if(option === 'productDesc'){
        searchByDesc()
      }
    } */

  // ? 按名称搜索
 /*  const searchByName = async()=>{
    // ? 获取输入框内容
    const searchContent = searchInputRef.current.state.value;
    let result = await reqNameSearch(searchContent,pageNum,pageSize)
    const {status,data,msg} = result
    if(status === 0){
      console.log('ByName搜索成功')
      const {total,list} = data
      setTotal(total)
      setProductList(list)
      setIsSearch(true);
    }else{
      console.log(msg)
    }
  } */

  // ? 按描述搜索
  /* const searchByDesc = async()=>{
    // ? 获取输入框内容
    const searchContent = searchInputRef.current.state.value;
    let result = await reqDescSearch(searchContent,pageNum,pageSize)
    const {status,data,msg} = result
    if(status === 0){
      console.log('ByDesc搜索成功')
      const {total,list} = data
      setTotal(total)
      setProductList(list)
      setIsSearch(true)
    }else{
      console.log(msg)
    }
  } */

  return(
    <>
      <Card
        title={
          <div className='title'>
            <Select defaultValue="productName" onChange={selectChange}>
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input placeholder='关键字' style={{width:150,margin:'0 10px 0 10px'}} ref={searchInputRef}/>
            <Button type='primary' onClick={search}>搜索</Button>
          </div>
        }
        extra={
          <Button type='primary' onClick={addProduct}>
            添加商品
          </Button>
        }
      >
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          rowKey='_id'
          bordered
          pagination={{
            pageSize:PAGE_SIZE,
            showQuickJumper:true,
            total:total
          }}
          onChange={tableChange}
        />
      </Card>
    </>
  )
}