import React, {Component} from 'react';
import $ from "jquery";
import RemoveButton from "./RemoveButton";
import Todo from "./Todo";

export default class TodoList extends Component {
    constructor(props) {
        super(props);

    }


    render() {

        console.log(this.props.todos);
        return (
            <div className="todo-list">
                {
                    this.props.todos.map(el => {
                        return (

                            <div className={"todo-container"}>
                                <Todo key={el._id} id={el._id} text={el.text}/>
                                <RemoveButton onClick={() =>
                                    this.props.onTodoRemove(el._id)
                                }/>
                            </div>
                        )
                    })
                }
            </div>
        )


    }
}