import { useEffect, useState } from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Components/Header";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
  const submitHandler = async (event) => {
    event.preventDefault();
    let nameIndex = data.findIndex((item) => item.name === name);
    let mailIndex = data.findIndex((item) => item.email === email);
    if (nameIndex !== -1) {
      alert("Username Taken!");
    } else if (mailIndex !== -1) {
      alert("Email Taken!");
    } else if (name === "" || email === "" || password === "") {
      alert("Enter Correct Name and Email");
    } else {
      let dataObj = { name, email, password };
      let postData = await axios.post(
        `${process.env.REACT_APP_SERVER}/users.json`,
        dataObj
      );
      navigate("/login");
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
            <h1>User Sign Up</h1>
            <br />
            <form onSubmit={(event) => submitHandler(event)}>
              <input
                type="text"
                value={name}
                placeholder="Enter your name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              />
              <br />
              <Button
                type="submit"
                style={{ borderColor: "black" }}
                className="d-block w-100 bg-dark py-3"
              >
                Register
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Signup;
