import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

class RewardRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .get("/rewards/" + this.props.obj._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.company.name}</td>
        <td>{this.props.obj._id}</td>
        <td>{this.props.obj.redemptionPeriodStart}</td>
        <td>{this.props.obj.redemptionPeriodEnd}</td>
        <td><img src={this.props.obj.thumbnail} alt={this.props.obj.title} style={{width: 100, heigth: 100}} /></td>
        {/* <td>
          <Link to={"/rewards/edit/" + this.props.obj._id} className="btn btn-primary">
            Edit
          </Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td> */}
      </tr>
    );
  }
}

export default RewardRow;
