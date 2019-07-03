import React, { Component } from "react";
import axios from "axios";

export default class CompanyEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      logo: '',
      website: '',
    };
  }

  componentDidMount() {
    axios
      .get("/companies/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          logo: response.data.logo,
          website: response.data.website,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeWebsite(e) {
    this.setState({
      website: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .put(
        "http://localhost:3000/v1/companies/" + this.props.match.params.id,
        { name: this.state.name, website: this.state.website }
      )
      .then(res => console.log(res.data));

    this.props.history.push("/companies");
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Update company</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Logo: </label>
            <img src={this.state.logo} alt={this.state.name} style={{ width: 200, height: 100 }}/>
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Website: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.website}
              onChange={this.onChangeWebsite}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update Companay"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
