import React, {Component} from 'react';
import $ from "jquery";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.password = {};
        this.username = {};
    }

    onSignupSubmit(){
        $.ajax({
            url: "http://localhost:3001/signup",
            method: "post",
            data: {
                username: this.username.value || "",
                password: this.password.value || ""
            },
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            }
        }).then(res => alert(res));
    }

    render() {
        return(
            <div className={"auth-part-container"}>
                <h3>
                    {this.props.title}
                </h3>
                <input className={"text-input"} ref={username => this.username = username} type={"text"} placeholder={"введите имя пользователя"}/>
                <input className={"text-input pass"} ref={password => this.password = password} type={"text"} placeholder={"введите пароль"}/>
                <button className={"submit"} onClick={() => this.onSignupSubmit()}>Ок</button>

            </div>
        )
    }
}