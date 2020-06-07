import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            userEmail: '',
            password: '',
            subscribe: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.name === 'subscribe' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        this.setState({userName: this.state.userName, userEmail: this.state.userEmail, password: this.state.password, subscribe: this.state.subscribe});
        this.props.newUser(this.state.userName, this.state.userEmail, this.state.password, this.state.subscribe);
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Ange ett användarnamn: 
                        <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange}/>
                        Ange din mailadress: 
                        <input type="email" name="userEmail" value={this.state.userEmail} onChange={this.handleChange}/>
                        Ange ditt lösenord: 
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        Vill du prenumerera på nyhetsbrevet? 
                        <input type="checkbox" name="subscribe" checked={this.state.subscribe} onChange={this.handleChange}/>
                    </label>
                    <input onClick="" type="submit" value="Registrera"/>
                </form>
            </div>
        )
    }
}

export default Register;