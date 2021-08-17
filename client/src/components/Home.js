import "../App.css";
import { Button } from "@material-ui/core";
import FadeIn from "react-fade-in";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center background blue-text ">
      <FadeIn>
        <div className="text-center ">
          {/* <img src={logo} className="logo"></img> */}
        </div>
        <br />
        <br />
        <br />

        <Link className="button" to="/about">
          <Button className="mt-5" variant="contained" color="primary">
            <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
            Learn more
          </Button>
        </Link>
      </FadeIn>
    </div>
  );
};

export default Home;
