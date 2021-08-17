import { useHistory, useParams } from "react-router";
import "../App.css";
import FadeIn from "react-fade-in";
import { Card, Form, FormGroup, Input, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const EditPerson = () => {
  const { personid } = useParams();
  const history = useHistory();
  const [isVacc, setIsVac] = useState(false);
  const [info, setInfo] = useState([]);
  const [coronaStatus, setCoronaStatus] = useState(false);
  const [vacStatus, setVacStatus] = useState(false);
  const [reVac, setreVac] = useState(false);
  const [isolationStatus, setIsolationStatus] = useState(false);

  const check = () => {
    console.clear();
    console.log(coronaStatus);
    console.log(vacStatus);
    console.log(reVac);
    console.log(isolationStatus);
  };

  useEffect(() => {
    fetch(`/people/${personid}`, {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setInfo(result);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PersonUpdate = () => {
    fetch(`/people/${personid}`, {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coronaStatus: coronaStatus,
        vacStatus: vacStatus,
        reVac: reVac,
        isolationStatus: isolationStatus,
      }),
    })
      .then((res) => res.json)
      .then((info) => {
        if (info.error) {
          alert(info.error);
        } else {
          alert("Person succesfully updated");
          history.push(`/profile/${personid}`);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleClick = () => {
    setIsVac(!isVacc);
  };
  return (
    <div className="container">
      <FadeIn>
        <Card className="ml-5 mr-5 pr-5 pl-5 mb-5 mt-5">
          <div className="mt-5">
            <h1>
              Edit person:
              <br />
              {info.firstName} {info.lastName}
            </h1>
            <hr />
          </div>
          <Form className="mb-5">
            <FormGroup tag="fieldset" className="text-left mt-5">
              <legend>
                Corona status: <br />
                <span className="caption">
                  <em>Current:{info.coronaStatus ? "Positive" : "Negative"}</em>
                </span>
              </legend>
              <hr />
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="coronaStatus"
                    id="coronastatus"
                    onChange={() => setCoronaStatus(true)}
                    required
                  />{" "}
                  <span>Positive</span>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="coronaStatus"
                    id="coronastatus"
                    value={coronaStatus}
                    onChange={() => setCoronaStatus(false)}
                    required
                  />{" "}
                  <span>Negative</span>
                </Label>
              </FormGroup>
            </FormGroup>
            <Button
              variant="outlined"
              color="default"
              onClick={handleClick}
              className="mb-5 h-100"
            >
              <span>
                {isVacc ? "PATIENT NOT VACCINATED" : "PATIENT VACCINATED"}
              </span>
            </Button>
            {isVacc ? (
              <FormGroup tag="fieldset" className="text-left">
                <legend>Vaccination status:</legend>
                <span className="caption">
                  <em>Current:{info.vacStatus ? "Positive" : "Negative"}</em>
                </span>
                <hr />
                <FormGroup>
                  <Label>
                    <Input
                      type="radio"
                      name="vacStatus"
                      id="vacStatus"
                      onClick={() => setVacStatus(true)}
                    />{" "}
                    <span>Positive</span>
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    <Input
                      type="radio"
                      name="vacStatus"
                      id="vacStatus"
                      onClick={() => setVacStatus(false)}
                      defaultChecked
                    />{" "}
                    <span>Negative</span>
                  </Label>
                </FormGroup>
              </FormGroup>
            ) : (
              ""
            )}
            {isVacc ? (
              vacStatus ? (
                <FormGroup tag="fieldset" className="text-left">
                  <legend>Re-vaccination status:</legend>
                  <span className="caption">
                    <em>Current:{info.reVac ? "Positive" : "Negative"}</em>
                  </span>
                  <hr />
                  <FormGroup>
                    <Label>
                      <Input
                        type="radio"
                        name="reVac"
                        onChange={() => setreVac(true)}
                        required
                      />{" "}
                      <span>Positive</span>
                    </Label>
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      <Input
                        type="radio"
                        name="reVac"
                        onChange={() => setreVac(false)}
                        defaultChecked
                        required
                      />{" "}
                      <span>Negative</span>
                    </Label>
                  </FormGroup>
                </FormGroup>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <FormGroup tag="fieldset" className="text-left">
              <legend>Isolation status:</legend>
              <span className="caption">
                <em>
                  Current:{info.isolationStatus ? "Positive" : "Negative"}
                </em>{" "}
              </span>
              <hr />
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="isolationStatus"
                    id="isolationStatus"
                    onClick={() => setIsolationStatus(true)}
                    required
                  />{" "}
                  <span>Positive</span>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    type="radio"
                    name="isolationStatus"
                    id="isolationStatus"
                    onClick={() => setIsolationStatus(false)}
                    required
                  />{" "}
                  <span>Negative</span>
                </Label>
              </FormGroup>
            </FormGroup>
            <Button
              onClick={() => PersonUpdate()}
              color="primary"
              variant="contained"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save
            </Button>
            <Button
              className="ml-3"
              onClick={() => check()}
              color="secondary"
              variant="contained"
            >
              check
            </Button>
          </Form>
        </Card>
      </FadeIn>
    </div>
  );
};

export default EditPerson;
