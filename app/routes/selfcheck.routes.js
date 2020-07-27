module.exports = app => {
    const selfchecks = require("../controllers/selfcheck.controller.js");
    const { authJwt } = require("../middlewares");
    const db = require("../models");

    const Selfcheck = db.selfcheck;

    var router = require("express").Router();
  
    // Create a new Selfcheck
    router.post("/", [authJwt.verifyToken],selfchecks.create );
    
    // Retrieve all Selfchecks
    // router.get("/", [authJwt.verifyToken],selfchecks.findAll);

    router.get('/',authJwt.verifyToken,(req,res)=>{
        Selfcheck.find().then(function(data){
        res.json(data);
      }).catch(function(e){
          
              res.json(e)
          
      });
      });

      router.get('/unique',authJwt.verifyToken,(req,res)=>{
        Selfcheck.find().distinct('currentusername',function(error, data){
        res.json(data);
        // console.log(data)
      }).catch(function(e){
          
              res.json(e)
          
      });
      });
      
    // Retrieve all Selfchecks
    router.get("/:username", [authJwt.verifyToken],selfchecks.findAll);
 
  
    // Retrieve a single Selfcheck with id
    router.get("/:id", selfchecks.findOne);
  
    // Update a Selfcheck with id
    router.put("/:id",[authJwt.verifyToken], selfchecks.update);
  
    // Delete a Selfcheck with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],selfchecks.delete);
  
    // Create a new Selfcheck
    router.delete("/", selfchecks.deleteAll);
  
    app.use('/api/selfchecks', router);
  };