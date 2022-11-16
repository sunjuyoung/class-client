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
import  AuthContext  from "./context/AuthProvider";

function App() {

  const {auth} = useContext(AuthContext);
  console.log(auth.user);
  const LayOut = () =>{
    return(
      <>
        <Header />
        <Outlet />
      </>
    )
  }

  useEffect(()=>{

  },[auth]);
  const ProtectedRoute = ({ children }) => {
    if (auth.user == null){
      return <Navigate to="/login" />;
    }
    return children;
  };

  const ProtectedSignUp = ({ children }) => {
    if (auth.user != null){
      return <Navigate to="/" />;
    }
    return children;
  };
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <LayOut />
        </ProtectedRoute>
        ),
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
