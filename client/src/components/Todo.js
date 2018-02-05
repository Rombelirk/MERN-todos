import React from "react";

const Todo = (props) => {
    return (
        <div className={"todo"}>
            {props.text}
        </div>
    )
}

export default Todo;