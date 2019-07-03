import React, { Component } from "react";
import axios from "axios";
import { ClipLoader } from 'react-spinners';

export default class RedeemForm extends Component {
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
      submitting: false,
      invalid: true,
    };
  }

  onChangeIdType(e) {
    this.setState({
      idType: e.target.value
    });
    this.checkStateValidity();
  }

  onChangeIdNumber(e) {
    this.setState({
      idNumber: e.target.value
    });
    this.checkStateValidity();
  }

  onChangeAccountNumber(e) {
    this.setState({
      accountNumber: e.target.value
    });
    this.checkStateValidity();
  }

  checkStateValidity () {
    const accNumLength = this.state.accountNumber.trim().length;
    if (this.state.idType 
      && this.state.idNumber.trim()
      && (accNumLength === 10 || accNumLength === 12)) {
        this.setState({invalid: false});
      } else {
        this.setState({invalid: true});
      }
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true });
    axios
      .post("/promocodes",
        { idType: this.state.idType, idNumber: this.state.idNumber, accountNumber: this.state.accountNumber }
      ).then(res => {
        this.setState({ submitting: false });
        console.log(res.data);
        alert(res.data.code);
        this.props.history.push("/");
      }).catch(error => {
        console.log(error);
        this.setState({ submitting: false });
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Redeem</h3>
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
              value="Redeem Now"
              className="btn btn-primary"
              disabled={this.state.submitting || this.state.invalid}
            />

            <ClipLoader
              style={{display: 'block', margin: '10px 0 0 20px'}}
              sizeUnit={"px"}
              size={40}
              color={'#123abc'}
              loading={this.state.submitting}
            />

          </div>
        </form>
      </div>
    );
  }
}
