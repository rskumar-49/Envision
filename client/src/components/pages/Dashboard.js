import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";
import "./Dashboard.css";
import DashboardCard from "../modules/DashboardCard.js"
import DashboardCreateCard from "../modules/DashboardCreateCard.js"
import trash from "../../media/trash.png";
import pencil from "../../media/icons8-pencil-32.png";

const Dashboard = (props) => {
    const [universes, setUniverses] = useState([]);
    const removeUniverse = (universe) => {
        const removed = [...universes];
        const uIdx = removed.indexOf(universe);
        if (uIdx !== -1) {
            removed.splice(uIdx, 1);
        }
        setUniverses(removed);
        if (props.universe && universe._id === props.universe._id) {
            props.setUniverse(undefined);
        } else {
            // console.log(universe, props.universe)
        }
    }
    // const [loading, setLoading] = useState(true);
    const createUniverse = (name) => {
        post("/api/createuniverse", {
            userId: props.userId,
            name: name,
        }).then((universeObj) => {
            setUniverses([...universes, universeObj]);
            props.setUniverse(universeObj);
        });
    };

    useEffect(() => {
        get("/api/universes", { userId: props.userId })
            .then((apiUniverses) => {
                setUniverses(apiUniverses);
                // console.log('universes fetched', apiUniverses);
                // setLoading(false);
            });

    }, [props.userId]);

    let cards = null;
    // console.log(universes);
    const areUniverses = universes.length !== 0;
    // console.log(areUniverses);
    if (areUniverses) {
        cards = universes.map((universe) =>
        (
            <DashboardCard
                name={universe.name}
                key={`Card_${universe._id}`}
                setUniverse={props.setUniverse}
                universe={universe}
                userId={props.userId}
                removeUniverse={removeUniverse} />
        )
        );
    } else {
        cards = <div></div>
        // console.log('no universes converted to cards')
    }


    return (
        <>
            {props.userId ? (
                <>
                    <center>
                        <h1>Dashboard</h1>
                    </center>
                    <div className="Dashboard-Container">
                        <DashboardCreateCard createUniverse={createUniverse} toggleUniverse={props.toggleUniverse} />
                        {cards}
                    </div>
                    <div className="Attribution-link-container">
                        <h4 className="Attribution-item">Image attributions: </h4>
                        <a className="Attribution-link Attribution-item" href="https://icons8.com/icon/Y9ovwPX2vCUN/pencil">Pencil icon by Icons8</a>
                        <a className="Attribution-link Attribution-item" href="https://icons8.com/icon/85081/trash">Trash icon by Icons8</a>
                    </div>


                </>
            ) : (
                <h1> Please log in. </h1>
            )}

        </>
    );
};

export default Dashboard;