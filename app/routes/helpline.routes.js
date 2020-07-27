module.exports = app => {
    const helplines = require("../controllers/helpline.controller.js");
    const { authJwt } = require("../middlewares");
    const db = require("../models");

    const Helpline = db.helpline;

    var router = require("express").Router();
  
    // Create a new Helpline
    router.post("/", [authJwt.verifyToken],helplines.create );
    
    // Retrieve all Helplines
    // router.get("/", [authJwt.verifyToken],helplines.findAll);

    router.get('/',authJwt.verifyToken,(req,res)=>{
      Helpline.find().then(function(data){
        res.json(data);
      }).catch(function(e){
          
              res.json(e)
          
      });
      });
    // Retrieve all Helplines
    router.get("/:username", [authJwt.verifyToken],helplines.findAll);
 
  
    // Retrieve a single Helpline with id
    router.get("/:id", helplines.findOne);
  
    // Update a Helpline with id
    router.put("/:id",[authJwt.verifyToken, authJwt.isAdmin], helplines.update);
  
    // Delete a Helpline with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],helplines.delete);
  
    // Create a new Helpline
    router.delete("/", helplines.deleteAll);
  
    app.use('/api/helplines', router);
  };