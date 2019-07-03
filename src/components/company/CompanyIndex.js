import React, { Component } from "react";
import axios from "axios";
import CompanyRow from "./CompanyRow";
import { Link } from "react-router-dom";

export default class CompanyIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: [] };
  }
  componentDidMount() {
    axios
      .get("/companies")
      .then(response => {
        this.setState({ companies: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  tabRow() {
    return this.state.companies.map(function(object, i) {
      return <CompanyRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">Companies</h3>
        <Link to={"/companies/create"} className="btn btn-primary">
            Create
        </Link>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Logo</th>
              <th>ID</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
