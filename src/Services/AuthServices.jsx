import axios from 'axios';
import { jwtDecode } from "jwt-decode";



function setAxiosToken() {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
}

const decodeToken = (token) => {
  try {
    return jwtDecode(token); // Décodage du token
  } catch (err) {
    console.error(err);
    throw new Error('Invalid token'); // Si le token est invalide, on lève une erreur
  }
};

function getUser() {
  const token = localStorage.getItem('token');
  if (token && isValid()) {
    const decodedToken = jwtDecode(token);
    return {
      NameUser: decodedToken.NameUser,
      RelationUser: decodedToken.RelationUser,
      RoleUser: decodedToken.RoleUser,
      IdUser: decodedToken.IdUser,
      MailUser: decodedToken.MailUser,
      TelUser: decodedToken.TelUser
    };
  } else {
    return {};
  }
}

function logout() {
  delete axios.defaults.headers['Authorization'];
  localStorage.removeItem('token');
  isTokenValidCache = null;
  console.log('Logged out successfully');

  // Redirection au lieu de recharger
  window.location.href = '/'; 
}

let isTokenValidCache = null;

function isValid() {
  if (isTokenValidCache !== null) {
    return isTokenValidCache;
  }
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < new Date().getTime();
    if (isExpired) {
      // Empêcher une déconnexion répétée
      if (!localStorage.getItem('loggedOut')) {
        logout();
      }
      isTokenValidCache = false;
      return false;
    } else {
      setAxiosToken();
      isTokenValidCache = true;
      return true;
    }
  } else {
    // Empêcher une déconnexion répétée
    return null;
  }
}

export default {  decodeToken, logout, isValid, getUser };