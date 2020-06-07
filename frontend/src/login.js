import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        this.setState({userName: this.state.userName, password: this.state.password, subscribe: this.state.subscribe});
        this.props.newUser(this.state.userName, this.state.password, this.state.subscribe);
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({[name]: event.target.value});
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Användarnamn:
                        <input name="userName" type="text" value={this.state.userName} onChange={this.state.handleChange} />
                        Lösenord:
                        <input name="password" type="password" value={this.state.password} onChange={this.state.handleChange} />
                    </label>
                    <input type="submit" value="Logga in"/>
                </form>
            </div>
        )
    }


}

export default Login;