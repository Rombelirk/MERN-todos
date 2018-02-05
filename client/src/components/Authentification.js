import React, {Component} from 'react';
import Login from "./Login";
import Signup from "./Signup";

class Authentification extends Component {

    constructor(props) {
        super(props);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.state = {
            authType: "login"
        }
    }

    onSelectChange(e) {
        if (e.target.value === "login") {
            this.setState({authType: "login"});
        } else {
            this.setState({authType: "signup"});
        }
    }

    render() {

        return (
            <div className={"authentication"}>
                <select className={"select-auth"} onChange={this.onSelectChange}>
                    <option value="login">Войти</option>
                    <option value="signup">Регистрация</option>
                </select>
                {this.state.authType === "login" ? <Login getContent={this.props.getContent} title={"Войти"}/> : <Signup title={"Зарегистрироваться"}/>}

            </div>
        );
    }
}

export default Authentification;
