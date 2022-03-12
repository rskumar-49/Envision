import React, { useState } from "react";
import { FastFacts } from "./FastFacts.js";
import { Name, Description } from "./TextBlock.js";
import RightSidebar from "./RightSidebar.js";
import "./FastFacts.css";
import "./Wikipage.css";

const Wikipage = (props) => {
  const [activeName, setActiveName] = useState(undefined);
  const [facts, setFacts] = useState([]);
  const [namesList, setNamesList] = useState([]);
  const [descri, setDescri] = useState("");

  return (
    <div className="Wiki-container">
      <div className="Table">
        <div className="FastFacts-1-by-2-Uneven">
          <Name
            type={props.type}
            userId={props.userId}
            setActiveName={setActiveName}
            setFacts={setFacts}
            facts={facts}
            namesList={namesList}
            setNamesList={setNamesList}
            nameObj={activeName}
            universe={props.universe}
          />
          <div className="FastFacts-2-by-1-Uneven">
            <FastFacts
              type={props.type}
              userId={props.userId}
              nameObj={activeName}
              setFacts={setFacts}
              facts={facts}
              universe={props.universe}
            />
            <Description
              type={props.type}
              userId={props.userId}
              nameObj={activeName}
              desc={descri}
              setDescription={setDescri}
              universe={props.universe}
            />
          </div>
        </div>
      </div>
      <RightSidebar
        type={props.type}
        userId={props.userId}
        namesList={namesList}
        setNamesList={setNamesList}
        setActiveName={setActiveName}
        universe={props.universe}
      />
    </div>
  );
};

export default Wikipage;
