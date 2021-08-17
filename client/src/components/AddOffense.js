import { Form, FormGroup, Label, Input, Card } from "reactstrap";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import FadeIn from "react-fade-in";

const AddOffense = () => {
  const { personid } = useParams();
  const currentDate = new Date();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ticket, setTicket] = useState("");

  console.log(personid);

  const logOvo = () => {
    console.log(name);
    console.log(description);
    console.log(ticket);
    console.log(personid);
  };
  const OffenseData = () => {
    fetch(`/people/${personid}`, {
      method: "post",
      headers: {
        Authorization: localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        ticket: ticket,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Offense succesfully made!");
          history.push(`/profile/${personid}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container px-5 mt-5">
      <FadeIn>
        <Card>
          <div className="mt-4">
            <h1>Add offense</h1>
          </div>
          <hr />
          <div className="d-flex justify-content-center">
            <div className="registration-form">
              <Form className="mb-5">
                <FormGroup>
                  <Label>Offense name:</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Description:</Label>
                  <Input
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    type="textarea"
                    size="200"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Ticket:</Label>
                  <Input
                    value={ticket}
                    onChange={(e) => {
                      setTicket(e.target.value);
                    }}
                    type="number"
                    min="0"
                    className="ticket-number"
                  />{" "}
                  KM
                </FormGroup>
                <Button
                  onClick={() => OffenseData()}
                  variant="contained"
                  color="secondary"
                >
                  Add offense
                  <FontAwesomeIcon className="ml-1" icon={faPlus} />
                </Button>
                <Button onClick={() => logOvo()} variant="contained">
                  Check
                </Button>
              </Form>
              <span>
                Date: {currentDate.getDate()}.{currentDate.getMonth() + 1}.
                {currentDate.getFullYear()}
              </span>
            </div>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
};

export default AddOffense;
