import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from 'moment';

function WebsiteLink(props) {
  const link = props.link;
  if (link) {
    return (
      <p className="period-link">
          <label for="">Website</label>
          <span><a href={link}>Visit Link</a></span>
      </p>
    );
  } else {
    return (null);
  }
}

function StoreLink(props) {
  const locationUrl = props.locationUrl;
  if (locationUrl) {
    return (
      <p className="period-link">
          <label for="">Location</label>
          <span><a href={locationUrl}>Visit Store</a></span>
      </p>
    );
  } else {
    return (null);
  }
}

class RewardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { reward: {}, company: {} };

  }

  componentDidMount() {
    axios
      .get("/rewards/" + this.props.match.params.id)
      .then(response => {
        this.setState({ reward: response.data, company: response.data.company });
        console.log(this.state.reward);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="row mb-4">
          <div className="col-md-6">
              <div className="details-img">
                  <img src={this.state.reward.thumbnail} alt={this.state.reward.title} />
              </div>
          </div>
          <div className="col-md-6">
              <div className="details-reward-content">
                  <div className="rewards-card-header-container mb-3">
                      <div className="hd-img">
                          <img src={this.state.company.logo} alt={this.state.company.name} />
                      </div>
                      <div className="hd-header">
                          <label>{this.state.company.name}</label>
                          <span>Redeem @ {this.state.reward.redemptionType}</span>
                      </div>
                  </div>
                  <h5 className="reward-title mb-2">{this.state.reward.title}</h5>
                  <p className="mb-4">{this.state.reward.subTitle}</p>
                  <p className="period-link">
                      <label for="">Redemption Period</label>
                      <span>{Moment(this.state.reward.redemptionPeriodStart).format('MMM DD')} - {Moment(this.state.reward.redemptionPeriodEnd).format('MMM DD')}</span>
                  </p>
                  <WebsiteLink link={this.state.company.website}></WebsiteLink>
                  <StoreLink locationUrl={this.state.reward.locationUrl}></StoreLink>
              </div>
          </div>
        </div>
        <div className="mb-4">
            <h4 className="font-weight-bold">Description</h4>
            <div dangerouslySetInnerHTML={{ __html:this.state.reward.description}} />
        </div>
        <div className="row mb-4">
            <div className="col-md-4">
                <Link to={'/redeem/' + this.state.reward._id } className="btn btn-primary btn-block">Redeem</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default RewardDetail;
