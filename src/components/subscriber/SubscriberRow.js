import React, { Component } from "react";

class SubscriberRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.obj.idType}</td>
        <td>{this.props.obj.idNumber}</td>
        <td>{this.props.obj.accountNumber}</td>
        <td>{this.props.obj._id}</td>
      </tr>
    );
  }
}

export default SubscriberRow;
