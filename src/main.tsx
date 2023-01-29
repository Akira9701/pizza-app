import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './app/App'
import 'tw-elements';
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store/index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>


  </>
)
