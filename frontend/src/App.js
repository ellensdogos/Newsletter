import React from 'react';
import Register from './register';
import Login from './login';
import LoggedIn from './loggedIn';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    const currentUser = localStorage.getItem("currentUser");
    this.state = { currentUser: currentUser }

  }

  currentUserId = (id, subscribe) => {
    this.setState({ currentUser: id, subscribe: subscribe });
    localStorage.setItem("currentUser", id);
    console.log("currentUser");
    console.log(id);
  }

  newUser = (userName, userEmail, password, subscribe) => {
    var data = {
      userName: userName,
      userEmail: userEmail,
      password: password,
      subscribe: subscribe
    };
    fetch('http://localhost:9000/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(alert("Successful registration! You can now log in"));
  }

  changeSubscribe = (subscribe, id) => {

    var data = {
      subscribe: subscribe,
      id: id
    }

    fetch('http://localhost:9000/users/' + id, {
      "method": "PUT",
      "headers": {
        "Content-type": 'application/json',
      },
      "body": JSON.stringify(data),
    })
      .catch(err => {
        console.log(err);
      })
  }

  changeSubscription = (subscribe) => {
    this.setState({ subscribe: subscribe });
  }

  render() {
    if (this.state.currentUser == null) {
      return (
        <div>
        <h1>Nyhetsbrevet</h1>
          <Login getCurrentUser={this.currentUserId} />
          <br/>
          <Register newUser={this.newUser} />
        </div>
      )
    }
    else {
      return (
        <div>
          <LoggedIn subscribe={this.state.subscribe} changeSubscribe={this.changeSubscribe} />
        </div>
      )
    }
  }
}


export default App;
