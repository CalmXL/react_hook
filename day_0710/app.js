import React,{} from 'react'
import { Route,Switch} from 'react-router-dom'
import Admin from './components/admin/admin'
import Login from './components/login/login'

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
