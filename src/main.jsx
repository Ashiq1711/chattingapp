import React from 'react'
import ReactDOM from 'react-dom/client'
import firebaseConfig from './firebase.config.js';
import './index.css'
import store from './store.js';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import  Home  from './pages/Home.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  
  </Provider>,

)
