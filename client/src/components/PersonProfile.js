import "../App.css";
import FadeIn from "react-fade-in";
import { Link, useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlusCircle,
  faList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

const PersonProfile = () => {
  const history = useHistory();
  const { userid } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [personData, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  console.log(userid);
  useEffect(() => {
    fetch(`/people/${userid}`, {
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

  const DeletePerson = () => {
    fetch(`/people/${userid}`, {
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("Person succesfully deleted");
        history.push("/search");
      });
  };

  return (
    <div className="container px-5 mb-5">
      <FadeIn>
        {user.role === "Doctor" ? (
          <div className="text-right mt-2">
            <Button
              onClick={() => {
                history.push(`/editperson/${userid}`);
              }}
              variant="contained"
              color="primary"
            >
              <FontAwesomeIcon className="mr-2" icon={faEdit} />
              Edit person
            </Button>
          </div>
        ) : (
          ""
        )}
        <div className="mt-5">
          <h1>
            {personData.firstName} {personData.lastName}
          </h1>
        </div>
        <hr />
        <div className="text-left">
          <span>
            <strong>ID number:</strong> {personData.id}{" "}
          </span>
          <br />
          <span>
            <strong>Address:</strong> {personData.address}{" "}
          </span>
          <br />
          <span>
            <strong>Coronavirus Status:</strong>{" "}
            {personData.coronaStatus ? "Positive" : "Negative"}
          </span>
          <br />
          <span>
            <strong>Vaccination Status:</strong>{" "}
            {personData.vacStatus ? "Positive" : "Negative"}{" "}
          </span>
          <br />
          <span>
            <strong>Vaccination date:</strong>{" "}
            {personData.vacStatus ? personData.vacDate : "Not vaccinated"}
          </span>
          <br />
          <span>
            <strong> Re-vaccination Status:</strong>{" "}
            {personData.reVac ? "Positive" : "Negative"}{" "}
          </span>
          <br />
          <span>
            <strong>Revaccination date:</strong>{" "}
            {personData.reVac ? personData.reVacDate : "Not revaccinated"}
          </span>
          <br />
          <span>
            <strong>Isolation Status:</strong>{" "}
            {personData.isolationStatus ? "Positive" : "Negative"}{" "}
          </span>
          <br />
          <span>
            <strong>Isolation start date:</strong>{" "}
            {personData.isolationStatus
              ? personData.isolationDate
              : "Not in isolation"}
          </span>
          <br />
          <span>
            <strong>Isolation end date:</strong>{" "}
            {personData.isolationStatus
              ? personData.isolationEndDate
              : "Not in isolation"}
          </span>
        </div>
        <hr />

        <div className="mt-3 mb-5">
          {user.role === "Police" ? (
            <Link>
              <Button
                onClick={() => {
                  history.push(`/addoffense/${personData._id}`);
                }}
                variant="contained"
                color="primary"
              >
                <FontAwesomeIcon className="mr-1" icon={faPlusCircle} />
                Add Offense
              </Button>
            </Link>
          ) : (
            ""
          )}
          {user.role === "Police" ? (
            <Button
              onClick={() => setToggle(!toggle)}
              className="ml-2"
              variant="contained"
              color="default"
            >
              <FontAwesomeIcon className="mr-2" icon={faList} />
              {toggle ? "Collapse" : "See offenses"}
            </Button>
          ) : (
            ""
          )}
          <Button
            className="ml-2"
            onClick={() => DeletePerson()}
            variant="contained"
            color="secondary"
          >
            {" "}
            <FontAwesomeIcon className="mr-2" icon={faTrash} />
            Delete
          </Button>
        </div>

        {toggle ? (
          <>
            <div>
              <div className="mb-5">
                <h2>Offenses:</h2>
              </div>
              {personData.djela.map((djelo) => {
                return (
                  <div key={djelo._id} className="row justify-conent-center">
                    <div className="col-auto mx-auto mb-2">
                      <table className="table table-responsive ">
                        <tr>
                          <th>Date of offense:</th>
                          <td>{djelo.date}</td>
                          <th>Name of offense:</th>
                          <td>{djelo.name}</td>
                          <th>Description of offense:</th>
                          <td> {djelo.description}</td>
                          <th>Ticket issued:</th>
                          <td>{djelo.ticket}KM</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mb-5">
              <h4>Offense counter: {personData.djela.length}</h4>
            </div>
          </>
        ) : (
          ""
        )}
      </FadeIn>
    </div>
  );
};

export default PersonProfile;
