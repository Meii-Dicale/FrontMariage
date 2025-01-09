import { useEffect, useState } from "react"
import { GetPublicPhotosAPI } from "../src/Services/UploadPhotosService";
import { Container } from "react-bootstrap";

const PhotoInvite = () => {
    const [AllPhotos, setAllPhotos] = useState([])

    const fetchAllPhoto = async () => {
        try {
            const response = await GetPublicPhotosAPI();
            setAllPhotos(response.data || []);
            console.log(response.data);
        } catch (error) {
            
        }
    }
    useEffect(() => {
        fetchAllPhoto()
    }, [])
    return(
        <>
        <Container className="container-invite">
        {AllPhotos.map((photo)=> 
    (
        <img className="galeriePhotoInvite col-4" key={photo.IdMedia} src={`http://${import.meta.env.VITE_IP}:3001/api/Media/${photo.PathMedia}`}alt="" />
    ))}
    </Container>
        </>
    )
}
export default PhotoInvite