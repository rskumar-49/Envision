import React, { useState } from "react";
import "./DashboardCard.css";
import trash from "../../media/trash.png";
import pencil from "../../media/icons8-pencil-32.png";
import { Link } from "@reach/router"
import { post } from "../../utilities.js"

const DashboardCard = (props) => {
    const [showInput, setShowInput] = useState(false);
    const toggleInput = () => {
        setShowInput(!showInput);
    }
    const deleteUniverse = () => {
        post("/api/deleteuniverse", {
            userId: props.userId,
            universeId: props.universe._id,
        }).then(
            props.removeUniverse(props.universe)
        );
    };
    return (
        <div className="Card">
            <div>
                {/* <button onClick={toggleInput}>
                    <img src={pencil} width="16px" height="16px" />
                </button> */}
                <button className="Delete-button Card-button" onClick={deleteUniverse}>
                    <img src={trash} width="16px" height="16px" />
                </button>
            </div>
            <Link to="/universe">
                <button className="Universe-button" onClick={() => {
                    props.setUniverse(props.universe);
                }}>

                    <h4>{props.name}</h4>
                </button>
            </Link>
            {showInput ? (
                <input
                    type="text"
                    placeholder="Enter your new name!"
                // onChange={handleChange}
                />
            ) : (<div></div>)}

        </div>
    )
}
export default DashboardCard;