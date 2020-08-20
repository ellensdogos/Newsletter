import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        this.loginUser(this.state.userName, this.state.password);
        event.preventDefault();
    }

    handleChange = (event) => {
        const updateState = event.target.name;
        this.setState({
            [updateState]: event.target.value
        })
    }

    loginUser = (userName, password) => {
        console.log("Testar inloggning");

        var data = { userName: userName, password: password }
        fetch('http://localhost:9000/users/login', {
            "method": "POST",
            "headers": {
                "Content-type": 'application/json',
            },
            "body": JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.getCurrentUser(data.id, data.subscribe);
        })
        .catch (err => {
            console.log("Misslyckad inloggning", err);
        });
    }

    render() {
        return(
            <div>
            <h4>Logga in: </h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Användarnamn:
                        <input name="userName" type="text" value={this.state.userName} onChange={this.handleChange} />
                        <br/>
                        Lösenord:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Logga in"/>
                </form>
            </div>
        )
    }


}

export default Login;