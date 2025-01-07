import axios from "axios";

function ConnexionAPI (data) {
    return axios.post ('http://192.168.1.122:3001/api/User/Login', data )
    //   return axios.post ('http://localhost:3001/api/User/Login', data )
}

export default ConnexionAPI;