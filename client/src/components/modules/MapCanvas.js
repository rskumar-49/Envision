import React, { useEffect, useRef, useState } from "react"
import pointer from "../../media/hand-pointer.png"
import { get, post } from "../../utilities.js";
import MapSidebar from "./MapSidebar.js";
import "./MapCanvas.css"

const getPinPath = (ori_x, ori_y, pin_width, pin_height) => {
    const path = new Path2D();
    path.moveTo(ori_x, ori_y);
    path.arc(ori_x, ori_y - (pin_height - 11), 11, (5 / 6) * Math.PI, (1 / 6) * Math.PI);
    path.lineTo(ori_x, ori_y);
    return path
}


const MapCanvas = (props) => {
    // console.log(props.userId);
    console.log("canvas re-rendered")
    const [currentPin, setCurrentPin] = useState();

    // const [refresh, setRefresh] = useState(['']);

    const [pin_width, pin_height] = [23, 36];

    let mapImg = new Image();

    const setImgSrc = async (src) => {
        mapImg.src = src
    }

    const canvasRef = useRef();
    const pinRef = useRef();
    let listeners = [];

    const addPins = useRef(false);
    const disableAddPins = () => {
        addPins.current = false;
    }

    const enableAddPins = () => {
        addPins.current = true;
    }

    const postPin = (pinObj) => {
        // console.log("posting pin");
        post("/api/mappin", {
            userId: props.userId,
            ori_x: pinObj.ori_x,
            ori_y: pinObj.ori_y,
            id: pinObj.id,
            universeId: props.universe._id,
        }).then((apiPinObj) => {
            drawPin(apiPinObj, true);
            setCurrentPin(apiPinObj);
        });
    }

    const drawPin = (pinObj, setCurrent = false) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const pin_path = getPinPath(pinObj.ori_x, pinObj.ori_y, pin_width, pin_height);
        context.fillStyle = "red";

        context.fill(pin_path);

        const onPinClick = (e) => {
            // console.log('in pin', addPins.current)
            if (context.isPointInPath(pin_path, e.layerX, e.layerY) && !addPins.current) {
                context.fillStyle = "green";

                setCurrentPin(pinObj);

            } else {
                context.fillStyle = "red";

            }
            context.fill(pin_path);


        }
        canvas.addEventListener("click", onPinClick);
        listeners.push({ type: "click", func: onPinClick });

        if (setCurrent) {
            setCurrentPin(pinObj);
        }
    }

    const createEventListeners = (canvas) => {

        const onClick = (e) => {
            const pinObj = {
                userId: props.userId,
                ori_x: e.layerX,
                ori_y: e.layerY,
                universeId: props.universe._id,
            };

            if (addPins.current) {
                // console.log('general click', addPins.current)
                postPin(pinObj);
            }
        }
        canvas.addEventListener("click", onClick);
        listeners.push({ type: "click", func: onClick });
    }

    const clearPins = () => {
        post("/api/clearpins", {
            userId: props.userId,
            universeId: props.universe._id,
        }).then(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.fillStyle = "rgba(0, 0, 0, 0)";
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            // console.log("listeners", listeners);
            for (const listener of listeners) {
                canvas.removeEventListener(listener["type"], listener["func"]);
                // console.log("removed listener");
            }
            // controller.abort();
            context.drawImage(mapImg, 0, 0, 800, 500);
            listeners = [];
            createEventListeners(canvas);
            // console.log('listeners after', listeners);
        });
    }

    useEffect(() => {
        const pinCanvas = pinRef.current;
        const pinContext = pinCanvas.getContext('2d');
        const pinPath = getPinPath(pin_width / 2, pin_height, pin_width, pin_height);
        pinContext.fillStyle = "red";
        pinContext.fill(pinPath);

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        setImgSrc(props.image.imageString).then(() => {

            context.drawImage(mapImg, 0, 0, 800, 500);

            createEventListeners(canvas);

            get("/api/mappins", {
                userId: props.userId,
                universeId: props.universe._id,
            }).then((apiPins) => {
                // console.log(apiPins)
                for (const pinObj of apiPins) {
                    drawPin(pinObj)

                };
            });
        })


    }, [props.image])


    return (
        <>
            <div className="Map-topbar">
                <button className="Topbar-button" onClick={enableAddPins}>
                    <canvas ref={pinRef} width={pin_width} height={pin_height} />
                </button>
                <button className="Topbar-button" onClick={disableAddPins}>
                    <img src={pointer} width={pin_height} height={pin_height} />
                </button>
            </div>
            <div className="Map-container">
                <div>
                    <canvas ref={canvasRef} width="800px" height="500px" tabIndex='1' />
                </div>
                <MapSidebar pin={currentPin} userId={props.userId} universe={props.universe} clearPins={clearPins} sites={props.sites} />
            </div>

        </>
    )

}

export default MapCanvas;