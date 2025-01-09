import axios from "axios";

function UploadPhotoAPI (data)  {
    return axios.post (`http://${import.meta.env.VITE_IP}:3001/api/Media/upload` , data )

}
function GetPublicPhotosAPI () {
    return axios.get (`http://${import.meta.env.VITE_IP}:3001/api/Media/PhotoPublique`)
}

export default UploadPhotoAPI;
export {GetPublicPhotosAPI};