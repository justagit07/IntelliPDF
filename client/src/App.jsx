import './App.css';
import Pdfcom from './pd';
import Uploadpdf from './uploadpdf';
import Home from './component/home';
import Navbar from './component/Navbar';
import Register from './component/register/register';
import Pricing from './component/pricing';
import Login from './component/login/login';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
function App() {

  const routes= createBrowserRouter(
     [
      {
        path:'/auth',
        element:<Login/>
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