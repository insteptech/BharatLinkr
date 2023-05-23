import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";

function PlacementsTab() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div class="card border-dark mb-3">
              {/* <div class="card-header">Header</div> */}
              <Row>
                <Col lg={6}>
                  <h5>Name</h5>
                </Col>
                <Col lg={6}>asfgjkl</Col>
              </Row>

              <div class="card-body text-dark">
                <h5 class="card-title">Placements done</h5>
                <p class="card-text">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores lorem ipsum
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default memo(PlacementsTab);
