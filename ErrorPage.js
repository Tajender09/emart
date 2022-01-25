import Error from "./images/error.png";
import { Image, Container } from "react-bootstrap";

const ErrorPage = () => {
  return(
      <Container className="text-center py-5">
        <Image src="https://topmeaning.com/english/images/img/EN/i/invalid.jpg" />
        <h1>Error! Page not found!</h1>
      </Container>
  )
};
export default ErrorPage;
