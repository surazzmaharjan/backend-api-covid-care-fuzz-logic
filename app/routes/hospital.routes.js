module.exports = app => {
    const hospitals = require("../controllers/hospital.controller.js");
    const { authJwt,commonUnique } = require("../middlewares");

    var router = require("express").Router();
  
    // Create a new Hospital
    router.post("/", [commonUnique.checkDuplicateHospitalName,authJwt.verifyToken, authJwt.isAdmin],hospitals.create );
    
    // Retrieve all Hospitals
    router.get("/", hospitals.findAll);
 
  
    // Retrieve a single Hospital with id
    router.get("/:id", hospitals.findOne);
  
    // Update a Hospital with id
    router.put("/:id",[authJwt.verifyToken, authJwt.isAdmin], hospitals.update);
  
    // Delete a Hospital with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],hospitals.delete);
  
    // Create a new Hospital
    router.delete("/", hospitals.deleteAll);
  
    app.use('/api/hospitals', router);
  };