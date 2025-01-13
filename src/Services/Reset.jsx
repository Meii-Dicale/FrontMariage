import axios from "axios";

function ResetPasswordAPI (data){
    return axios.put(`http://${import.meta.env.VITE_IP}:3001/api/user/ResetPassword/${data.token}`, data )
    
}
 
function SendMailAPI (data) {
    return axios.post(`http://${import.meta.env.VITE_IP}:3001/api/user/SendMail`, data )
    
}

export default ResetPasswordAPI;
export {SendMailAPI};