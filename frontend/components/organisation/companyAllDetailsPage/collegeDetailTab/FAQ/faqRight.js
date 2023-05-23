import React from "react";
import { Accordion } from "react-bootstrap";

const FaqRight = (props) => {
  return (
    <>
      <div className="">
        {props.dataValue === 0 && (
          <>
            <h5>FAQs</h5>
            <div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                 
                  <Accordion.Header> <h5>+</h5>Accordion Item #1</Accordion.Header>
                 
                  <Accordion.Body>
                  <h5>-</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Accordion Item #2</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </>
        )}
        {props.dataValue === 1 && <h3>hIGHLIGHTS</h3>}
        {props.dataValue === 2 && <h3>Ranking & Awards</h3>}
        {props.dataValue === 3 && <h3>COURSES</h3>}
        {props.dataValue === 4 && <h3>SCHOLARSHIP PLACEMENTS</h3>}
        {props.dataValue === 5 && <h3>FACILITIES</h3>}
      </div>
    </>
  );
};

export default FaqRight;
