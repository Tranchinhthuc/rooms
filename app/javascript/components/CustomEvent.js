import React from "react";
import ReactDOM from "react-dom";
export default class CustomEvent extends React.Component {
  render() {
    return (
      <div>
        {this.props.title}
        <button className='btn btn-danger delete-button'>X</button>
      </div>
    );
  }
}
