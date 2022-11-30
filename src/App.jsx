import React, { useContext, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import './css/style.css';

// Import pages
import Dashboard from './pages/Dashboard';
import Header from './partials/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/settings/Profile';
import Password from './pages/settings/Password';
import Notification from './pages/settings/Notification';
import Tag from './pages/settings/Tag';
import Zone from './pages/settings/Zone';
import  AuthContext  from "./context/AuthProvider";
import Create from './pages/study/create';
import View from './pages/study/View';
import EventCreate from './pages/study/event/EventCreate';

function App() {
  //const {auth} = useContext(AuthContext);
  const LayOut = () =>{
    return(
      <>
        <Header />
        <Outlet />
      </>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (auth.user == null || auth.user == ''){
      return <Navigate to="/login" />;
    }
    return children;
  };


  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
       // <ProtectedRoute>
          <LayOut />
     //   </ProtectedRoute>
        ),
      children: [
        {
          path:"/",
          element: <Dashboard />
        },
        {
          path:"/settings/profile",
          element: <Profile />
        },
        {
          path:"/settings/password",
          element: <Password />
        },
        {
          path:"/settings/notification",
          element: <Notification />
        },
        {
          path:"/settings/zone",
          element: <Zone />
        },
        {
          path:"/settings/tag",
          element: <Tag />
        },
        {
          path:"/settings/account",
          element: <Profile />
        },
        {
          path:"/study-create",
          element: <Create />
        },
        {
          path:"/study/:path",
          element: <View />
        },
        {
          path:"/event-create/:path",
          element: <EventCreate />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: (<Register />),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
