import React from 'react';
import Register from './register';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = { Id: null };

    var localId = localStorage.getItem("userId");
    if (localId) {
      this.state.Id = localId;
    }
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

  handleLogin (Id) {
    this.setState({Id: Id})
    localStorage.setItem("userId", Id);
  }

  render() {
    return (
      <div>
        <h1>Newsletter</h1>
        <Register newUser={this.newUser} />
      </div>
    )
  }
}


export default App;
