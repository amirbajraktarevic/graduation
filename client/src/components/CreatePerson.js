import { useState } from "react";
import { Card, Form, FormGroup, Input, Label } from "reactstrap";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCardAlt,
  faIdCard,
  faMapMarker,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import FadeIn from "react-fade-in";

const CreatePerson = () => {
  const [isVacc, setIsVac] = useState(false);
  const history = useHistory();
  const [id, setId] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setAddress] = useState("");
  const [coronaStatus, setCoronaStatus] = useState("false");
  const [vacStatus, setVacStatus] = useState("false");
  const [reVac, setreVac] = useState("false");
  const [isolationStatus, setIsolationStatus] = useState("false");

  const PersonData = () => {
    if (id.length > 13 || id.length < 13) {
      alert("Id must have 13 characters");
      return;
    }
    fetch("/createperson", {
      method: "post",
      headers: {
        Authorization: localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        firstName: firstName,
        lastName: lastName,
        address: address,
        coronaStatus: coronaStatus,
        vacStatus: vacStatus,
        reVac: reVac,
        isolationStatus: isolationStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Person succesfully made!");
          history.push("/search");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    setIsVac(!isVacc);
  };
  return (
    <div className="container mt-5 px-5">
      <FadeIn>
        <div>
          <Card className="ml-5 mr-5 pr-5 pl-5 mb-5 mt-5">
            <div className="mt-4">
              <h1>Add a person</h1>
            </div>

            <hr />
            <Form className="mb-5">
              <FormGroup>
                <Label for="id">
                  <FontAwesomeIcon icon={faIdCardAlt} className="mr-2 mt-2" />{" "}
                  ID number:{" "}
                </Label>
                <Input
                  type="text"
                  name="id"
                  id="id"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  placeholder="Enter unique ID of citizen here"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="firstName">
                  <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                  First name:{" "}
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  placeholder="Enter first name here"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">
                  {" "}
                  <FontAwesomeIcon icon={faIdCard} className="mr-2" /> Last
                  name:{" "}
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Enter last name here"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">
                  {" "}
                  <FontAwesomeIcon icon={faMapMarker} className="mr-2" />{" "}
                  Address:{" "}
                </Label>
                <Input
                  type="text"
                  name="address"
                  id="adress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address here"
                  required
                />
              </FormGroup>
              <FormGroup tag="fieldset" className="text-left mt-5">
                <legend>Corona status:</legend>
                <hr />
                <FormGroup>
                  <Label>
                    <Input
                      type="radio"
                      name="coronaStatus"
                      id="coronastatus"
                      onChange={() => setCoronaStatus("true")}
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
                      onChange={() => setCoronaStatus("false")}
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
                  <hr />
                  <FormGroup>
                    <Label>
                      <Input
                        type="radio"
                        name="vacStatus"
                        id="vacStatus"
                        //   value={vacStatus}
                        onClick={() => setVacStatus("true")}
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
                        onClick={() => setVacStatus("false")}
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
                    <hr />
                    <FormGroup>
                      <Label>
                        <Input
                          type="radio"
                          name="reVac"
                          onChange={() => setreVac("true")}
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
                          onChange={() => setreVac("false")}
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
                <hr />
                <FormGroup>
                  <Label>
                    <Input
                      type="radio"
                      name="isolationStatus"
                      id="isolationStatus"
                      onClick={() => setIsolationStatus("true")}
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
                      onClick={() => setIsolationStatus("false")}
                      required
                    />{" "}
                    <span>Negative</span>
                  </Label>
                </FormGroup>
              </FormGroup>
              <Button
                color="primary"
                variant="contained"
                onClick={() => PersonData()}
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                SUBMIT
              </Button>
            </Form>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
};

export default CreatePerson;
