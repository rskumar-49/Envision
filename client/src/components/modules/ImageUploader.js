import React, { useState } from "react";

import { post } from "../../utilities"

// props:
// origin point: the page where the uploader is currently being displayed on
const ImageUploader = (props) => {

  const [postImage, setPostImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const createPost = async (postImage) => {
    try {
      setImageLoading(true);
      post(props.postEndpoint, { ...props.postParams, imageString: postImage })
        .then((image) => {
          let newImage = { ...image };
          props.handleInput(newImage);
          setImageLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    setPostImage("");
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    convertToBase64(file).then((base64) => { setPostImage(base64) }).catch(() => {
      alert("Your image could not be processed. Please try again (Image cannot be too large!)"
      )
    }
    )
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
        {imageLoading ? (<></>) : (<button>Submit</button>)}
      </form>
    </div>
  );

}
export default ImageUploader;