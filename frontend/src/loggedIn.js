import React from 'react';

class loggedIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isToggleOn: true
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        this.props.changeSubscribe(this.state.isToggleOn, localStorage.getItem("currentUser"));
    }

    render() {
        return (
            <div>
                <h1>
                    Välkommen!
                </h1>
                Prenumerera på nyhetsbrevet? 
                {" "}
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? 'JA' : 'NEJ'}
                </button>
            </div>
        )
    }
}

export default loggedIn;