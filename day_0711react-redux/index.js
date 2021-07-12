import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
/* 
  创建商店后,我们通过<Prodiver>在应用程序周围放置
  一个 React Redux 使其可用于 我们的React组件
*/