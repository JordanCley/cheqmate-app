import React, { useContext, useState } from "react";
import { OrderContext } from "../utils/context/OrderContext.js";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../utils/auth";
import API from "./../utils/API/API";
import { Button, Container } from "react-bootstrap";
import "../index.css";

import ErrorAlertComponent from "./ErrorAlertComponent";

function Signup() {
  const { errorState, setErrorState } = useContext(OrderContext);
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { isLoggedIn, login } = useAuth();

  if (isLoggedIn) {
    return <Redirect to={"/"} />;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    API.signUpUser(
      formState.first_name,
      formState.last_name,
      formState.email,
      formState.password
    )
      .then(() => {
        login(formState.email, formState.password);
      })
      .catch((err) => setErrorState(err.response.data.message));
  };

  const isEnabled =
    formState.first_name.length > 0 &&
    formState.last_name.length > 0 &&
    formState.email.length > 0 &&
    formState.password.length > 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container>
      {errorState !== null ? (
        <>
          <ErrorAlertComponent
            text={"Exit"}
            variant={"danger"}
            to={"/signup"}
            button={"outline-danger"}
          />
        </>
      ) : (
        <>
          <h1>Signup</h1>
          <form onSubmit={handleFormSubmit}>
            <div className={"form-group"}>
              <label htmlFor={"first_name"}>First Name:</label>
              <input
                className={"form-control"}
                placeholder={"Joe"}
                name={"first_name"}
                type={"text"}
                id={"first_name"}
                onChange={handleChange}
              />
            </div>
            <div className={"form-group"}>
              <label htmlFor={"last_name"}>Last Name:</label>
              <input
                className={"form-control"}
                placeholder={"Exotic"}
                name={"last_name"}
                type={"text"}
                id={"last_name"}
                onChange={handleChange}
              />
            </div>
            <div className={"form-group"}>
              <label htmlFor={"email"}>Email address:</label>
              <input
                className={"form-control"}
                placeholder={"TigerKing@ItwasthatBCaroleBaskin.com"}
                name={"email"}
                type={"email"}
                id={"email"}
                onChange={handleChange}
              />
            </div>
            <div className={"form-group"}>
              <label htmlFor={"pwd"}>Password:</label>
              <input
                className={"form-control"}
                placeholder={"********"}
                name={"password"}
                type={"password"}
                id={"pwd"}
                onChange={handleChange}
              />
            </div>
            <Button
              disabled={!isEnabled}
              type={"submit"}
              className={"success-Btn"}
              variant={"outline-success mb-4"}
            >
              Submit
            </Button>
          </form>

          <h4>Already have an account with us?</h4>

          <Link to={"/login"}>
            <Button className={"success-Btn"} variant={"outline-primary"}>
              Go to Login
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
}

export default Signup;
