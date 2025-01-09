import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
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
  }, 60000);
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
      </Routes>
    </BrowserRouter>
    </Authcontext.Provider>
    
    <Footer></Footer>
    </div>
    </> 
    )

}

export default App
