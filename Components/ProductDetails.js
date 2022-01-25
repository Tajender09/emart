import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as Regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as Solid } from "@fortawesome/free-solid-svg-icons";
import PreLoader from "./PreLoader";
import Header from "./Header";

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState([true]);
  const [val, setVal] = useState(1);
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const call = async () => {
    let callData = await axios.get(
      `${process.env.REACT_APP_SERVER}/images/${id}.json`
    );
    setData(callData.data);
    setLoader(false);
  };
  const clickHandler = async () => {
    if(userInfo){
      let totalPrice = Math.ceil(data.price * val);
      let dataObj = {
        link: data.link,
        name: data.name,
        price: data.price,
        totalPrice: totalPrice,
        qty: val,
      };
      let postApi = await axios.post(
        `${process.env.REACT_APP_SERVER}/users/${userInfo.id}/cart.json/`,
        dataObj
      );
    }
    else{
      alert("Please Login to Add Items to Cart!");
    }
  };
  useEffect(() => {
    call();
  }, []);
  return (
    <>
      <Header />
      <Container className="mt-5">
        {loader ? (
          <PreLoader />
        ) : (
          <Row>
            <Col lg={6}>
              <Image src={data.link} fluid className="h-100 w-100" />
            </Col>
            <Col lg={6}>
              <Row>
                <Col md={6} className="d-flex justify-content-center">
                  <Card style={{ width: "16rem", border: "none" }}>
                    <ListGroup variant="flush">
                      <ListGroup.Item
                        className="fs-2"
                        style={{ letterSpacing: "3px" }}
                      >
                        {data.name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span>
                          <FontAwesomeIcon icon={Regular} />
                          <FontAwesomeIcon icon={Regular} />
                          <FontAwesomeIcon icon={Regular} />
                          <FontAwesomeIcon icon={Regular} />
                          <FontAwesomeIcon icon={Regular} />
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>Price: ${data.price}</ListGroup.Item>
                      <ListGroup.Item>
                        Description: {data.description}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
                <Col md={6} className="d-flex justify-content-center h-100">
                  <Card className="mt-3" style={{ width: "16rem" }}>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between">
                        <span>Price:</span>
                        <span>${data.price}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <span>Status:</span>
                        <span className="fw-bold text-success">In Stock</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                        <span>Qty:</span>
                        <select
                          value={val}
                          onChange={(e) => {
                            setVal(e.target.value);
                          }}
                          style={{
                            backgroundColor: "lightGrey",
                            borderColor: "lightGrey",
                          }}
                          className="py-2 px-3"
                        >
                          <option value="1" className="bg-light">
                            1
                          </option>
                          <option value="2" className="bg-light">
                            2
                          </option>
                          <option value="3" className="bg-light">
                            3
                          </option>
                          <option value="4" className="bg-light">
                            4
                          </option>
                          <option value="5" className="bg-light">
                            5
                          </option>
                        </select>
                      </ListGroup.Item>
                      <ListGroup.Item className="text-center py-3">
                        <Link
                          onClick={clickHandler}
                          className="d-block w-100 bg-dark text-light py-3"
                          style={{
                            borderColor: "black",
                            fontSize: "0.9rem",
                            textDecorationLine: "none",
                          }}
                          to={`/cart`}
                        >
                          ADD TO CART
                        </Link>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};
export default ProductDetails;
