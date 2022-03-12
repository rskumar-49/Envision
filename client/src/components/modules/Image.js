import React, { useEffect, useState } from "react";
import { get } from "../../utilities";


// Proptypes
// User id: user id tied to images
// Image name: name of the image being looked for
//
// State: base64 string of an image

const Image = (props) => {

  const [image, setImage] = useState("");

  useEffect(() => {
    get("/api/images", { userId: props.userId }).then((images) => {
      if (images.length > 0) {
        setImage(images[0]);
      }
      console.log(images);
    });

  }, [props.userId]);

  return (
    <img src={image.imageString} />
  );
}

export default Image;
