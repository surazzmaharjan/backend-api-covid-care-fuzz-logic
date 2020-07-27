module.exports = app => {
    const suspects = require("../controllers/suspect.controller.js");
    const { authJwt } = require("../middlewares");
    const db = require("../models");

    const Suspect = db.suspect;

    var router = require("express").Router();
  
    // Create a new Suspect
    router.post("/", [authJwt.verifyToken],suspects.create );
    


    router.get('/',authJwt.verifyToken, authJwt.isAdmin,(req,res)=>{
        Suspect.find().then(function(data){
        res.json(data);
      }).catch(function(e){
          
              res.json(e)
          
      });
      });
    // Retrieve all Suspects
    router.get("/:username", [authJwt.verifyToken],suspects.findAll);
 
  
    // Retrieve a single Suspect with id
    router.get("/:id", suspects.findOne);
  
    // Update a Suspect with id
    router.put("/:id",[authJwt.verifyToken], suspects.update);
  
    // Delete a Suspect with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],suspects.delete);
  
    // Create a new Suspect
    router.delete("/", suspects.deleteAll);
  
    app.use('/api/suspects', router);
  };