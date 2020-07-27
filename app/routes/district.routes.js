module.exports = app => {
    const districts = require("../controllers/district.controller.js");
    const { authJwt,commonUnique } = require("../middlewares");

    var router = require("express").Router();
  
    // Create a new District
    router.post("/", [commonUnique.checkDuplicateName,authJwt.verifyToken, authJwt.isAdmin],districts.create );
    
    // Retrieve all Districts
    router.get("/", districts.findAll);
 
  
    // Retrieve a single District with id
    router.get("/:id", districts.findOne);
  
    // Update a District with id
    router.put("/:id",[authJwt.verifyToken, authJwt.isAdmin], districts.update);
  
    // Delete a District with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],districts.delete);
  
    // Create a new District
    router.delete("/", districts.deleteAll);
  
    app.use('/api/districts', router);
  };