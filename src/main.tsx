import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import App from './App.tsx'
import ProductList from './components/ProductList.tsx';
import Product from './components/Product.tsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <ProductList/>
      }
    ]
  },
  {
    path: "/create",
    element: <App/>,
    children: [
      {
        path: "/create",
        element: <Product/>
      }
    ]
  },
  {
    path: "/update/:id",
    element: <App/>,
    children: [
      {
        path: "/update/:id",
        element: <Product/>
      }      
    ]    
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
