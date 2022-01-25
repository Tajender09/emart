import { Carousel } from "react-bootstrap";

const Slider = () => {
  return (
    <Carousel style={{height: "500px"}}>
      <Carousel.Item style={{height: "500px"}}>
        <img
          className="d-block w-100 h-100"
          src="https://i.postimg.cc/KjNpt4Pc/airpods2.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item style={{height: "500px"}}>
        <img
          className="d-block w-100 h-100"
          src="https://i.postimg.cc/76qg09m7/amazon2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item style={{height: "500px"}}>
        <img
          className="d-block w-100 h-100"
          src="https://i.postimg.cc/gJr2C60Q/fitbit2.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};
export default Slider;
