// import React, { memo, useState } from "react";
// import { Col, Row } from "react-bootstrap";
// import CoursesDetailsLeft from "./coursesDetailLeftPage";
// import CoursesDetailsRight from "./coursesDetailRightPage";

// function CoursesDetails(props) {
//   const [dataValue, setDataValue] = useState(0);

//   return (
//     <>
//       <div className="user_dashboard_bg ">
//         <Container fluid>
//           <Row>
//             <Col lg={1} className="p-0  "></Col>
//             <Col lg={10} className="p-0">
//               <Row>
//                 <Col lg={3} className="search_left_page_bg">
//                   <CoursesDetailsLeft
//                     dataValue={dataValue}
//                     setDataValue={setDataValue}
//                   />
//                 </Col>
//                 <Col lg={9} className="search_right_page_bg">
//                   <CoursesDetailsRight
//                     dataValue={dataValue}
//                     data={props.data}
//                   />
//                 </Col>
//               </Row>
//             </Col>
//             <Col lg={1} className="p-0 white_bg "></Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// }

// export default memo(CoursesDetails);
