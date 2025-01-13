import axios from "axios";


function AjouterCommentaireAPI(data) {
    return axios.post(`http://${import.meta.env.VITE_IP}:3001/api/Commentaire/AddComment`, data )

}

function GetCommentaireAPI(IdMedia) {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Commentaire/GetComment/${IdMedia}`)
}

function DeleteCommentaireAPI(IdComment) {
    return axios.delete (`http://${import.meta.env.VITE_IP}:3001/api/Commentaire/DeleteComment/${IdComment}`)
}

export default AjouterCommentaireAPI;
export {GetCommentaireAPI, DeleteCommentaireAPI};