module.exports = app => {
    const donations = require("../controllers/donation.controller.js");
    const { authJwt } = require("../middlewares");
    const db = require("../models");

    const Donation = db.donation;

    var router = require("express").Router();
  
    // Create a new Donation
    router.post("/", [authJwt.verifyToken],donations.create );
    
    // Retrieve all Donations
    // router.get("/", [authJwt.verifyToken],donations.findAll);

    router.get('/',authJwt.verifyToken,(req,res)=>{
        Donation.find().then(function(data){
        res.json(data);
      }).catch(function(e){
          
              res.json(e)
          
      });
      });

      router.get('/unique',authJwt.verifyToken,(req,res)=>{
        Donation.find().distinct('currentusername',function(error, data){
        res.json(data);
        // console.log(data)
      }).catch(function(e){
          
              res.json(e)
          
      });
      });
      
    // Retrieve all Donations
    router.get("/:username", [authJwt.verifyToken],donations.findAll);
 
  
    // Retrieve a single Donation with id
    router.get("/:id", donations.findOne);
  
    // Update a Donation with id
    router.put("/:id",[authJwt.verifyToken], donations.update);
  
    // Delete a Donation with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],donations.delete);
  
    // Create a new Donation
    router.delete("/", donations.deleteAll);
  
    app.use('/api/donations', router);
  };