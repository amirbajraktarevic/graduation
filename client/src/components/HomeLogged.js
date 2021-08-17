import { Form, FormGroup, Input, Card } from "reactstrap";
import FadeIn from "react-fade-in";
import "../App.css";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faExclamationTriangle,
  faUserLock,
  faSyringe,
  faStarOfLife,
  faVirus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const HomeLogged = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();
  useEffect(() => {
    fetch("/people", {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, []);

  console.log(search);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <FadeIn>
        <div className="container px-5 blue-text">
          <div className="text-right mt-2">
            {user.role === "Doctor" ? (
              <Link className="button" to="/addperson">
                <Button variant="outlined" color="default">
                  <FontAwesomeIcon className="mr-2" icon={faPlus} />
                  Add person
                </Button>
              </Link>
            ) : (
              ""
            )}
          </div>
          <h1 className="mt-5">Welcome, {user.name}</h1>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Form className="w-50 mt-5">
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Search for a person here"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                ></Input>
                <Button disabled className="mt-2">
                  Search
                  <FontAwesomeIcon className="ml-2" icon={faSearch} />
                </Button>
              </FormGroup>
            </Form>
          </div>
          {data
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.firstName.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => {
              return (
                <div className="px-5" key={item._id}>
                  <Card className="mb-3">
                    <div className="row mt-2 mb-2">
                      <div className="col-md-8 text-left">
                        <div className="ml-3">
                          <h3>
                            {item.firstName} {item.lastName}{" "}
                            {item.djela.length > 2 ? (
                              <FontAwesomeIcon icon={faExclamationTriangle} />
                            ) : (
                              ""
                            )}
                            {item.coronaStatus ? (
                              <FontAwesomeIcon icon={faVirus} />
                            ) : (
                              ""
                            )}
                            {item.isolationStatus ? (
                              <FontAwesomeIcon
                                className="ml-2"
                                icon={faUserLock}
                              />
                            ) : (
                              ""
                            )}
                            {item.vacStatus ? (
                              <FontAwesomeIcon
                                className="ml-2"
                                icon={faSyringe}
                              />
                            ) : (
                              ""
                            )}
                            {item.reVac ? (
                              <FontAwesomeIcon
                                className="ml-2"
                                icon={faStarOfLife}
                              />
                            ) : (
                              ""
                            )}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <Button
                          onClick={() => {
                            setOpen(!isOpen);
                          }}
                          variant="contained"
                          color="primary"
                        >
                          {isOpen ? "Close" : "Expand"}
                        </Button>
                        <Button
                          className="ml-2"
                          onClick={() => {
                            history.push(`/profile/${item._id}`);
                          }}
                          variant="contained"
                          color="secondary"
                        >
                          Profile
                        </Button>
                      </div>
                    </div>
                    {isOpen ? (
                      <div className="text-left ml-2 mb-2">
                        <span>
                          <strong>INFORMATION:</strong>
                        </span>
                        <hr />
                        <span>
                          <strong>ID number:</strong> {item.id}
                        </span>
                        <br />
                        <span>
                          <strong>Adress:</strong> {item.address}
                        </span>
                        <br />
                        <span>
                          <strong>Corona status:</strong>{" "}
                          {item.coronaStatus ? "Positive" : "Negative"}
                        </span>
                        <br />
                        <span>
                          <strong>Vaccination status:</strong>{" "}
                          {item.vacStatus ? "Positive" : "Negative"}
                        </span>
                        <br />
                        <span>
                          <strong>Vaccination date:</strong>{" "}
                          {item.vacStatus ? item.vacDate : "Not vaccinated"}
                        </span>
                        <br />
                        <span>
                          <strong>Revaccination status:</strong>{" "}
                          {item.reVac ? "Positive" : "Negative"}
                        </span>
                        <br />
                        <span>
                          <strong>Revaccination date:</strong>{" "}
                          {item.reVac ? item.reVacDate : "Not revaccinated"}
                        </span>
                        <br />
                        <span>
                          <strong>Isolation status:</strong>{" "}
                          {item.isolationStatus ? "Positive" : "Negative"}
                        </span>
                        <br />
                        <span>
                          <strong>Isolation start date:</strong>{" "}
                          {item.isolationStatus
                            ? item.isolationDate
                            : "Not in isolation"}
                        </span>
                        <br />
                        <span>
                          <strong>Isolation end date:</strong>{" "}
                          {item.isolationStatus
                            ? item.isolationEndDate
                            : "Not in isolation"}
                        </span>
                        {user.role === "Police" ? (
                          <div>
                            <hr />
                            <span>
                              <strong>OFFENSES:</strong>
                            </span>
                            <br />
                            {item.djela.map((djelo) => {
                              return (
                                <div key={djelo._id}>
                                  <span>
                                    <strong>Name: </strong>
                                    {djelo.name}
                                  </span>
                                  <br />
                                  <span>
                                    <strong>Decription: </strong>
                                    {djelo.description}
                                  </span>
                                  <br />
                                  <span>
                                    <strong>Date:</strong> {djelo.date}
                                  </span>
                                  <br />
                                  <span>
                                    <strong>Ticket:</strong> {djelo.ticket}
                                  </span>
                                  <hr />
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </Card>
                </div>
              );
            })}
          <div className="mt-5 mb-3 text-left">
            <span className="mr-2">
              <FontAwesomeIcon icon={faExclamationTriangle} /> - Person is a
              repeat offender (more than 3 offenses)
            </span>
            <span className="mr-2">
              {" "}
              <FontAwesomeIcon icon={faVirus} /> - Person is currently positive
              for corona virus
            </span>
            <span className="mr-2">
              <FontAwesomeIcon icon={faUserLock} /> - Person is currently in
              isolation
            </span>
            <br />
            <div className="text-center">
              <span className="mr-2">
                <FontAwesomeIcon icon={faSyringe} /> - Person is vaccinated
              </span>
              <span className="mr-2">
                <FontAwesomeIcon icon={faStarOfLife} /> - Person is revaccinated
              </span>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default HomeLogged;
