import React, { useEffect, useState } from "react";
import "./MapCanvas.css"
import { get, post } from "../../utilities.js";

const MapSidebar = (props) => {
    const [site, setSite] = useState();
    const [siteDescription, setSiteDescription] = useState();

    let siteIdtoObj = {};
    for (const siteObj of props.sites) {
        siteIdtoObj[siteObj._id] = siteObj;
    }

    const handleChange = (event) => {
        event.preventDefault();
        let siteId = event.target.value;
        if (!siteId) {
            siteId = "";
        }
        // console.log(siteId);
        post('/api/pinInfo', {
            userId: props.userId,
            universeId: props.universe._id,
            pinId: props.pin._id,
            siteId: siteId,
        }).then((pinInfo) => {
            setSite(siteIdtoObj[pinInfo.siteId]);
            get('/api/descriptionExists', {
                userId: props.userId,
                type: "Site",
                nameId: siteId,
                universeId: props.universe._id,
            }).then((exists) => {
                if (exists) {
                    get('/api/description', {
                        userId: props.userId,
                        type: "Site",
                        nameId: siteId,
                        universeId: props.universe._id,
                    }).then((descriptionObj) => {
                        setSiteDescription(descriptionObj.description);
                    })
                } else {
                    setSiteDescription("");
                }
            })

        });
    };

    let options = <div></div>;

    if (props.sites) {
        options = props.sites.map((siteObj) =>
            (<option key={`Option_${siteObj._id}`} value={siteObj._id}>{siteObj.name}</option>)
        );
    };

    useEffect(() => {
        if (props.pin) {
            get('/api/pinInfo', {
                userId: props.userId,
                universeId: props.universe._id,
                pinId: props.pin._id,
            }).then((pinInfo) => {
                if (pinInfo.length > 0) {
                    setSite(siteIdtoObj[pinInfo[0].siteId]);
                    // console.log(pinInfo, pinInfo[0].siteId);
                    get('/api/descriptionExists', {
                        userId: props.userId,
                        type: "Site",
                        nameId: pinInfo[0].siteId,
                        universeId: props.universe._id,
                    }).then((exists) => {
                        if (exists) {
                            get('/api/description', {
                                userId: props.userId,
                                type: "Site",
                                nameId: pinInfo[0].siteId,
                                universeId: props.universe._id,
                            }).then((descriptionObj) => {
                                setSiteDescription(descriptionObj.description);
                            })
                        } else {
                            setSiteDescription("");
                        }
                    })
                } else {
                    setSite("");
                    setSiteDescription("");
                }
            });
        };

    }, [props.pin]);


    return (
        <div className="Map-sidebar">
            {props.pin ? (<>
                {site ? (<>
                    <h2 className="Sidebar-title">{site.name}</h2>
                </>) : (<h2 className="Sidebar-title">Site Name</h2>)}

                {siteDescription ? (<>
                    <p className="Sidebar-description">{siteDescription}</p>
                </>) : (<p className="Sidebar-description">Description</p>)}

                {/* <button>Delete Pin</button> */}
                {/* <button onClick={props.clearPins}>Delete Pins</button> */}
                {/* <input list="siteDropdown" onChange={handleChange} /> */}
                <select className="Sidebar-description" type="text" id="siteDropdown" onChange={handleChange}>
                    <option value={undefined}>Select a site</option>
                    {options}
                </select>
            </>) : (<h2 className="Sidebar-title">Select a pin!</h2>)}

        </div>
    )
};

export default MapSidebar;