import { Spinner } from "react-bootstrap";

const PreLoader = () => {
  return (
    <div className="mt-5 d-flex justify-content-center">
      <Spinner animation="border" style={{ height: "4rem", width: "4rem" }} />
    </div>
  );
};
export default PreLoader;
