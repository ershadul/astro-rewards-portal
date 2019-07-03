import React, { Component } from "react";
import axios from "axios";
import RewardCard from "./RewardCard";

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
      return <RewardCard obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div className="row">
        {this.tabRow()}
      </div>
    );
  }
}
