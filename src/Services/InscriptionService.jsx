import axios from "axios";

function InscriptionAPI (data) {
 
    return axios.post ('http://localhost:3001/api/user/CreateUser' , data )
    //   return axios.post ('http://localhost:3001/api/User/CreateUser' , data )
    
}
function UpdateUserAPI (data) {
    return axios.put (`http://localhost:3001/api/user/ModifyUser/${data.IdUser}`, data )
    //   return axios.put (`http://localhost:3001/api/User/${data.id}`, data )
}

function UserInfo (IdUser){
    return axios.get (`http://localhost:3001/api/user/GetUser/${IdUser}`)
    //   return axios.get (`http://localhost:3001/api/User/${id}`)
}

function DeleteUserAPI (IdUser){
    return axios.delete (`http://localhost:3001/api/user/DeleteUser/${IdUser}`)
    //   return axios.delete (`http://localhost:3001/api/User/${id}`)
}

export default {InscriptionAPI, UpdateUserAPI, UserInfo, DeleteUserAPI};