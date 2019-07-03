import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SubscriberRow from "./SubscriberRow";

export default class SubscriberIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { subscribers: [] };
  }
  componentDidMount() {
    axios
      .get("/subscribers")
      .then(response => {
        this.setState({ subscribers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  tabRow() {
    return this.state.subscribers.map(function(object, i) {
      return <SubscriberRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">Subscribers</h3>
        <Link to={"/subscribers/create"} className="btn btn-primary">
            Create
        </Link>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>ID Type</th>
              <th>ID Number</th>
              <th>Account Number</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
