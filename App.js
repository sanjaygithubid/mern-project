// this is main file , here we import all component with router for app.js file.
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { HomePageVideo } from './components/homepage-video';
import {AdminLogin} from './components/admin-login';
import {UserLogin} from './components/user-login';
import {AdminDashboardPage} from './components/admin-dashboard';
import {AdminAddVideoDashboard} from './components/admin-add-video-dashboard';
import {AdminEditVideo} from './components/admin-edit-video'
import { AdminDeleteVideo } from './components/admin-delete-video';
import {UserRegister} from './components/user-register';
import {UserDashboard} from './components/user-dashboard';



export default function App() {
  return (
    <div className="body-background">
     <div className='bg-shade'>
        <h1 className='text-center text-white pt-3'>Technologies Video Library</h1>
        {/* This package provides the necessary components and hooks for handling routing in a React application. */}
        <BrowserRouter>

              <Routes>

                    <Route  path='/' element={<HomePageVideo />}  />

                    <Route path='admin-login' element={<AdminLogin/>}/>


                    <Route path='/admin-dashboard' element={<AdminDashboardPage/>}/>

                    <Route  path='/add-video' element={<AdminAddVideoDashboard/>}/>

                    {/* for your understand and to access this router-API is we own created for <AdminEditVideo/>  component */}

                    <Route path='/edit-video/:id' element={<AdminEditVideo/>}/>

                    <Route path='/delete-video/:id' element = {<AdminDeleteVideo/>}/>

                    <Route path='/user-login' element={<UserLogin/>} />

                    <Route path='/user-register' element={<UserRegister/>}/>


                    <Route path='/user-dashboard' element={<UserDashboard/>}/>

              </Routes>

        </BrowserRouter>
     </div>
    </div>
  );
}

 
