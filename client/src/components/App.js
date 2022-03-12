import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Index from "./pages/Index.js";

import UHome from "./pages/UHome.js";
import UMaps from "./pages/UMaps.js";
import UMisc from "./pages/UMisc.js";
import UCharacters from "./pages/UCharacters.js";
import UObjects from "./pages/UObjects.js";
import UQualities from "./pages/UQualities.js";
import USites from "./pages/USites.js";
import Dashboard from "./pages/Dashboard.js";

import NavBar from "./modules/NavBar.js";
import { NewFact } from "./modules/TextBlock.js";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  // const [showUniverse, toggleUniverse] = useState(false);
  const [universe, setUniverse] = useState();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  useEffect(() => {
    setUniverse(undefined);
  }, [userId])

  const handleLogin = (res, callback = null) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
    if (callback) {
      callback(res.profileObj.name);
    }
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} universe={universe} />
      <div className="App-container">
        <Router>
          <Index path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          <Dashboard path="/dashboard" userId={userId} setUniverse={setUniverse} universe={universe} />
          <UCharacters path="/universe/characters" userId={userId} universe={universe} />
          <UHome path="/universe" userId={userId} universe={universe} />
          <UMaps path="/universe/maps" userId={userId} universe={universe} />
          {/* <UMisc path="/universe/misc" userId={userId} universe={universe} /> */}
          <UObjects path="/universe/objects" userId={userId} universe={universe} />
          <UQualities path="/universe/qualities" userId={userId} universe={universe} />
          <USites path="/universe/sites" userId={userId} universe={universe} />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
