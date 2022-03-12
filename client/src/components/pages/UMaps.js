import React, { useEffect, useState } from "react";
import "./UMaps.css";
import "./Dashboard.css";
import { get, post } from "../../utilities.js";
import MapCanvas from "../modules/MapCanvas.js";
import MapSidebar from "../modules/MapSidebar.js";
import ImageUploader from "../modules/ImageUploader";

// props: userId
const UMaps = (props) => {
    const [image, setImage] = useState();
    const [sites, setSites] = useState([]);
    // console.log("umaps rerendered")
    useEffect(() => {
        if (props.universe) {
            get("/api/mapImage", {
                userId: props.userId,
                universeId: props.universe._id,
            }).then((images) => {
                if (images) {
                    setImage(images[0])
                }
            });
            get("/api/names", {
                userId: props.userId,
                type: "Site",
                universeId: props.universe._id,
            }).then((apiSites) => { setSites(apiSites) });
        };
    }, [props.userId]);

    let toReturn;
    if (props.universe) {
        const postParams = { userId: props.userId, universeId: props.universe._id }
        toReturn = (
            <>
                {image ? (
                    <>
                        {/* <h3>Maps! (hold shift to view pins)</h3> */}
                        <MapCanvas userId={props.userId} universe={props.universe} image={image} sites={sites} />
                    </>

                ) : (<h1>Upload a Map image!</h1>)}
                <ImageUploader postEndpoint="/api/mapImage" postParams={postParams} handleInput={setImage} />
                <div className="Attribution-link-container">
                    <h4 className="Attribution-item">Image attributions: </h4>
                    <a className="Attribution-link Attribution-item" href="https://www.flaticon.com/free-icons/mouse-clicker" title="mouse clicker icons">Mouse clicker icons created by Freepik - Flaticon</a>
                </div>
            </>
        )
    } else {
        toReturn = (<h1>Please select a universe in the dashboard!</h1>)
    }

    return toReturn
}

export default UMaps; 
