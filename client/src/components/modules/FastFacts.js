import { TwoInputAndSubmit } from "./TextBlock.js";
import React, { Component, useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./FastFacts.css";
import "./TextBlock.css";

/**
 * FactSubmit is a component for submitting new category, fast pairs.
 *
 * Proptypes
 * @param {string} userId of the story
 * @param {string} userName
//  * @param {string} universeId
//  * @param {string} universeName
 * @param {string} type (char, sites, etc)
 * @param {string} name of the specific type
 */
const FactSubmit = (props) => {
  const addFact = (value, value1) => {
    const body = {
      userId: props.userId,
      type: props.type,
      nameId: props.nameObj._id,
      category: value,
      description: value1,
      universeId: props.universe._id,
    };
    post("/api/fastfacts", body).then((fact) => {
      props.addNewFact(fact);
    });
  };

  const nameCheck = (nameObj) => {
    if (!nameObj) {
      alert("Submit a name before adding fast facts!");
      return false
    }
    return true
  }

  return (
    <TwoInputAndSubmit defaultText="New Category" defaultText1="New Fact" onSubmit={addFact} nameObj={props.nameObj} nameCheck={nameCheck} />
  );
};

const FactRender = (props) => {
  return (
    <div className=" TextBlock-2-by-1">
      <div className="TextBlock-input">{props.category}</div>
      <div className="TextBlock-input">{props.description}</div>
    </div>
  );
};

/**
 * FastFacts is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} userId of the story
 * @param {string} userName
//  * @param {string} universeId
//  * @param {string} universeName
 * @param {string} type (char, sites, etc)
 * @param {string} name of the specific type
 */

const FastFacts = (props) => {
  useEffect(() => {
    props.setFacts([]);
    if (props.nameObj) {
      get("/api/fastfacts", {
        userId: props.userId,
        type: props.type,
        nameId: props.nameObj._id,
        universeId: props.universe._id,
      }).then((facts) => {
        props.setFacts(facts);
      });
    } else {
      // console.log("No name selected")
    }

  }, [props.nameObj]);

  // this gets called when the user pushes "Submit", so their post gets added to the screen right away
  const addNewFact = (fact) => {
    props.setFacts(props.facts.concat([fact]));
  };

  return (
    <div className="FastFacts-1-by-7">
      <div className="FastFacts-Title">Fast Facts</div>
      {props.facts.map((fact) => (
        <FactRender
          key={`FactRender_${fact._id}`}
          category={fact.category}
          description={fact.description}
        />
      ))}
      <FactSubmit
        userId={props.userId}
        type={props.type}
        nameObj={props.nameObj}
        addNewFact={addNewFact}
        className="FastFacts-Margin-Top"
        universe={props.universe}
      />
    </div>
  );
};

export { FastFacts };
