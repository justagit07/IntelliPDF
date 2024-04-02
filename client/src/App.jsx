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
function App() {

  const routes= createBrowserRouter(
     [
      {
        path:'/auth',
        element:<Login/>
      },
      {
        path:'/main',
        element:<Main/>
      },
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/',
        element:<Uploadpdf/>
      },
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:'/show',
        element:<Pdfcom/>
      },
      {
        path:'/home/pricing',
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