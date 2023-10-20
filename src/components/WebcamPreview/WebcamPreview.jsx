import axios from "axios";

export default function WebcamPreview({ url, fetchImages}) {
    console.log("url:", url)
    const saveImage = (url) => {
        console.log('new image in webcampreview', url)
        const photoUrl = {url: url}
        axios
          .post('/api/profile/webcam', photoUrl)
          .then((response) => {
            fetchImages();
          })
          .catch((error) => {
            console.log('Error adding webcam image', error);
          });
      }

    return url ? (
        <div className="img_box">
            <img src={url} alt="my_image" />
            <button className="close_btn" onClick={() => saveImage(url)}>
                Save
            </button>
        </div>
    ) : null;
}