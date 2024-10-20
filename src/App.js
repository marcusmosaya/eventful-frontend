import logo from './logo.svg';
import './bootstrap/css/bootstrap.css';
import './App.css';
import GalleryPage from './pages/gallery';
import EditPage from './pages/EditPage';
import React, { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CameraCapture from './pages/CameraCapture';
import CameraCapture2 from './pages/CameraCapture2';
import Register from './pages/Register';
import Login from './pages/Login';
import EventRegister from './pages/EventRegister';
import EventDashboard from './pages/EventDashboard';
import Event from './pages/Event';
import EventChanges from './pages/eventChanges';
import Qredirect from './pages/Qredirect';
import ConfirmVisitor from './pages/confirmVisitor';
import AddVisitorsManually from './pages/addVisitorsManually';
import CapturedPhotos from './pages/PhotosCaptured';
import Checkout from './pages/Checkout';

function App() {
  const [photos,setPhotos]=useState([]);
  return (
    <>
     <BrowserRouter>
        <Routes>
            <Route path="/" Component={Login}/>
            <Route path="/photos/:photoId" Component={EditPage}/>
            <Route path='/camera'  element={<CameraCapture2 setPhotos={setPhotos} photos={photos} />} />
            <Route path='/auth/register' Component={Register} />
            <Route path='/auth/login' Component={Login} />
            <Route path='/event/register' Component={EventRegister} />
            <Route path='/event/dashboard' Component={EventDashboard} />
            <Route path='/event/:eventId' Component={Event} />
            <Route path='/event/:eventId/change' Component={EventChanges} />
            <Route path='/event/qr/:eventId' Component={Qredirect} />
            <Route path='/event/confirmation' Component={ConfirmVisitor} />
            <Route path='/photos' Component={GalleryPage} />
            <Route path='/event/:eventId/addVisitor' Component={AddVisitorsManually} />
            <Route path='/photos/select' element={<CapturedPhotos setPhotos={setPhotos} photos={photos} />} />
            <Route path='/checkout' Component={Checkout} />
          </Routes> 
     </BrowserRouter>
    </>

  );
}

export default App;
