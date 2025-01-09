import axios from "axios";

function SendMessage(data) {
    return axios.post (`http://${import.meta.env.VITE_IP}:3001/api/GuestBook/AddMessage`, data )

}
function fetchMessagesAPI() {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/GuestBook/GetMessages`)
}

export default SendMessage;
export {fetchMessagesAPI};