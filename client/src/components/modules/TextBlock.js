import React, { useState, useEffect } from "react";
import "./TextBlock.css";
import { get, post } from "../../utilities";

/**
 * InputAndSubmit is a parent component for all input components
 * Proptypes
 * @param {string} defaultText is the placeholder text
//  * @param {string} universeId optional prop, used to say which universe it's associated with
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */

const InputAndSubmit = (props) => {
  const [value, setValue] = useState("");
  // useEffect(() => {
  //   setValue(props.defaultText);
  // }, [props.defaultText]);

  // called whenever the user types in the new textblock input box
  const handleChange = (event) => {
    if (!props.nameCheck || props.nameCheck(props.nameObj)) {
      event.preventDefault();
      setValue(event.target.value);
    }
  };

  // called when the user hits "Submit" for a new textblock
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!props.nameCheck || props.nameCheck(props.nameObj)) {
      event.preventDefault();
      props.onSubmit && props.onSubmit(value);
    }
  };

  // Clear on switch => sketchy, sometimes clears after, very buggy :(
  // useEffect(() => {
  //   setValue("");
  // }, [props.nameObj]);
  const clickCheck = () => {
    props.nameCheck && props.nameCheck(props.nameObj)
  }

  useEffect(() => {
    setValue(props.initValue);
  }, [props.initValue, props.nameObj]);



  return (
    <div className="u-flex">
      <textarea
        onClick={() => { clickCheck }}
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="TextBlock-input TextBlock-width"
      />
      {(props.type && props.type === "Name" && !props.nameObj) || !props.type ?
        (<button
          type="submit"
          className="TextBlock-button u-pointer"
          value="Submit"
          onClick={handleSubmit}
        >
          Submit
        </button>)
        : (<></>)}
    </div>
  );
};

const TwoInputAndSubmit = (props) => {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");

  const handleChange = (event) => {
    if (!props.nameCheck || props.nameCheck(props.nameObj)) {
      event.preventDefault();
      setValue(event.target.value);
    }
  };
  const handleChange1 = (event) => {
    if (!props.nameCheck || props.nameCheck(props.nameObj)) {
      event.preventDefault();
      setValue1(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    if (!props.nameCheck || props.nameCheck(props.nameObj)) {
      event.preventDefault();
      props.onSubmit && props.onSubmit(value, value1);
      setValue("");
      setValue1("");
    }
  };

  //Clear pending entries on switch
  useEffect(() => {
    setValue("");
    setValue1("");
  }, [props.nameObj]);

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="TextBlock-input"
      />
      <input
        type="text"
        placeholder={props.defaultText1}
        value={value1}
        onChange={handleChange1}
        className="TextBlock-input"
      />
      <button
        type="submit"
        className="TextBlock-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const Description = (props) => {
  const addDescription = (value) => {
    // console.log;
    post("/api/description", {
      userId: props.userId,
      type: props.type,
      nameId: props.nameObj._id,
      description: value,
      universeId: props.universe._id,
    }).then((descObj) => {
      props.setDescription(descObj.description);
    });
  };

  const nameCheck = (nameObj) => {
    if (!nameObj) {
      alert("Submit a name before adding a description!");
      return false;
    }
    return true;
  }

  useEffect(() => {
    props.setDescription("");
    if (props.nameObj) {
      get("/api/descriptionExists", {
        userId: props.userId,
        type: props.type,
        nameId: props.nameObj._id,
        universeId: props.universe._id,
      }).then((exists) => {
        if (exists) {
          get("/api/description", {
            userId: props.userId,
            type: props.type,
            nameId: props.nameObj._id,
            universeId: props.universe._id,
          }).then((desc) => {
            props.setDescription(desc.description);
          });
        }
      })
    };
  }, [props.nameObj, props.universe]);

  return (
    <InputAndSubmit nameCheck={nameCheck} nameObj={props.nameObj} initValue={props.desc} defaultText="Description" onSubmit={addDescription} />
  );
};

const Name = (props) => {
  const [initValue, setInitValue] = useState("");
  useEffect(() => {
    if (props.nameObj) {
      // Clear on name change
      setInitValue(props.nameObj.name);
    } else {
      setInitValue("");
    }
  }, [props.nameObj]);

  const addName = (value) => {
    post("/api/names", {
      userId: props.userId,
      type: props.type,
      name: value,
      universeId: props.universe._id,
    }).then((nameObj) => {
      props.setNamesList(props.namesList.concat(nameObj));
      props.setActiveName(nameObj);
    });
  };

  return <InputAndSubmit nameObj={props.nameObj} initValue={initValue} defaultText="Name" onSubmit={addName} type="Name" />;
};

export { InputAndSubmit, TwoInputAndSubmit, Description, Name };
