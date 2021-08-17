import { Switch, Route, useHistory } from "react-router-dom";
import Profile from "./Profile";
import Search from "./HomeLogged";
import CreatePerson from "./CreatePerson";
import PersonProfile from "./PersonProfile";
import EditPerson from "./EditPerson";
import AddOffense from "./AddOffense";
import Home from "./Home";
import HomeLogged from "./HomeLogged";
import About from "./About";
import Signup from "./Signup";
import Login from "./Login";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/");
    }
  }, []);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search" exact component={Search} />
      <Route path="/about" component={About} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={HomeLogged} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/addperson" component={CreatePerson} />
      <Route path="/profile/:userid" component={PersonProfile} />
      <Route path="/editperson/:personid" component={EditPerson} />
      <Route path="/addoffense/:personid" component={AddOffense} />
    </Switch>
  );
};

export default Routing;
