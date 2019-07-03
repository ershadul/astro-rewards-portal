import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RewardIndex from "./components/reward/RewardIndex";
import RewardDetail from "./components/reward/RewardDetail";
import RedeemForm from "./components/subscriber/RedeemForm";

function App() {
  return (
    
      <div className="container">
        <h2 style={{ marginTop: 20 }}>Rewards Portal</h2> <br />
        <Router>
          
          <Switch>
            <Route exact path="/" component={RewardIndex} />
            <Route path="/reward/:id" component={RewardDetail} />
            <Route path="/redeem" component={RedeemForm} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
