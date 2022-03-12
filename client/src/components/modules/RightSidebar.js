import React, { Component, useState, useEffect } from "react";
import { get } from "../../utilities";
import "./Wikipage.css";
import "./RightSidebar.css";

const RightSidebar = (props) => {
  useEffect(() => {
    get("/api/names", {
      userId: props.userId,
      universeId: props.universe._id,
      type: props.type,
    }).then((namesListObj) => {
      props.setNamesList(namesListObj);
    });
  }, [props.userId, props.type]);

  if (props.userId) {
    return (
      <div className="RightSidebar u-textCenter">
        <div className="Top-container">{props.type} List</div>
        <button
          className="SingleUser-container New-button"
          onClick={() => {
            props.setActiveName(undefined);
          }}
        >
          New {props.type}
        </button>
        {props.namesList.map((nameObj) => (
          <button
            key={`Button_${nameObj._id}`}
            className="SingleUser-container"
            onClick={() => {
              props.setActiveName(nameObj);
            }}
          >
            {nameObj.name}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="Wiki-sidebar">
      <div>List</div>
    </div>
  );
};

export default RightSidebar;
