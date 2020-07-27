const config = require("../config/auth.config");
const db = require("../models");

const Faq = db.faq;


// Create and Save a new Faq
exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  // Create a Faq
  const faq = new Faq({
    question: req.body.question,
    answer: req.body.answer,
    videostatus: req.body.videostatus,
  });

  // Save Faq in the database
  faq
    .save(faq)
    .then(data => {
        res.send({ message: "Faq was added successfully!" });

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Faq."
      });
    });

   
        
};

// Retrieve all Faq from the database.
exports.findAll = (req, res) => {
  
    Faq.find().then(function(data){
      res.json(data);
    }).catch(function(e){
  
         res.json(e)
    
    });

  };

// Find a single Faq with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     Faq.findById(id)
//       .then(data => {
//         if (!data)
//           res.status(404).send({ message: "Not found Faq with id " + id });
//         else res.send(data);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .send({ message: "Error retrieving Faq with id=" + id });
//       });
//   };


// Update a Faq by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Faq.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Faq with id=${id}. Maybe Faq was not found!`
          });
        } else res.send({ message: "Faq was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Faq with id=" + id
        });
      });
  };

// Delete a Faq with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Faq.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Faq with id=${id}. Maybe Faq was not found!`
          });
        } else {
          res.send({
            message: "Faq was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Faq with id=" + id
        });
      });
  };
// Delete all Faq from the database.
exports.deleteAll = (req, res) => {
    Faq.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Faq were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all faqs."
        });
      });
  };

