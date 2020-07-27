module.exports = app => {
    const expenses = require("../controllers/expense.controller.js");
    const { authJwt} = require("../middlewares");
    const db = require("../models");
    const multer = require('multer');
    const path = require("path");
    const Expense = db.expense;
    var router = require("express").Router();
  


/*
* to upload image in uploads directory
*/

const storage = multer.diskStorage({
    destination: "./public/expenses-photos",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
 
 const imageFileFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
         return cb(new Error("You can upload only image files!"), false);
     }
     cb(null, true);
 };
 
 const upload = multer({
     storage: storage,
     fileFilter: imageFileFilter
 })



 router.post('/',authJwt.verifyToken, authJwt.isAdmin,upload.single('bill_image'), async (req, res) => {
   
      // Validate request
  if (!req.body.totalexpenses) {
    res.status(400).send({ message: "Total expenses can not be empty!" });
    return;
  }

  if (!req.body.note) {
    res.status(400).send({ message: "Note can not be empty!" });
    return;
  }
  if (req.file == undefined) {
    return res.send(`You must select a file.`);
  }

  

  // Create a Expense
  const expense = new Expense({
    totalexpenses: req.body.totalexpenses,
    note: req.body.note,
    bill_image: req.file.filename,
  });

//   // Save Expense in the database
//     req.body.bill_image = req.file.filename;
  
//    console.log(req.body)
await expense.save(expense)
        .then(data => {
            res.send({ message: "Expense was added successfully!" });

        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Expense."
        });
        });
});


    // Delete a District with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],expenses.delete);

    // Retrieve all Expenses
    router.get("/",[authJwt.verifyToken], expenses.findAll);

    // Update a Expense with id
    router.put("/:id",[authJwt.verifyToken, authJwt.isAdmin], expenses.update);

     
  

    app.use('/api/expenses', router);
};