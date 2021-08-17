import { Form, FormGroup, Label, Input, Card } from "reactstrap";
import { Button } from "@material-ui/core";
import FadeIn from "react-fade-in";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faKey,
  faBriefcase,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { useState } from "react";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [roles, setRole] = useState(["Police", "Doctor"]);
  const role = roles.map((role) => role);
  // eslint-disable-next-line no-unused-vars
  const [chosenRole, setChosenRole] = useState("Police");

  const PersonData = () => {
    if (
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      alert("Make sure you enter a valid E-mail");
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: chosenRole,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          history.push("/signup");
        } else {
          alert(data.message);
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const roleHandler = (e) => {
    console.clear();
    console.log(roles[e.target.value]);
    setChosenRole(roles[e.target.value]);
  };

  return (
    <div className="container px-5 mb-5">
      <FadeIn>
        <Card className="mt-5">
          <div className="mt-3">
            <h1>Sign up</h1>
            <hr />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <div className="registration-form ">
              <Form>
                <FormGroup>
                  <FontAwesomeIcon className="mr-2" icon={faUser} />
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name here"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your e-mail here"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <FontAwesomeIcon className="mr-2" icon={faKey} />
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password here"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <FontAwesomeIcon className="mr-2" icon={faBriefcase} />
                  <Label for="role">Select your profession</Label>
                  <Input
                    onChange={(e) => roleHandler(e)}
                    type="select"
                    name="role"
                    id="role"
                  >
                    {" "}
                    <option disabled>...</option>
                    {role.map((roless, key) => (
                      <option value={key} key={key}>
                        {" "}
                        {roless}{" "}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <Button
                  variant="contained"
                  color="primary"
                  className="mb-4"
                  onClick={() => PersonData()}
                >
                  <FontAwesomeIcon className="mr-2" icon={faPaperPlane} />
                  Register
                </Button>
              </Form>
            </div>
          </div>
          <span className="mb-3">
            <Link to="/login"> Already have an account? </Link>
          </span>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Signup;
