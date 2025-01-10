import axios from "axios";

function UploadPhotoAPI (data)  {
    return axios.post (`http://${import.meta.env.VITE_IP}:3001/api/Media/upload` , data )

}
function GetPublicPhotosAPI () {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Media/PhotoPublique`)
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

export default UploadPhotoAPI;
export {GetPublicPhotosAPI, GetMesPhotosAPI, DeletePhotoAPI, GetPhotosAdminAPI, GetPrivatePhotoAPI};