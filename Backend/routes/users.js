var express = require('express');
var fs = require('fs');

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

router.post('/login', function (req, res, next) {
  fs.readFile('users.json', (err, data) => {

    var users = JSON.parse(data);
    var loggedIn = false;
    var userId;
    var subscribe;

    for (var i = 0; i < users.length; i++) {
      if (users[i].userName == req.body.userName && users[i].password == req.body.password) {
        userId = i;
        loggedIn = true;
        subscribe = users[i].subscribe;
      }
    }

    res.send({login, userId, subscribe});
  })
})

module.exports = router;
