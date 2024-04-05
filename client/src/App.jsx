import './App.css';
import Uploadpdf from './uploadpdf';
import Home from './component/home';
import Navbar from './component/Navbar';
import Main from './component/main/Main.jsx';
import Register from './component/register/register';
import Pricing from './component/pricing';
import Dashboard from './component/dashboard/dashboard';
import Login from './component/login/login';
import Pdfcom from './component/pdfrending/pd.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { useSelector} from 'react-redux';
import Subsciption from './component/Subscription/subsciption.jsx';
function App() {
  
   const isauth= Boolean(useSelector(state=> state.accessToken))
   console.log('this is the isauth', isauth)

  const routes= createBrowserRouter(
     [
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/sucess/:id',
        element:<Subsciption/>
      },
      {
        path:'/dashboard',
        element:isauth?<Dashboard/>:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/main',
        element:<Main/>
      },
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/show',
        element:isauth?<Pdfcom/>:<Login/>
      },
      {
        path:'/home/pricing/:id',
        element:<Pricing/>
      }
     ]
  )
  
  return (
    <>
 <RouterProvider router={routes}>
    </RouterProvider>
    </>

  );
}

export default App;