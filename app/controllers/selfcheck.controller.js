const config = require("../config/auth.config");
const db = require("../models");

const Selfcheck = db.selfcheck;


// Create and Save a new Helpline
exports.create = (req, res) => {
  // Validate request
  if (!req.body.gender) {
    res.status(400).send({ message: "Gender can not be empty!" });
    return;
  }

  if (!req.body.contact) {
    res.status(400).send({ message: "Contact can not be empty!" });
    return;
  }


  if (!req.body.temperature) {
    res.status(400).send({ message: "Temperature can not be empty!" });
    return;
  }


  if (!req.body.age) {
    res.status(400).send({ message: "Age can not be empty!" });
    return;
  }

  if (!req.body.quarantine) {
    res.status(400).send({ message: "Quarantine can not be empty!" });
    return;
  }

  if (!req.body.drycough) {
    res.status(400).send({ message: "Dry Cough can not be empty!" });
    return;
  }


  if (!req.body.fatigue) {
    res.status(400).send({ message: "Fatigue can not be empty!" });
    return;
  }

  if (!req.body.sorethroat) {
    res.status(400).send({ message: "Sore Throat can not be empty!" });
    return;
  }


  if (!req.body.breathe) {
    res.status(400).send({ message: "Breathe can not be empty!" });
    return;
  }


  if (!req.body.bodypain) {
    res.status(400).send({ message: "Body pain can not be empty!" });
    return;
  }


  if (!req.body.diarrhoea) {
    res.status(400).send({ message: "Diarrhoea can not be empty!" });
    return;
  }


  if (!req.body.runnynose) {
    res.status(400).send({ message: "Runny Nose can not be empty!" });
    return;
  }


  if (!req.body.nausea) {
    res.status(400).send({ message: "Nausea can not be empty!" });
    return;
  }


  if (!req.body.returnfromcountry) {
    res.status(400).send({ message: "Choose  one" });
    return;
  }
  




  // Create a Selfcheck
  const selfcheck = new Selfcheck({
    age: req.body.age,
    gender: req.body.gender,
    contact: req.body.contact,
    temperature: req.body.temperature,
    quarantine: req.body.quarantine,
    drycough: req.body.drycough,
    fatigue: req.body.fatigue,
    sorethroat: req.body.sorethroat,
    breathe: req.body.breathe,
    bodypain: req.body.bodypain,
    diarrhoea: req.body.diarrhoea,
    runnynose: req.body.runnynose,
    nausea: req.body.nausea,
    returnfromcountry: req.body.returnfromcountry,
    status: req.body.status,
    currentuserfullname: req.body.currentuserfullname,
    currentuseremail: req.body.currentuseremail,
    currentusername: req.body.currentusername,
    
  });

  // Save SelfCheck in the database
  selfcheck
    .save(selfcheck)
    .then(data => {
        res.send({ message: "SelfCheck was added successfully!" });

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SelfCheck."
      });
    });

   
        
};

// // Retrieve all Helpline from the database.
// exports.findAll = (req, res) => {
  
//     Helpline.find().then(function(data){
//       res.json(data);
//     }).catch(function(e){
  
//          res.json(e)
    
//     });

//   };

  // Retrieve all SelfCheck from the database  by user.
exports.findAll = (req, res) => {
  
  Selfcheck.find({currentusername: req.params.username}).then(function(data){
    res.json(data);
  }).catch(function(e){

       res.json(e)
  
  });

};

// Find a single SelfCheck with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Selfcheck.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found SelfCheck with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving SelfCheck with id=" + id });
      });
  };


// Update a SelfCheck by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Selfcheck.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update SelfCheck with id=${id}. Maybe SelfCheck was not found!`
          });
        } else res.send({ message: "SelfCheck was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating SelfCheck with id=" + id
        });
      });
  };

// Delete a SelfCheck with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Selfcheck.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete SelfCheck with id=${id}. Maybe SelfCheck was not found!`
          });
        } else {
          res.send({
            message: "SelfCheck was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete SelfCheck with id=" + id
        });
      });
  };
// Delete all SelfCheck from the database.
exports.deleteAll = (req, res) => {
  Selfcheck.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} SelfCheck were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all selfchecks."
        });
      });
  };

