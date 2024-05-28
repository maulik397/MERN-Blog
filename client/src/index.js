import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Layout from './Component/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import CreatePost from './pages/CreatePost';
import Logout from './pages/Logout';
import Register from './pages/Register';
import EditPage from './pages/EditPage';
import { UserContextProvider } from './Component/UserContext';

const router= createBrowserRouter(

  [{
    path:'/',
    element:<Layout/>,
    errorElement:<ErrorPage/>,
    children:[
      {index:true ,element:<Home/> },
      {path:"post/:id" ,element:<PostDetail/> },
      {path:"register",element:<Register/>},
      {path:"login",element:<Login/>},
      {path:"profile",element:<UserProfile/>},
     
      {path:"create",element:<CreatePost/>},
      {path:"logout",element:<Logout/>},
      {path:"/edit/:id", element:<EditPage/>}

    ]
  }]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <UserContextProvider>
    <RouterProvider router={router}/>
    </UserContextProvider>
  </React.StrictMode>
);

