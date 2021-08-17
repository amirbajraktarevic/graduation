import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarBrand,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../App";
import { Button } from "@material-ui/core";

const NavBar = (props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const render = () => {
    if (state) {
      return [
        <>
          <NavItem>
            <Link className="nav-link nav-link-text" to="/search">
              SEARCH
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link nav-link-text" to="/about">
              ABOUT
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link-text nav-link" to="/profile">
              PROFILE
            </Link>
          </NavItem>
          <NavItem>
            <Button
              className="white-text"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push("/");
              }}
            >
              <span className="white-text mr-2">
                <FontAwesomeIcon icon={faSignOutAlt} /> LOGOUT
              </span>
            </Button>
          </NavItem>
        </>,
      ];
    } else {
      return [
        <>
          <NavItem>
            <Link className="nav-link nav-link-text" to="/">
              HOME
            </Link>
          </NavItem>
          <NavItem></NavItem>
          <NavItem>
            <Link className="nav-link nav-link-text" to="/about">
              ABOUT
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link-text nav-link" to="/signup">
              SIGN UP
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link-text nav-link white-text" to="/login">
              <Button>
                <span className=" white-text">
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    className="mr-1 white-text"
                  />{" "}
                  LOGIN
                </span>
              </Button>
            </Link>
          </NavItem>
        </>,
      ];
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar dark className="navbar" expand="sm">
        <NavbarBrand>
          <Link to="/" className="nav-brand white-text">
            CORONATRACK
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          {render()}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
