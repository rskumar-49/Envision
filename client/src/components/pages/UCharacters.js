import Wikipage from "../modules/Wikipage.js";
import React from "react";
import "../modules/FastFacts.css";

const UCharacters = (props) => {
  return props.universe ? (
    <div>
      <div className="FastFacts-Standalone-Title">Characters</div>
      <Wikipage type="Character" userId={props.userId} universe={props.universe} />
    </div>
  ) : (<h1>Please select a universe in the dashboard!</h1>);
};

export default UCharacters;
