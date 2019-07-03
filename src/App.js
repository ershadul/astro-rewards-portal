import React from "react";
// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CompanyIndex from "./components/company/CompanyIndex";
import CompanyCreate from "./components/company/CompanyCreate";
import CompanyEdit from "./components/company/CompanyEdit";
import RewardIndex from "./components/reward/RewardIndex";
import RewardCreate from "./components/reward/RewardCreate";
import SubscriberIndex from "./components/subscriber/SubscriberIndex";
import SubscriberCreate from "./components/subscriber/SubscriberCreate";

function App() {
  return (
    <Router>
      <div className="container">
        <h2 style={{ marginTop: 20 }}>Rewards CMS</h2> <br />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/companies"} className="nav-link">
                  Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/rewards"} className="nav-link">
                  Rewards
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/subscribers"} className="nav-link">
                  Subscribers
                </Link>
              </li>
            </ul>
          </div>
        </nav>{" "}
        <br />
        <Switch>
          <Route exact path="/companies" component={CompanyIndex} />
          <Route path="/companies/edit/:id" component={CompanyEdit} />
          <Route path="/companies/create" component={CompanyCreate} />

          <Route exact path="/rewards" component={RewardIndex} />
          <Route exact path="/rewards/create" component={RewardCreate} />
          
          <Route exact path="/subscribers" component={SubscriberIndex} />
          <Route exact path="/subscribers/create" component={SubscriberCreate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
