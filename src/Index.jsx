import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Style.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Start from  './Start.jsx'
import AiResponse from './AiResponse.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      { path:'/', element: <Start/>},
      { path:'response', element: <AiResponse/> },
    ],
    
  }]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
)
