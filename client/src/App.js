import React, {Component} from 'react';
import './App.css';
import $ from "jquery";
import Authentification from "./components/Authentification";
import Todos from "./components/Todos";


class App extends Component {

    constructor(props) {
        super(props);
        this.userNotLoggedIn = this.userNotLoggedIn.bind(this);
        this.state = {
            logged: true
        }
    }

    userNotLoggedIn() {
        this.setState({
            logged: false
        })
    }

    getContent() {
        this.setState({
            logged: true
        })
    }

    logout() {
        $.ajax({
            url: "http://localhost:3001/logout",
            method: "get",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            }
        }).then(res => {
            console.log(res.message);
        });
        this.setState({
            logged: false
        })

    }

    render() {

        console.log(document.cookie);

        return (
            <div className="content">
                {
                    !this.state.logged &&
                    <div className={"auth-container"}>
                        <Authentification getContent={() => this.getContent()}/>
                    </div>
                }

                {this.state.logged && <Todos logout={() => this.logout()} returnBack={this.userNotLoggedIn}/>}
            </div>
        );
    }
}

export default App;
