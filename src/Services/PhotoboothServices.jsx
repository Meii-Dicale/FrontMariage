import axios from "axios";

function GetAllPhotoboothAPI() {
  const url = `/mediacollection/getitems`;
  return axios.get(url);
}

export default GetAllPhotoboothAPI;
