const db = require("../models");

const District = db.district;
const Hospital = db.hospital;

checkDuplicateName = (req, res, next) => {
  // district name
  District.findOne({
    districtname: req.body.districtname
  }).exec((err, district) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (district) {
      res.status(400).send({ message: "Failed! District is already in use!" });
      return;
    }
next();
  });

};


checkDuplicateHospitalName = (req, res, next) => {
  // hospital name
  Hospital.findOne({
    hospitalname: req.body.hospitalname
  }).exec((err, hospital) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (hospital) {
      res.status(400).send({ message: "Failed! Hospital is already in use!" });
      return;
    }
next();
  });

};



const commonUnique = {
    checkDuplicateName, checkDuplicateHospitalName
};

module.exports = commonUnique;
