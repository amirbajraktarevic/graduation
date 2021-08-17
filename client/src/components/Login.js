import { useState, useContext } from "react";
import FadeIn from "react-fade-in";
import { Link, useHistory } from "react-router-dom";
import { Card, Form, FormGroup, Label, Input } from "reactstrap";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../App";

const Login = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const PersonData = () => {
    if (
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      alert("Enter a valid email");
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          history.push("/search");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container px-5">
      <FadeIn>
        <Card className="mt-5">
          <div className="mt-3">
            <h1>Login</h1>
            <hr />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <div className="registration-form ">
              <Form>
                <FormGroup>
                  <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter your e-mail here"
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <FontAwesomeIcon className="mr-2" icon={faKey} />
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter your password here"
                  ></Input>
                </FormGroup>
                <Button
                  variant="contained"
                  color="primary"
                  className="mb-4"
                  onClick={() => PersonData()}
                >
                  <FontAwesomeIcon className="mr-2" icon={faSignInAlt} />
                  Login
                </Button>
              </Form>
            </div>
          </div>
          <span className="mb-3">
            <Link to="/signup"> Don't have an account? Register here! </Link>
          </span>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Login;
