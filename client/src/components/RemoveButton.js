import React, {Component} from 'react';


export default class RemoveButton extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return <button className={"remove-button"} onClick={this.props.onClick}> Удалить </button>
    }
}