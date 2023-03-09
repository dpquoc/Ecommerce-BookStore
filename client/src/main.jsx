import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalCSS from './components/css'
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalCSS>
      <App />
    </GlobalCSS>
  </React.StrictMode>,
)
