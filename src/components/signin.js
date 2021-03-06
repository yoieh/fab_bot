import React, { Component } from "react";

import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Signin extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "15px 0",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            style={{
              background: "#7289DA",
              color: "#fff"
            }}
            href="/api/auth/discord/"
          >
            Login through discord
          </Button>
        </div>
        OR
        <div
          style={{
            width: "100%",
            padding: "15px"
          }}
        >
          <Form action="/api/auth/login" method="post">
            <Form.Field>
              <label>Email</label>
              <input type="text" name="email" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" name="password" />
            </Form.Field>
            <Button type="submit">Login</Button> or{" "}
            <Link to={`/signup`}>Signup</Link>
          </Form>
        </div>
      </div>
    );
  }
}
