import React from 'react';

class Verify extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
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

    verifyAccount = (userName, password) => {
        var data = {password: password, userName: userName};

        fetch('http://localhost:9000/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.login)
            {
                localStorage.setItem("UserName", userName);
                localStorage.setItem("UserId", data.userId);
                localStorage.setItem("Subscribe", data.subscribe);
                console.log(localStorage);
            }
        })

        

    }
}

export default Verify;
