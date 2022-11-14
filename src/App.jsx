import React, { useContext, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  
} from 'react-router-dom';

import './css/style.css';


// Import pages
import Dashboard from './pages/Dashboard';
import Header from './partials/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/settings/Profile';

const LayOut = () =>{
  return(
    <>
      <Header />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path:"/",
        element: <Dashboard />
      },
      {
        path:"/settings",
        element: <Profile />
      },

    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {

  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, []);


  return (
    <>

      <RouterProvider router={router} />

    </>
  );
}

export default App;
