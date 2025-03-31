import axios from "axios";

function UploadPhotoAPI (data)  {
    return axios.post (`http://${import.meta.env.VITE_IP}:3001/api/Media/upload` , data )

}
function GetPublicPhotosAPI () {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Media/PhotoPublique`)
}
function GetAllPublicPhotosAPI () {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Media/PhotoAllPublique`)
}

function GetMesPhotosAPI (IdUser) {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Media/UserPhoto/${IdUser}`)
}

function DeletePhotoAPI (IdMedia) {
    return axios.delete (`http://${import.meta.env.VITE_IP}:3001/api/Media/DeletePhoto/${IdMedia}`)
}
function GetPhotosAdminAPI () {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Media/PhotoAdmin`)
}

function GetPrivatePhotoAPI(){
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Media/PhotoPrivee`)
}

function GetPhotoByUserAPI(IdUser) {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Media/UserPhoto/${IdUser}`)
}
function PushPrivateAPI(IdMedia){
    return axios.put(`http://${import.meta.env.VITE_IP}:3001/api/Media/PushPrivate/${IdMedia}`)
}
function PushPublicAPI(IdMedia){
    return axios.put(`http://${import.meta.env.VITE_IP}:3001/api/Media/PushPublic/${IdMedia}`)
}
function GetFavorisAPI(IdUser){
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Favoris/GetUserFavorite/${IdUser}`)
}

export default UploadPhotoAPI;
export {GetFavorisAPI, GetPublicPhotosAPI,GetAllPublicPhotosAPI, GetMesPhotosAPI, DeletePhotoAPI, GetPhotosAdminAPI, GetPrivatePhotoAPI, GetPhotoByUserAPI, PushPrivateAPI, PushPublicAPI};