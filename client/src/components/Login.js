import React, {Component} from 'react';
import $ from "jquery";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.password = {};
        this.username = {};
    }

    onLoginSubmit() {
        $.ajax({
            url: "http://localhost:3001/login",
            method: "post",
            data: {
                username: this.username.value || "",
                password: this.password.value || ""
            },
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            }
        }).then(res => {
            if (res.code === 0) {
                this.props.getContent();
            } else {
                alert(res.message);
            }

        });
    }

    render() {



        return(
            <div className={"auth-part-container"}>
                <h3>
                    {this.props.title}
                </h3>
                <input className={"text-input"} ref={username => this.username = username} type={"text"} placeholder={"введите имя пользователя"}/>
                <input className={"text-input pass"} ref={password => this.password = password} type={"text"} placeholder={"введите пароль"}/>
                <button  className={"submit"} onClick={() => this.onLoginSubmit()}>Ок</button>
            </div>
        )
    }
}