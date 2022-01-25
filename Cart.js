import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PreLoader from "./Components/PreLoader";
import Empty from "./images/empty.png";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState("");
  let userInfo = JSON.parse(localStorage.getItem("user-info"));
  let items = 0;
  let total = 0;
  let orderArray = [];
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/billing");
  };
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
          id: key,
          name: value.name,
          link: value.link,
          totalPrice: value.totalPrice,
          qty: value.qty,
        });
      });
      setData(tempArray);
    }
    setLoader(false);
  };
  useEffect(() => {
    if (userInfo) {
      let newCall = setTimeout(() => {
        call();
        clearInterval(newCall);
      }, 1000);
    } else {
      navigate("/login");
    }
  }, []);
  const deleteHandler = async (id) => {
    let delData = await axios.delete(
      `${process.env.REACT_APP_SERVER}/users/${userInfo.id}/cart/${id}.json`
    );
    call();
  };
  return (
    <>
      <Header />
      <Container className="mt-2">
        <p className="fs-3">SHOPPING CART</p>
        {loader ? (
          <PreLoader />
        ) : (
          <Row>
            <Col md={7}>
              {data.length == 0 ? (
                <div className="text-center">
                  <Image src={Empty} className="w-100" />
                  <h5>Your cart is empty!</h5>
                </div>
              ) : (
                data.map((item) => {
                  items = items + parseInt(item.qty);
                  total = total + item.totalPrice;
                  return (
                    <Row key={item.id} className="border px-1 py-3">
                      <Col xs={2}>
                        <Image className="h-100 w-100" src={item.link} fluid />
                      </Col>
                      <Col xs={3}>
                        <span>{item.name}</span>
                      </Col>
                      <Col xs={2}>
                        <span>${item.totalPrice}</span>
                      </Col>
                      <Col xs={3}>
                        <span
                          style={{
                            backgroundColor: "lightGrey",
                            borderColor: "lightGrey",
                          }}
                          className="py-2 px-4"
                        >
                          {item.qty}
                        </span>
                      </Col>
                      <Col xs={2}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteHandler(item.id)}
                        />
                      </Col>
                    </Row>
                  );
                })
              )}
            </Col>
            <Col md={1} className="mt-5" />
            <Col md={4} className="d-flex justify-content-center h-100">
              <Card style={{ width: "18rem" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item style={{ letterSpacing: "3px" }}>
                    TOTAL ITEMS : {items}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ letterSpacing: "3px" }}>
                    TOTAL PRICE : $ {total}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={checkoutHandler}
                      style={{ borderColor: "black" }}
                      className="d-block w-100 bg-dark py-3"
                    >
                      CHECKOUT
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};
export default Cart;
