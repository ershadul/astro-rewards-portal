import React, { Component } from "react";

class PromocodeRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.obj.subscriber}</td>
        <td>{this.props.obj.code}</td>
      </tr>
    );
  }
}

export default PromocodeRow;
