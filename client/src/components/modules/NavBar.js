import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities.js"

import "./NavBar.css";
// const GOOGLE_CLIENT_ID = "647642803918-mjs4dqbadiq7pkcajtq3oeocqbdrnjsk.apps.googleusercontent.com"
const GOOGLE_CLIENT_ID = "247927142997-i09b8ct5jaueetjsgcplr6uumocs710p.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  const [userName, setUserName] = useState("Login");

  useEffect(() => {
    get("/api/whoami").then((userObj) => {
      if (userObj.name !== undefined) {
        setUserName(userObj.name)
      }
    }).catch((err) => setUserName("Login"))
  }, []);

  return (
    <nav className="NavBar-container">
      <div className="NavBar-element-container">
        <Link className="NavBar-title u-inlineBlock" to="/">
          Envision
        </Link>
        <div className="NavBar-link-Container u-inlineBlock">
          <div className="NavBar-link-Container u-inlineBlock">
            <Link to="/dashboard/" className="NavBar-link">
              Dashboard
            </Link>
            {props.universe ? (
              <>
                <Link to="/universe/" className="NavBar-link">
                  {props.universe && props.universe.name} 's Home
                </Link>
                <Link to="/universe/maps/" className="NavBar-link">
                  Maps
                </Link>
                <Link to="/universe/sites/" className="NavBar-link">
                  Sites
                </Link>
                <Link to="/universe/characters/" className="NavBar-link">
                  Characters
                </Link>
                <Link to="/universe/objects/" className="NavBar-link">
                  Objects
                </Link>
                <Link to="/universe/qualities/" className="NavBar-link">
                  Qualities
                </Link>
                {/* <Link to="/universe/misc/" className="NavBar-link">
                  Misc
                </Link> */}
              </>
            ) : (<></>)}

          </div>
        </div>
      </div>
      <div className="User-Dropdown-Container u-inlineBlock">
        <button className="User-Dropdown-Button">
          {userName}
        </button>
        <div className="User-Dropdown-Content">
          <div className="User-Dropdown-Link-Container">
            {props.userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={(res) => {
                  props.handleLogout(res);
                  setUserName("Login")
                }}
                onFailure={(err) => console.log(err)}
                className="User-Dropdown-Link"
              />
            ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={(res) => {
                  props.handleLogin(res, setUserName);
                }}
                onFailure={(err) => console.log(err)}
                className="User-Dropdown-Link"
              />
            )}
            {/* <Link to="/login/" className="User-Dropdown-Link">
              Login
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
