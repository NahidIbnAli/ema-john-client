import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import loginStyle from "./Login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleLogo from "../../images/google.svg";
import { AuthContext } from "../../contexts/UserContext";

const Login = () => {
  const { signIn, signInGoogle } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        form.reset();
        const currentUser = { email: result.user.email };
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("ema-john", JSON.stringify(data.token));
          });
        navigate(from, { replace: true });
        console.log(result.user);
      })
      .catch((error) => console.error(error));
  };

  const handleSignInWithGoogle = () => {
    signInGoogle()
      .then((result) => {
        navigate(from, { replace: true });
        console.log(result.user);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="pt-5 px-4">
      <Card className={`${loginStyle.cardd} mx-auto mt-3`}>
        <Card.Body className="p-lg-5">
          <h3 className="fs-2 text-center mb-4">Login</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                className="py-2"
                type="email"
                placeholder="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                className="py-2"
                type="password"
                placeholder="password"
                required
              />
            </Form.Group>
            <div className="pt-1"></div>
            <Button
              className={`d-block w-100 py-2 mt-3 text-dark fw-semibold ${
                (loginStyle.bgCustom, loginStyle.btnCustom)
              }`}
              type="submit"
            >
              Login
            </Button>
          </Form>
          <p className="text-center mt-2">
            New to Ema-john?{" "}
            <Link to="/signup" className="text-warning text-decoration-none">
              Create New Account
            </Link>
          </p>
          <div className={`${loginStyle.divider}`}>
            <div>
              <hr />
            </div>
            <p className="text-center">or</p>
            <div>
              <hr />
            </div>
          </div>
          <Button
            onClick={handleSignInWithGoogle}
            className={`py-2 d-block w-100 mt-3 ${loginStyle.btnCustomTwo} d-flex align-items-center justify-content-center gap-1`}
          >
            <div>
              <img src={googleLogo} alt="" className="w-75" />{" "}
            </div>
            <span> Continue With Google</span>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
