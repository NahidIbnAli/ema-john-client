import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../../contexts/UserContext";
import Button from "react-bootstrap/Button";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-lg-3 text-center">
            <Link to="/shop" className="nav-link">
              Shop
            </Link>
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
            <Link to="/inventory" className="nav-link">
              Inventory
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            {user?.uid ? (
              <Button onClick={handleSignOut} variant="danger">
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/signup" className="nav-link">
                  Sign up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
