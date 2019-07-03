import React, { Component } from "react";
import axios from "axios";
import PromocodeRow from "./PromocodeRow";

export default class PromocodeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { promocodes: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/v1/promocodes")
      .then(response => {
        this.setState({ promocodes: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  tabRow() {
    return this.state.promocodes.map(function(object, i) {
      return <PromocodeRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3 align="center">Promocodes</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Subscriber ID</th>
              <th>code</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
