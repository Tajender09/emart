import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as Regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as Solid } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  let solid = props.ratings;
  let regular = props.ratings;
  regular = 5 - regular;
  let solidArray = [];
  let regularArray = [];
  for (let i = 0; i < solid; i++) {
    solidArray.push(<FontAwesomeIcon icon={Solid} key={i} />);
  }
  for (let j = 0; j < regular; j++) {
    regularArray.push(<FontAwesomeIcon icon={Regular} key={j} />);
  }
  return (
    <Card className="mt-4 product-box" style={{ width: "16rem" }}>
      <Link to={`/product/${props.id}`} className="link">
        <Card.Img
          variant="top"
          src={props.link}
          className="mt-3"
          style={{ height: "15rem" }}
        />
        <Card.Body>
          <Card.Text className="product-txt">{props.name}</Card.Text>
        </Card.Body>
        <Card.Body>
          <span>
            {solidArray}
            {regularArray}
          </span>
          <span>&nbsp;{props.ratings} reviews</span>
          <Card.Title className="mt-2">${props.price}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};
export default Product;
