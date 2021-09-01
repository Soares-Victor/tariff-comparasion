
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink target="_blank" href="https://github.com/Soares-Victor/tariff-comparasion">
              Github Project
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made with{" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <a
            href="https://www.linkedin.com/in/victor-soares-81292673/"
            target="_blank"
          >
            Victor Soares
          </a>{" "}.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
