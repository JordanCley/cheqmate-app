import React from "react";
import { Container } from "react-bootstrap";

import FooterComponent from "../components/FooterComponent";
import ProfileComponent from "../components/ProfileComponent";

function Profile() {
  return (
    <Container className={"main-Container img-background"}>
      <ProfileComponent />
      <FooterComponent />
    </Container>
  );
}

export default Profile;
