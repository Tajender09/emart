import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Container, Col, Button } from "react-bootstrap";
import Header from "./Components/Header";
import axios from "axios";
import PreLoader from "./Components/PreLoader";
import emailjs from "emailjs-com";

const BillingInfo = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [products, setProducts] = useState([]);
  let items = [];
  const call = async () => {
    let callData = await axios.get(
      `${process.env.REACT_APP_SERVER}/users/${userInfo.id}/cart.json`
    );
    if (callData.data === null) {
      setData([]);
    } else {
      let tempArray = [];
      Object.entries(callData.data).forEach(([key, value]) => {
        tempArray.push({
          name: value.name,
          totalPrice: value.totalPrice,
          qty: value.qty,
        });
      });
      Object.assign(userInfo.mailArray, tempArray);
      userInfo.mailArray.map((item) => {
        items.push(` ${item.qty} ${item.name}`);
      });
      setProducts(items);
    }
    setLoader(false);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (products.length === 0) {
      alert("Add Products to your cart before ordering.");
    } else {
      emailjs
        .sendForm(
          "service_7pi560u",
          "template_0fzzqgg",
          event.target,
          "user_9qAn41D3XzLtHdnXVnsPQ"
        )
        .then((res) => {
          alert("Your order details will be sent on your email!");
          navigate("/emart");
        })
        .catch((err) => alert("There was an error placing your order!"));
      let delData = await axios.delete(
        `${process.env.REACT_APP_SERVER}/users/${userInfo.id}/cart.json`
      );
    }
  };
  useEffect(() => {
    if (userInfo) {
      let newCall = setTimeout(() => {
        call();
        clearInterval(newCall);
      }, 1000);
    }
  }, []);
  return (
    <>
      <Header />
      {loader ? (
        <PreLoader />
      ) : (
        <Container>
          <Row>
            <Col md={6} className="mt-5 text-center offset-md-3">
              <h1>Enter Billing Information</h1>
              <br />
              <form onSubmit={(event) => submitHandler(event)}>
                <input
                  type="text"
                  value={name}
                  name="name"
                  placeholder="Enter your name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <input
                  type="email"
                  value={email}
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <textarea
                  className="form-control"
                  rows="5"
                  style={{ resize: "none" }}
                  value={products}
                  name="message"
                />
                <br />
                <Button
                  style={{ borderColor: "black" }}
                  className="d-block w-100 bg-dark py-3"
                  type="submit"
                >
                  Place Order
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
      )}
      ;
    </>
  );
};
export default BillingInfo;
