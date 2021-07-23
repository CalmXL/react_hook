import React,{createRef} from 'react'
import { useEffect,useState} from 'react'
import { Button, Table,Card,Modal,Input, message } from 'antd'
import { reqCategory, reqAddCategory, reqUpdateCategory } from '../../api'
import {PAGE_SIZE} from '../../config'
import { useDispatch } from 'react-redux'
import { saveCategoryList } from './categorySlice'

export default function Category() {

  const dispatch = useDispatch()
  const AddRef = createRef()
  const UpdateRef = createRef()
  const [categoryList,setCategoryList] = useState([])
  const [isAddModalVisible,setIsAddModalVisible] = useState(false)
  const [isUpdateModalVisible,setIsUpdateModalVisible] = useState(false)
  const [categoryId,setCategoryId] = useState('')
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    console.log('请求列表')
    getCategoryList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // 获取分类数据
  const getCategoryList = async()=>{
    let result = await reqCategory()
    const {status,data,msg} = result
    if(status === 0){
      message.success('获取分类成功')
      // 更新列表
      setCategoryList(data)
      // 更改加载状态
      setIsLoading(false)
      // 保存到redux-store
      dispatch(saveCategoryList(data))
    }else{
      message.error(msg,1)
    }
    
  }
  // ? 表格数据
  const dataSource = categoryList;
  // ? 列描述数据对象，是 columns 中的一项，Column 使用相同的 API。
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      width:'70%'
    },
    {
      title: '操作',
      // dataIndex: 'oper',
      key: 'age',
      render: (item)=> (
        <Button 
          type='link'
          onClick={()=>{updateCategory(item)}}
        >
          修改分类  
        </Button>
      )
    },
    
  ];
  // ? 添加分类
  const addCategory = ()=>{
    setIsAddModalVisible(true)
  }
  // ? 确认添加
  const handleAddOk = async()=>{
    // ? 获取input输入的分类名字
    let categoryName = AddRef.current.state.value
    // ? 发送添加分类请求
    let result = await reqAddCategory(categoryName)
    const {status,msg} = result
    if(status === 0){
      message.success('添加分类成功')
      // ? 隐藏卡片
      setIsAddModalVisible(false)
      // ? 刷新页面
      getCategoryList()
      // ? 清空输入
      AddRef.current.state.value=''

    }else{
      message.error(msg,1)
    }
  }
  // ? 取消添加
  const handleAddCancel = ()=>{
    setIsAddModalVisible(false)
     // ? 清空输入
    AddRef.current.state.value=''
  }

  // ? 更新分类
  const updateCategory = (item)=>{
    setIsUpdateModalVisible(true)
    const {_id} = item
    setCategoryId(_id)
  }
  // ? 确认修改
  const handleUpdateOk = async()=>{
    // ? 获取修改的分类名字
    let categoryName = UpdateRef.current.state.value
    // ? 发起更新请求
    const result = await reqUpdateCategory(categoryId,categoryName)
    const {status,msg} = result
    if(status === 0){
      message.success('修改分类成功')
      setIsUpdateModalVisible(false)
      // ? 刷新分类
      getCategoryList()
      // ? 清空输入
      UpdateRef.current.state.value = ''
    }else{
      message.error(msg,1)
    }
  }
  // ? 取消修改
  const handleUpdateCancel = ()=>{
    setIsUpdateModalVisible(false)
     // ? 清空输入
     UpdateRef.current.state.value = ''
  }

  return(
    <>
      <Card 
        extra={
          <Button 
            type='primary' 
            onClick={addCategory}
          >
            添加分类
          </Button>
        } 
        style={{ width: '100%' }}
      >
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          rowKey='_id'
          pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
          bordered
          loading={isLoading}
        />;
      </Card>
      <Modal 
        title="添加分类" 
        visible={isAddModalVisible} 
        onOk={handleAddOk} 
        onCancel={handleAddCancel}
        okText='确认'
        cancelText='取消'
      >
        <Input placeholder='请输入你要添加的分类' ref={AddRef}/>
      </Modal>
      <Modal 
        title="更新分类" 
        visible={isUpdateModalVisible} 
        onOk={handleUpdateOk} 
        onCancel={handleUpdateCancel}
        okText='确认'
        cancelText='取消'
      >
        <Input placeholder='请输入你要修改的分类名字' ref={UpdateRef}/>
      </Modal>
    </>
  )
}