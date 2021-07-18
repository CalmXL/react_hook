import React,{} from 'react'
import { Route,Switch} from 'react-router-dom'
import Admin from './features/admin/admin'
import Login from './features/login/login'

export default function App() {
  return(
    <div className='app'>
      <Switch>
        <Route path='/admin' component={Admin}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </div>
  )
}
