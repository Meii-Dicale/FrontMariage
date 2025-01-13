import axios from "axios";

function InscriptionAPI (data) {
 
    return axios.post (`http://${import.meta.env.VITE_IP}:3001/api/user/CreateUser` , data )
    
}
function UpdateUserAPI (data) {
    return axios.put (`http://${import.meta.env.VITE_IP}:3001/api/user/ModifyUser/${data.IdUser}`, data )
}

function UserInfo (IdUser){
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/user/GetUser/${IdUser}`)
}

function DeleteUserAPI (IdUser){
    return axios.delete (`http://${import.meta.env.VITE_IP}:3001/api/user/DeleteUser/${IdUser}`)
}


export default {InscriptionAPI, UpdateUserAPI, UserInfo, DeleteUserAPI};