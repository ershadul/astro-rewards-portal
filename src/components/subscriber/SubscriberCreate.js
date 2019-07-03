import React, { Component } from "react";
import axios from "axios";

export default class SubscriberCreate extends Component {
  constructor(props) {
    super(props);
    this.onChangeIdType = this.onChangeIdType.bind(this);
    this.onChangeIdNumber = this.onChangeIdNumber.bind(this);
    this.onChangeAccountNumber = this.onChangeAccountNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      idType: 'MyKad',
      idNumber: '',
      accountNumber: '',
    };
  }

  onChangeIdType(e) {
    this.setState({
      idType: e.target.value
    });
  }

  onChangeIdNumber(e) {
    this.setState({
      idNumber: e.target.value
    });
  }

  onChangeAccountNumber(e) {
    this.setState({
      accountNumber: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.idNumber.length === 0 ) {return;}
    if (this.state.accountNumber.length !== 10 && this.state.accountNumber.length !== 12) {return;}
    console.log(this.state);
    axios
      .post("/subscribers",
        { idType: this.state.idType, idNumber: this.state.idNumber, accountNumber: this.state.accountNumber }
      ).then(res => {
        console.log(res.data);
        this.props.history.push("/subscribers");
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Create subscriber</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>ID Type: *</label>
            <select className="form-control"
              onChange={this.onChangeIdType}>
              <option value="MyKad">MyKad</option>
              <option value="Old NIRC">Old NIRC</option>
              <option value="Passport">Passport</option>
              <option value="Army">Army</option>
              <option value="Navy">Navy</option>
              <option value="Police">Police</option>
            </select>
          </div>
          <div className="form-group">
            <label>ID Number: *</label>
            <input
              type="text"
              className="form-control"
              value={this.state.idNumber}
              onChange={this.onChangeIdNumber}
            />
          </div>
          <div className="form-group">
            <label>Account / Smartcard Number (10 or 12 digits): *</label>
            <input
              type="text"
              className="form-control"
              value={this.state.accountNumber}
              onChange={this.onChangeAccountNumber}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Subscriber"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
