import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Layout from './Component/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import Logout from './pages/Logout';
import Register from './pages/Register';
import EditPage from './pages/EditPage';

const router= createBrowserRouter(
 /* createRoutesFromElements(
       <Route path="/" element={<Layout />}>
      
        </Route>
  )*/
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
      {path:"authors",element:<Authors/>},
      {path:"create",element:<CreatePost/>},
      {path:"post/:id/edit",element:<EditPage/>},
      {path:"logout",element:<Logout/>},


    ]
  }]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    
  </React.StrictMode>
);

