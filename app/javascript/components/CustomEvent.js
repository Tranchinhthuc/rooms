import React from "react";
import ReactDOM from "react-dom";
export default class CustomEvent extends React.Component {
  render() {
    return (
      <div>
        {this.props.title}
        {
          // this.props.event.userEmail
        }
      </div>
    );
  }
}
