import React, { useContext } from "react";
import { OrderContext } from "../utils/context/OrderContext.js";
import { useAuth } from "../utils/auth";
import { Container } from "react-bootstrap";
import logo from "../assets/cheqmate-logo.svg";

import ErrorAlertComponent from "../components/ErrorAlertComponent";
import LoadingComponent from "../components/LoadingComponent";

const ThankYou = () => {
  const { errorState, isLoading } = useContext(OrderContext);
  const { user } = useAuth();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Container>
      {errorState !== null ? (
        <ErrorAlertComponent
          text={"Exit"}
          variant={"success"}
          to={"/"}
          button={"outline-danger"}
        />
      ) : (
        <>
          <ErrorAlertComponent
            message={"Your check has been paid."}
            text={"Home"}
            variant={"success"}
            to={"/"}
            button={"outline-success"}
          />

          <br />
          <img src={logo} className={"app-logo mt-4 mb-2"} alt={"logo"} />
          <br />

          <h1>Thank you for your visit, {user.first_name}.</h1>
          <h2>See you next time!</h2>
        </>
      )}
    </Container>
  );
};

export default ThankYou;
