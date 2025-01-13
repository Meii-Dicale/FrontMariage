import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../Composant/Navbar';
import Inscription from '../Pages/Inscription';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MonCompte from '../Pages/MonCompte';
import AuthServices from './Services/AuthServices';
import Authcontext from './Context/Authcontext';
import HomePage from '../Pages/HomePage';
import BackgroundVideo from '../Composant/BackGroundVideo';
import Footer from '../Composant/Footer';
import GuestBook from '../Pages/GuestBook';
import AjoutPhoto from '../Pages/AjouterPhoto'; 
import PhotoInvite from '../Pages/InvitePhotos';
import PhotographePage from '../Pages/PhotographePage';
import PhotoBooth from '../Pages/Photobooth';
import SecretPage from '../Pages/SecretPage';
import ResetPassword from '../Pages/ResetPassword';
import MdpOublie from '../Pages/MDPoublie';
import PhotoUser from '../Pages/PhotoUser';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
   AuthServices.isValid()
   );
 const [user, setUser] = useState(AuthServices.getUser());

 useEffect(() => {
  const token = localStorage.getItem('token');

  if (token) {
    setIsAuthenticated(true);
    const readToken = AuthServices.getUser();
    if (readToken) {
      setUser(readToken);
    }
    
  }
}, [isAuthenticated]);

useEffect(() => {
  const interval = setInterval(() => {
    const isValid = AuthServices.isValid();
    if (!isValid) {
      AuthServices.logout();
    }
  }, 1800000);
  return () => clearInterval(interval);
}, []);
  return(
    <>
    <div className='App'>
    <BackgroundVideo/>
    
    <Authcontext.Provider
    value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
  > 
    <BrowserRouter>
    <NavBar></NavBar>
      <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/Inscription' element={<Inscription/>}></Route>
      <Route path='/MonCompte' element={<MonCompte/>}></Route>
      <Route path='/LivreDor' element={<GuestBook/>}></Route>
      <Route path='/AjoutPhoto' element={<AjoutPhoto/>}></Route>
      <Route path='/InvitePhotos' element={<PhotoInvite/>}></Route>
      <Route path='/Photographe' element={<PhotographePage/>}></Route>
      <Route path='/PhotoBooth' element={<PhotoBooth/>}></Route>
      <Route path='/secretPage' element={<SecretPage/>}></Route>
      <Route path='/reset-password/:token' element={<ResetPassword/>}></Route>
      <Route path='/mdpOublie' element={<MdpOublie/>}></Route>
      <Route path='/photo/:IdUser' element={<PhotoUser/>}></Route>
      </Routes>
    </BrowserRouter>
    </Authcontext.Provider>
    
    <Footer></Footer>
    </div>
    </> 
    )

}

export default App
