import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import Product from "./Components/Product";
import Slider from "./Slider";
import PreLoader from "./Components/PreLoader";
import Header from "./Components/Header"

const Products = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState([true]);
  const Call = async () => {
    let callData = await axios.get(
      `${process.env.REACT_APP_SERVER}/images.json`
    );
    let tempArray = [];
    Object.entries(callData.data).forEach(([key, value]) => {
      tempArray.push({
        id: key,
        name: value.name,
        link: value.link,
        price: value.price,
        rating: value.rating,
      });
    });
    setData(tempArray);
    setLoader(false);
  };
  useEffect(() => {
    Call();
  }, []);
  return (
    <>
      <Header />
      <Slider />
      <Container>
        <h1 className="mt-5 text-center">Latest Products</h1>
        {loader ? (
          <PreLoader />
        ) : (
          <Row className="justify-content-around mt-3">
            {data.map((item) => {
              return (
                <Product
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  link={item.link}
                  ratings={item.rating}
                  price={item.price}
                />
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
};
export default Products;
