import axios from "axios";

function ConnexionAPI (data) {
    return axios.post (`http://${import.meta.env.VITE_IP}:3001/api/User/Login`, data )
    //   return axios.post ('http://localhost:3001/api/User/Login', data )
}

export default ConnexionAPI;