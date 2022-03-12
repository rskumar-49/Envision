import React from "react"
import ImageUploader from "../modules/ImageUploader";
import Image from "../modules/Image";

const UMisc = (props) => {
    return props.universe ? (
        <div>
            <h1>Miscellaneous. Add aspects of the universe that do not fall under the other categories.</h1>
            {/* <ImageUploader userId={props.userId}></ImageUploader>
            <Image imageId="61ee23940cbc493928d5f6c8" userId={props.userId} /> */}
        </div>
    ) : (<h1>Please select a universe in the dashboard!</h1>)
}

export default UMisc; 