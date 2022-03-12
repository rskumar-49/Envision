import React, { useState } from "react";
import "./DashboardCreateCard.css";
// onClick={props.createUniverse("test")}>
const DashboardCreateCard = (props) => {
    const [universeName, setUniverseName] = useState("");
    const handleChange = (event) => {
        setUniverseName(event.target.value);
    };
    return (
        <div className="Card">
            <button onClick={() => {
                if (universeName !== "") {
                    props.createUniverse(universeName);
                } else {
                    alert("Your universe must have a name!")
                }

            }}>
                <h4>New Universe</h4>
            </button>
            <input
                type="text"
                placeholder="Enter your universe's name!"
                onChange={handleChange}
            />

        </div>
    )
}
export default DashboardCreateCard;