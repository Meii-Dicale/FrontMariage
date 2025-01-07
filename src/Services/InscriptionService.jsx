import axios from "axios";

function InscriptionAPI (data) {
 
    return axios.post ('http://localhost:3001/api/User/CreateUser' , data )
}

export default InscriptionAPI;