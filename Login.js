import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Header from "./Components/Header";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const call = async () => {
    let callData = await axios.get(
      `${process.env.REACT_APP_SERVER}/users.json`
    );
    let tempArray = [];
    Object.entries(callData.data).forEach(([key, value]) => {
      tempArray.push({
        id: key,
        name: value.name,
        email: value.email,
        password: value.password,
      });
    });
    setData(tempArray);
  };
  const submitHandler = () => {
    let index = data.findIndex((item) => item.name === name);
    if (index === -1) {
      alert("User does not exist!");
    } else {
      let dataArray = data[index];
      if (dataArray.name === name && dataArray.password === password) {
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            id: dataArray.id,
            name: dataArray.name,
            email: dataArray.email,
            password: dataArray.password,
            mailArray: []
          })
        );
        navigate("/cart");
      } else {
        alert("Incorrect username or password!");
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/cart");
    } else {
      call();
    }
  }, []);
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={6} className="mt-5 text-center offset-md-3">
            <h1>User Login</h1>
            <br />
            <form>
              <input
                type="name"
                placeholder="Enter your name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              />
              <br />
              <Button
                style={{ borderColor: "black" }}
                className="d-block w-100 bg-dark py-3"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </form>
            <br />
            <span>Haven't Registered yet? </span>
            <Link to="/signup">Sign Up</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;
