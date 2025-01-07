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
      </Routes>
    </BrowserRouter>
    </Authcontext.Provider>
    
    </> 
    )

}

export default App
