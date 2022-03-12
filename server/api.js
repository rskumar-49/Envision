/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const FastFact = require("./models/fastfact");
const User = require("./models/user");
const Name = require("./models/names");
const Description = require("./models/description");
const MapPin = require("./models/mapPin");
const PinInfo = require("./models/pinInfo")
const Universe = require("./models/universe");
// const Image = require("./models/image");
const MapImage = require("./models/mapImage")

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/nameindb", auth.ensureLoggedIn, (req, res) => {
  Name.exists({
    userId: req.query.userId,
    type: req.query.type,
    nameId: req.query.nameId,
    universeId: req.query.universeId,
  }).then((bool) => {
    res.send(bool);
  });
});

router.get("/names", auth.ensureLoggedIn, (req, res) => {
  Name.find({
    userId: req.query.userId,
    type: req.query.type,
    universeId: req.query.universeId,
  }).then((nom) => {
    res.send(nom);
  });
});

router.post("/names", auth.ensureLoggedIn, (req, res) => {
  const newName = new Name({
    userId: req.body.userId,
    type: req.body.type,
    name: req.body.name,
    universeId: req.body.universeId,
  });
  newName.save().then((name) => res.send(name));
});

router.get("/descriptionExists", auth.ensureLoggedIn, (req, res) => {
  Description.exists({
    userId: req.query.userId,
    type: req.query.type,
    nameId: req.query.nameId,
    universeId: req.query.universeId,
  }).then((bool) => {
    res.send(bool);
  });
});

router.get("/description", auth.ensureLoggedIn, (req, res) => {
  Description.findOne({
    userId: req.query.userId,
    type: req.query.type,
    nameId: req.query.nameId,
    universeId: req.query.universeId,
  }).then((description) => {
    res.send(description);
  });
});

router.post("/description", auth.ensureLoggedIn, (req, res) => {
  Description.deleteMany({
    userId: req.body.userId,
    type: req.body.type,
    nameId: req.body.nameId,
    universeId: req.body.universeId,
  }).then((err) => {
    if (err) return console.log("Couldn't delete them.");
    console.log("Deleted them");
  });
  const newDescription = new Description({
    userId: req.body.userId,
    type: req.body.type,
    nameId: req.body.nameId,
    description: req.body.description,
    universeId: req.body.universeId,
  });
  newDescription.save().then((desc) => res.send(desc));
});

router.get("/fastfacts", auth.ensureLoggedIn, (req, res) => {
  FastFact.find({
    userId: req.query.userId,
    type: req.query.type,
    nameId: req.query.nameId,
    universeId: req.query.universeId,
  }).then((facts) => {
    res.send(facts);
  });
});

router.post("/fastfacts", auth.ensureLoggedIn, (req, res) => {
  const newFact = new FastFact({
    userId: req.body.userId,
    type: req.body.type,
    nameId: req.body.nameId,
    category: req.body.category,
    description: req.body.description,
    universeId: req.body.universeId,
  });
  newFact.save().then((fact) => res.send(fact));
});

router.get("/mappins", auth.ensureLoggedIn, (req, res) => {
  MapPin.find({
    userId: req.query.userId,
    universeId: req.query.universeId,
  }).then((pins) => {
    res.send(pins);
  });
});

router.post("/mappin", auth.ensureLoggedIn, (req, res) => {
  const newPin = new MapPin({
    userId: req.body.userId,
    ori_x: req.body.ori_x,
    ori_y: req.body.ori_y,
    universeId: req.body.universeId,
  });
  newPin.save().then((pin) => res.send(pin));
});

router.get("/pinInfo", auth.ensureLoggedIn, (req, res) => {
  PinInfo.find({
    userId: req.query.userId,
    universeId: req.query.universeId,
    pinId: req.query.pinId,
  }).then((pinInfo) => res.send(pinInfo));
})

router.post("/pinInfo", auth.ensureLoggedIn, (req, res) => {
  PinInfo.deleteOne(
    {
      userId: req.body.userId,
      universeId: req.body.universeId,
      pinId: req.body.pinId
    })
    .then((result) => {
      const newPinInfo = new PinInfo({
        userId: req.body.userId,
        universeId: req.body.universeId,
        pinId: req.body.pinId,
        siteId: req.body.siteId,
      });
      newPinInfo.save().then((pinInfo) => res.send(pinInfo));
    });
});

router.post("/clearpins", auth.ensureLoggedIn, (req, res) => {
  MapPin.deleteMany({ userId: req.body.userId, universeId: req.body.universeId }).then((result) => {
    res.send(result);
  });
});

router.post("/createuniverse", auth.ensureLoggedIn, (req, res) => {
  const newUniverse = new Universe({
    userId: req.body.userId,
    name: req.body.name,
  });
  newUniverse.save().then((universe) => res.send(universe));
});

router.get("/universes", auth.ensureLoggedIn, (req, res) => {
  Universe.find({
    userId: req.query.userId,
  }).then((universes) => res.send(universes));
});

router.post("/deleteuniverse", auth.ensureLoggedIn, (req, res) => {
  Universe.deleteOne({ userId: req.body.userId, _id: req.body.universeId }).then((result) => {
    res.send(result);
  });
});

router.get("/mapImage", auth.ensureLoggedIn, (req, res) => {
  MapImage.find({
    userId: req.query.userId,
    universeId: req.query.universeId,
  }).then((images) => {
    res.send(images);
  });
});

router.post("/mapImage", auth.ensureLoggedIn, (req, res) => {
  MapImage.deleteOne({
    userId: req.body.userId,
    universeId: req.body.universeId,
  }).then((result) => {
    const newImage = new MapImage({
      userId: req.body.userId,
      universeId: req.body.universeId,
      imageString: req.body.imageString,
    });
    // console.log("image Uploaded");
    newImage.save().then((image) => res.send(image));
  });
});



// router.get("/images", auth.ensureLoggedIn, (req, res) => {
//   Image.find({
//     userId: req.query.userId,
//     // _id: req.query.imageId
//   }).then((images) => {
//     res.send(images);
//   });
// });

// router.post("/images", auth.ensureLoggedIn, (req, res) => {
//   const newImage = new Image({
//     userId: req.body.userId,
//     imageString: req.body.imageString,
//   });
//   console.log("image Uploaded");
//   newImage.save().then((image) => res.send(image));
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
