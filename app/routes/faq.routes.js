module.exports = app => {
    const faqs = require("../controllers/faq.controller.js");
    const { authJwt} = require("../middlewares");
    const db = require("../models");

    const FAQ = db.faq;
    var router = require("express").Router();
  
    // Create a new Faq
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin],faqs.create );
    
    // Retrieve all Faqs
    router.get("/", faqs.findAll);
 
  
    // Retrieve a single Faq with id
    // router.get("/:id", faqs.findOne);
  
    // Update a Faq with id
    router.put("/:id",[authJwt.verifyToken, authJwt.isAdmin], faqs.update);
  
    // Delete a Faq with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],faqs.delete);
  
    // Create a new Faq
    router.delete("/", faqs.deleteAll);

    
    router.get('/video',(req,res)=>{
      FAQ.find({ videostatus: true }).then(function(data){
      res.json(data);
    }).catch(function(e){
        
            res.json(e)
        
    });
    });


    router.get('/text',(req,res)=>{
      FAQ.find({ videostatus: false }).then(function(data){
        // console.log(data)
      res.json(data);
    }).catch(function(e){
        
            res.json(e)
        
    });
    });

  
    app.use('/api/faqs', router);
  };