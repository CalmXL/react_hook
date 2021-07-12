import React,{} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {increment, decrement ,incrementByAmount,incrementAsync} from './counterSlice'
import '../css/counter.css'
import { useState } from 'react'

export default function Counter() {

  const count = useSelector((state)=>state.counter.value)
  const dispatch = useDispatch()
  const [incrementAmount,setIncrementAmount] = useState('0')
  

  const addAmount = ()=>{
    dispatch(incrementByAmount(Number(incrementAmount)))
  }

  const addAsync = ()=>{
    dispatch(incrementAsync(Number(incrementAmount)))
  }

  return(
    <div className='counter'>
       <div className='first-row'>
          <button onClick={()=>{dispatch(increment())}}>+</button>
          <span>{count}</span>
          <button onClick={()=>{dispatch(decrement())}}>-</button>
      </div>
      <div className='second-row'>
        <input type="text" className='input' value={incrementAmount} onChange={e =>setIncrementAmount(e.target.value)}/>
        <button onClick={addAmount}>Add Amount</button>
        <button onClick={addAsync}>Add Async</button>
      </div>
    </div>
   
  )
}