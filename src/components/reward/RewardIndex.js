import React, { Component } from "react";
import axios from "axios";
import RewardRow from "./RewardRow";
import { Link } from "react-router-dom";

export default class RewardIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { rewards: [] };
  }
  componentDidMount() {
    axios
      .get("/rewards")
      .then(response => {
        this.setState({ rewards: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  tabRow() {
    return this.state.rewards.map(function(object, i) {
      return <RewardRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">Rewards</h3>
        <Link to={"/rewards/create"} className="btn btn-primary">
            Create
        </Link>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>ID</th>
              <th>Promo Start</th>
              <th>Promo End</th>
              <th>Image</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
