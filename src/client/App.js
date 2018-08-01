import React, { Component } from "react";
import "./app.css";
import ReactImage from "./react.png";
import cookie from "react-cookie";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null };
  }

  componentDidMount() {
    fetch("/api/ping", {
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(ping => this.setState({ message: ping.message }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        {this.state.message ? (
          <h1>Hello, {this.state.message}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "40px 0",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <a
            style={{
              background: "#7289DA",
              padding: "0 20px",
              lineHeight: "35px",
              color: "#fff",
              fontFamily: "Helvetica, Arial, sans-sefir",
              fontSize: "20px",
              display: "block",
              textDecoration: "none",
              borderRadius: "3px"
            }}
            href="/api/auth/discord/"
          >
            Login through discord
          </a>
        </div>
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
