import React, {Component} from 'react';



export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            value: ""
        }
    }

    onSubmit() {
        this.props.onSubmit(this.state.value);
        this.setState({value: ""});
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }


    render() {
       return(
           <div className="add-todo">
               <input type="text" onChange={this.onChange} value={this.state.value}/>
               <button className={"submit add"} onClick={this.onSubmit}>Добавить</button>
           </div>
       )
    }
}