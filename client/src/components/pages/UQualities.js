import Wikipage from "../modules/Wikipage.js";
import React from "react";
import "../modules/FastFacts.css";

const UQualities = (props) => {
  return props.universe ? (
    <div>
      <div className="FastFacts-Standalone-Title">Qualities</div>
      <Wikipage type="Quality" userId={props.userId} universe={props.universe} />
    </div>
  ) : (<h1>Please select a universe in the dashboard!</h1>);
};

export default UQualities;
