import React, { Component } from "react";
import "./app.css";

import { Route, Switch } from "react-router-dom";

import signin from "./components/signin";
import signup from "./components/signup";
import profile from "./components/profile";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch("/api/ping", {
    //   credentials: "same-origin"
    // })
    //   .then(res => res.json())
    //   .then(ping => this.setState({ message: ping.message }))
    //   .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={signin} />
          <Route exact path="/signin" component={signin} />
          <Route exact path="/signup" component={signup} />
          <Route exact path="/profile" component={profile} />
        </Switch>
      </div>
    );
  }
}
