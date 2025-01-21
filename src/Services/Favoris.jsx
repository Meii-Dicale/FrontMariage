import axios from "axios";

function FetchFavorisAPI (IdUser) {
return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Favoris//GetUserFavorite/${IdUser}`)
}

function AddFavorisAPI (data) {
return axios.post (`http://${import.meta.env.VITE_IP}:3001/api/Favoris/AddFavorite`, data )
}

function DeleteFavorisAPI (IdFavoris) {
return axios.delete (`http://${import.meta.env.VITE_IP}:3001/api/Favoris/DeleteUserFavorite/${IdFavoris}`)
}
function IsFavorisAPI ( IdUser, IdMedia) {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Favoris/CheckFavorite/${IdUser}/${IdMedia}`)
}

export default {FetchFavorisAPI, AddFavorisAPI, DeleteFavorisAPI, IsFavorisAPI};
