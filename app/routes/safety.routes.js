module.exports = app => {
    const safetys = require("../controllers/safety.controller.js");
    const { authJwt} = require("../middlewares");
    const db = require("../models");

    // const Safety = db.safety;
    var router = require("express").Router();
  
    // Create a new Safety
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin],safetys.create );
    
    // Retrieve all Safetys
    router.get("/", safetys.findAll);
 
  
    // Retrieve a single Safety with id
    // router.get("/:id", safetys.findOne);
  
    // Update a Safety with id
    router.put("/:id",[authJwt.verifyToken, authJwt.isAdmin], safetys.update);
  
    // Delete a Safety with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],safetys.delete);
  
    // Create a new Safety
    router.delete("/", safetys.deleteAll);
   
    

  
    app.use('/api/safetys', router);
  };