const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const request = require('request');
const db = require("../models");

const User = db.user;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
      "Access-Control-Allow-Origin","*"
    );

    next();
  });


  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get('/currentdata', (req, res) => {
    request(
      { url: 'https://brp.com.np/covid/nepal.php' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        // console.log((JSON.parse(body)));
        res.json(JSON.parse(body));
       
      }
    )
  });

   
app.get('/api/user/:id', authJwt.verifyToken, (req,res)=>{

  User.findOne({_id:req.params.id}).then(function(user){
          // console.log(user);
          res.send(user)
          // res.json({code:100,singleuser:user});
  }).catch(function(e){
          res.send(e)
  });
});



/*
* Update user details by id
*/

app.put('/api/user/:id',authJwt.verifyToken,(req,res)=>{
  console.log(req.body)
  User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
       res.json({ message: "User was updated successfully." });

  }).catch(function(e){
       res.send(e)
  });
});

};
