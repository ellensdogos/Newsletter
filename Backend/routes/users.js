var express = require('express');
var fs = require('fs');
const { json } = require('express');

var router = express.Router();

//Get users
router.get('/', function (req, res, next) {
  fs.readFile('users.json', (err, data) => {
    if (err) throw err;

    var users = JSON.parse(data);
    res.send(users);
  })
});

//Create new user
router.post('/', function (req, res, next) {
  fs.readFile('users.json', (err, data) => {
    if (err) throw err;

    var users = JSON.parse(data);

    newUser = {
      "id": req.body.id,
      "userName": req.body.userName,
      "userEmail": req.body.userEmail,
      "password": req.body.password,
      "subscribe": req.body.subscribe
    }

    let latestId = users.length;
    newUser.id = (latestId + 1);

    users.push(newUser);

    var saveUsers = JSON.stringify(users, null, 2);

    fs.writeFile('users.json', saveUsers, (err, data) => {
      if (err) throw err;
    })

    res.send('Ny användare sparad');
  })

});

//Verify and log in user
router.post('/login', function (req, res) {
  fs.readFile('users.json', (err, data) =>{
    if (err) throw err;

    var users = JSON.parse(data);
    var user = users.find(x => x.userName == req.body.userName && x.password == req.body.password);

    if (user.password == req.body.password) {
      res.send({id: user.id, subscribe: user.subscribe});
    }
  })
})

//Change users subscriptionstatus
router.put('/:id', function (req, res) {
  fs.readFile('users.json', (err, data) => {
    if (err) throw err;

    let userId = req.params.id;
  
    var users = JSON.parse(data);
    var changeUser = users.find(x => x.id == userId)
    changeUser.subscribe = req.body.subscribe;
    
    var saveUser = JSON.stringify(users, null, 2);
    
    fs.writeFile("users.json", saveUser, (err, data) => {
      if (err) throw err;
    });

    res.send("Ändrat prenumerationsstatus");
  })
})

module.exports = router;
