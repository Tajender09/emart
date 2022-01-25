import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  let userInfo = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  }
  return (
    <Navbar bg="dark" variant="dark" className="py-4">
      <Container>
        <Link
          style={{ textDecoration: "none" }}
          to="/emart"
          className="navbar-dark navbar-nav nav-link align-items-center fs-4 text-light"
        >
          E-Mart
        </Link>
        <Nav className="me-auto">
          <Link
            to="/cart"
            className="navbar-dark navbar-nav nav-link align-items-center"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            &nbsp;Cart
          </Link>
          {userInfo ? null : (
            <Link
              to="/login"
              className="navbar-dark navbar-nav nav-link align-items-center"
            >
              <FontAwesomeIcon icon={faUser} />
              &nbsp;Login
            </Link>
          )}
        </Nav>
        <Nav>
          {userInfo ? (
            <NavDropdown title={userInfo.name}>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : null}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
