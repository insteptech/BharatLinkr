import { Col, Row, Spinner } from "react-bootstrap";

function LoaderPage() {
  return (
    <Row>
      <Col>
        <div className="blur_layer">
          <div className="loader_page">
            <Spinner
              className="blue_color"
              animation="border"
              variant="primary"
            />
          </div>
        </div>
      </Col>
    </Row>
  );
}
export default LoaderPage;
