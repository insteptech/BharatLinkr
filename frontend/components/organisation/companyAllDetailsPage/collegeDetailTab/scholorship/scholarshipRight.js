import React from "react";

const ScholarshipRight = (props) => {
  return (
    <>
      <div className="">
        {props.dataValue === 0 && (
          <>
            <h1>Basic Info</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            </p>
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

export default ScholarshipRight;
