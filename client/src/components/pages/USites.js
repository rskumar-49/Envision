import Wikipage from "../modules/Wikipage.js";
import React from "react";
import "../modules/FastFacts.css";

const USites = (props) => {
  return props.universe ? (
    <div>
      <div className="FastFacts-Standalone-Title">Sites</div>
      <Wikipage type="Site" userId={props.userId} universe={props.universe} />
    </div>
  ) : (<h1>Please select a universe in the dashboard!</h1>);
};

export default USites;
