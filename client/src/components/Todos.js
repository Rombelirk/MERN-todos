import React, {Component} from 'react';
import $ from "jquery";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

export default class Todos extends Component {
    constructor(props) {
        super(props);
        this.onTodoRemove = this.onTodoRemove.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.state = {
            todos:[]
        }

    }


    componentDidMount() {
        $.ajax({
            url: "http://localhost:3001/get_todos",
            method: "get",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            }
        }).then(res => {
            if (res.code !== 0) {
                alert(res.message);
                this.props.returnBack();
            } else {
                this.setState({todos: res.todos});
            }
        });
    }

    addTodo(text) {
        console.log(text);
        $.ajax({
            url: "http://localhost:3001/add_todo",
            method: "post",
            crossDomain: true,
            data: {
              text
            },
            xhrFields: {
                withCredentials: true
            }
        }).then(res => {
            console.log(res);
            this.setState({todos: res.todos});

        });
    }


    onTodoRemove(id) {
        $.ajax({
            url: "http://localhost:3001/remove_todo",
            method: "post",
            crossDomain: true,
            data: {
                id
            },
            xhrFields: {
                withCredentials: true
            }
        }).then(res => {

            this.setState({todos: res.todos});
        });

    }

    render() {
        return (
            <div>
                <div className={"logout-container"}>
                    <button className={"logout-button"} onClick={() => this.props.logout()}>
                        Выйти
                    </button>
                </div>
                <h2 className={"todo-title"}>Список дел:</h2>


                <TodoList todos={this.state.todos} onTodoRemove={this.onTodoRemove}/>
                <AddTodo onSubmit={this.addTodo}/>

            </div>
        )
    }
}