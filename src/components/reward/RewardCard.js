import React, { Component } from "react";
import { Link } from "react-router-dom";

class RewardRow extends Component {

  render() {
    return (
      <div className="col-md-4">
        <div className="reward-item-wrap">
        <Link to={'/reward/' + this.props.obj._id}>
            <div className="img-wrap">
                <img src={this.props.obj.thumbnail} alt={this.props.obj.title} />
            </div>
            <div className="item-deatils">
              <div className="rewards-card-header-container">
                <div className="hd-img">
                    <img src={this.props.obj.company.logo} alt={this.props.obj.company.name} />
                </div>
                <div class="hd-header">
                    <label for="">{this.props.obj.company.name}</label>
                    <span>Redeem @ {this.props.obj.redemptionType}</span>
                </div>
              </div>
              <h5 className="reward-title">{this.props.obj.title}</h5>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default RewardRow;
