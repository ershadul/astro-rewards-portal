import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class CompanyRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .get("http://localhost:4000/business/delete/" + this.props.obj._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td><img src={this.props.obj.logo} alt={this.props.obj.name} width="75px" height="75px" /></td>
        <td>{this.props.obj._id}</td>
        <td>
          <Link to={"/companies/edit/" + this.props.obj._id} className="btn btn-primary">
            Edit
          </Link>
        </td>
        {/* <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td> */}
      </tr>
    );
  }
}

export default CompanyRow;
