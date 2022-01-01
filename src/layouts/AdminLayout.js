import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import MyNavbar from "../components/AdminNavbar";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <MyNavbar />
      {/* Admin Sidebar */}
      <Container>
        <Row>
          <Col md={3} className="bg-gray" style={{ minHeight: "300px" }}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <LinkContainer to="/admin">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/admin/products">
                  <Nav.Link>Products</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/admin/categories">
                  <Nav.Link>Categories</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLayout;
