import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { appConfig } from "../configs/app";
import { LinkContainer } from "react-router-bootstrap";

const AdminNavbar = () => {
  return (
    <Navbar bg="light" className="mb-3">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>{appConfig.appName}</Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
