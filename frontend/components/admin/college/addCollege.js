import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, placeholder, Row, Tab, Tabs } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import {
  buttonTypes,
  FieldTypes,
  inputFieldTypes,
} from "../../../utils/helper";
import FormGenerator from "../../common-components/Form/FormGenerator";
import Select from "react-select";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import {
  cityDropdown,
  getCityList,
} from "../../../redux/actions/location/createCity";
import { getState } from "../../../redux/actions/location/createState";
import {
  addCollege,
  getCollegebyId,
} from "../../../redux/actions/college/college";
import {
  getAllMasterFilter,
  getMasterFilter,
} from "../../../redux/actions/masterfilter/createmasterfilter";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import {
  getColStream,
  getColStreamlist,
} from "../../../redux/actions/streams/addColStream";
import {
  getSubStream,
  getSubstreamData,
} from "../../../redux/actions/streams/addSubStream";
import { getAllExams } from "../../../redux/actions/exams/createExam";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";
const CKeditorGenerator = dynamic(() => import("../CKeditor"), {
  ssr: false,
});
import { Table } from "react-bootstrap";

function CreateCollege() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { Id } = router.query;

  const [dataValue, setDataValue] = useState(0);

  const [associateCollege, setAssociateCollege] = useState([]);

  const cityList = useSelector(
    (State) => State.cityList?.cityList?.data?.result
  );
  const stateList = useSelector(
    (State) => State.stateList?.stateList?.data?.data?.rows
  );
  const masterFilterData = useSelector(
    (state) => state?.allMasterFilterList?.masterfilterlist?.data?.data
  );
  const mainStreamlist = useSelector(
    (state) => state?.mainStreamList?.mainStreamValue?.data?.data?.rows
  );

  const [colstreamdata, setColstreamdata] = useState();
  // const subStreamlist = useSelector(
  //   (state) => state?.subStreamList?.subStreamValue?.data?.data?.rows
  // );
  // const colStreamList = useSelector(
  //   (state) => state?.colStreamList?.colStreamSlice?.data?.data?.rows
  // );

  const substreamSelectVal = useSelector(
    (state) => state?.subStreamList?.subStreamDetails?.data?.data?.rows
  );

  const colstreamSelectVal = useSelector(
    (state) => state?.colStreamList?.colstreamDetails?.data?.data?.rows
  );

  const handleMainstreamselect = (e) => {
    let selectvalue = e.target.value;
    dispatch(getSubstreamData({ mainStreamId: selectvalue }));
  };

  const handleSubstreamselect = (e) => {
    let substreamval = e.target.value;
    dispatch(getColStreamlist({ subStreamId: substreamval }));
  };

  const handleColstreamselect = (e) => {
    setColstreamdata(e.target.value);
  };

  const examList = useSelector(
    (state) => state?.examList?.examlist?.data?.data?.rows
  );

  const tableHeading = ["No.", "Course-Name", "Action"];

  const [FileState, setFileState] = useState([]);

  const collegeDetails = useSelector((data) => {
    if (data?.collegelist?.college?.rows?.length > 0) {
      return data?.collegelist?.college?.rows[0];
    }
  });

//   let collegeAgencyDetails =  collegeDetails?.CollegeAgency?.map((item, index) => 
//   ({
//      collegeAgencyId: item?.collegeAgencyId,
//      collegeAgencyFor: item?.collegeAgencyFor,
//      totalAgency: item?.totalAgency,
//      totalAgencyForYears: item?.totalAgencyForYears,
//    })
//  )

//   let newValue = {...collegeAgencyDetails}
 

  
//   const updateDetails = {
//     id: collegeDetails?.id,
//     chooseAffiliationId: collegeDetails?.chooseAffiliationId,
//     collegeMailId: collegeDetails?.collegeMailId,
//     collegeTypeId: collegeDetails?.collegeTypeId,
//     collegeEstablishedDate: collegeDetails?.collegeEstablishedDate,
//     chooseApprovalId: collegeDetails?.chooseApprovalId,
//     collegeStateId: collegeDetails?.collegeStateId,
//     collegeCityId: collegeDetails?.collegeCityId,
//     collegeAgencyId: newValue['0'].collegeAgencyId,
//     collegeAgencyFor: newValue['0'].collegeAgencyFor,
//     totalAgency: newValue['0'].totalAgency,
//     totalAgencyForYears: newValue['0'].totalAgencyForYears,

  
//     }
//     console.log(updateDetails, "ertertertert",newValue)

//   console.log(updateDetails, "updateDetails");

  const addAssociateCourse = (fields, form, collegecourse) => {
    setAssociateCollege([...associateCollege, collegecourse[0]]);

    form.change("collegeCourse", [
      {
        courseTypeId: "",
        courseName: "",
        coursePlaceId: "",
        courseDuration: "",
        courseEligibility: "",
        courseLevel: "",
        programTypeId: "",
        courseCategoryId: "",
        chooseExamAcceptedId: "",
      },
    ]);
    form.change("collegeStreams", [
      {
        mainStreamId: "",
        subStreamId: "",
        colStreamId: "",
        courseFeeDetailsId: "",
        courseFee: "",
      },
    ]);
  };

  console.log(dataValue, "Sdfsdfs", associateCollege);

  const handleSubmit = (values) => {

    if (!Id) {
      // values.collegeStreams.map((item) => {
      //   let x = [];
      //   values.courseFee.map((name) => {
      //     x.push({
      //       ...item,
      //       ...name,
      //     });
      //   });
      //   values.collegeStreams = x;
      // });

      let formData = new FormData();
      if (values.college[0].collegeLogo) {
        formData.append("collegeImageFile", values.college[0].collegeLogo);
      }
      if (values.college[0].collegeImage) {
        formData.append("collegeLogoFile", values.college[0].collegeImage);
      }

      if (dataValue == 0) {
        setDataValue(1);
      } else if (dataValue === 1) {
        setAssociateCollege([...associateCollege, values.collegeCourse[0]]);
        setDataValue(2);
      } else if (dataValue === 2) {
        if (associateCollege.length > 0) {
          values.collegeCourse = associateCollege;
        }

        if (FileState && FileState.length > 0) {
          values.faq.map((item, index) => {
            let x = FileState[index].name.split("_")[0];
            item.uniqueId = x;
          });
          for (let i = 0; i < FileState.length; i++) {
            formData.append("imageFile", FileState[i]);
          }
        }

        delete values.college[0].collegeLogo;
        delete values.college[0].collegeImage;
        const tempvalues = { ...values };

        const data = { payload: [tempvalues] };

        formData.append("collegeData", JSON.stringify(data));

        dispatch(addCollege(formData)).then((res) => {
          if (res?.payload?.data?.success) {
            Router.push("/admin/colleges");
            toast.success("College added");
          } else {
            toast.error("Error");
          }
        });
      }
    } else {

    let collegeAgencyDetails =  collegeDetails?.CollegeAgency?.map((item, index) => 
        ({
           collegeAgencyId: item?.collegeAgencyId,
           collegeAgencyFor: item?.collegeAgencyFor,
           totalAgency: item?.totalAgency,
           totalAgencyForYears: item?.totalAgencyForYears,
         })
       )

      const updateDetails = {
        id: collegeDetails?.id,
        chooseAffiliationId: collegeDetails?.chooseAffiliationId,
        collegeMailId: collegeDetails?.collegeMailId,
        collegeTypeId: collegeDetails?.collegeTypeId,
        collegeEstablishedDate: collegeDetails?.collegeEstablishedDate,
        chooseApprovalId: collegeDetails?.chooseApprovalId,
        collegeStateId: collegeDetails?.collegeStateId,
        collegeCityId: collegeDetails?.collegeCityId,
        
            }
          }
  }

  const handleFileChange = (filesObject, name) => {
    const uniqueId = Date.now();
    const filename = uniqueId + "_" + filesObject[0].name;
    let file = new File(filesObject, filename);

    file["nameType"] = name;

    if (FileState.length === 0) {
      setFileState([file]);
    } else {
      FileState.map((ele, index) => {
        if (ele.nameType == name) {
          FileState.splice(index, 1);
        }
      });
      setFileState([...FileState, file]);
    }
  };

  const collegeAbout = [
    { title: "Intro", key: "aboutIntro" },
    { title: "Highlights", key: "aboutHighLights" },
    { title: "Ranking & Awards", key: "aboutRankingAndAwards" },
    { title: "Courses", key: "aboutCourses" },
    { title: "Scholarship Placements", key: "aboutScholarShipPlacements" },
    { title: "Facilities", key: "aboutFacilities" },
  ];

  const collegeadmission = [
    { title: "Intro", key: "admissionIntro" },
    { title: "About Test", key: "admissionAboutTest" },
    { title: "Imp. Dates", key: "admissionImportantDates" },
    { title: "Admission Highlights", key: "admissionHighLights" },
    { title: "Application Process", key: "applicationProcess" },
    { title: "PHD Admission Process", key: "PHDadmissionProcess" },
  ];

  const distanceeducation = [
    { title: "Basic Info", key: "basicInfo" },
    { title: "Course Details", key: "courseDetails" },
    { title: "Honors", key: "honors" },
  ];

  const scholarship = [
    { title: "Intro", key: "scholarShipIntro" },
    { title: "Based on Uni Exams", key: "basedOnUniExams" },
    { title: "Based on Admission Test", key: "basedOnAdmissionTest" },
    { title: "Based on Sports Quota", key: "basedOnSportsQuota" },
    { title: "Based on Diploma, Grad", key: "basedOnDiplomaGraduates" },
  ];

  const placements = [
    { title: "Intro", key: "placeMentIntro" },
    { title: "Highlights 2021", key: "highLights2021" },
    { title: "MBA Highlights", key: "MBAhighLights" },
    { title: "BTECH Highlights", key: "BTECHhighLights" },
    { title: "Year Wise Placements", key: "yearWisePlaceMents" },
    { title: "Top Recruiters", key: "topRecruiters" },
  ];

  const validate = (values) => {
    console.log(values, "data");
    const errors = {};
    let itemArray1 = [];
    let itemArray2 = [];
    if (dataValue === 0) {
      values.CollegeAgency.map((item, index) => {
        const error = {};
        if (!item.selectAgencies) {
          error["selectAgencies"] = "*";
        }
        if (!item.Overall) {
          error["Overall"] = "*";
        }
        if (!item.TotalAgency) {
          error["TotalAgency"] = "*";
        }
        if (!item.Year) {
          error["Year"] = "*";
        }
        itemArray1.push(error);
      });
      errors["CollegeAgency"] = itemArray1;
      if (!values.chooseAffiliation) {
        errors["chooseAffiliation"] = "*";
      }
      if (!values.collegeName) {
        errors["collegeName"] = "*";
      }
      if (!values.CollegeMail) {
        errors["CollegeMail"] = "*";
      }
      if (!values.collegeType) {
        errors["collegeType"] = "*";
      }
      if (!values.establishedDate) {
        errors["establishedDate"] = "*";
      }
      if (!values.approval) {
        errors["approval"] = "*";
      }
      if (!values.collegeState) {
        errors["collegeState"] = "*";
      }
      if (!values.collegeCity) {
        errors["collegeCity"] = "*";
      }
      if (!values.collegeGrade) {
        errors["collegeGrade"] = "*";
      }
      if (!values.collegeStatus) {
        errors["collegeStatus"] = "*";
      }
      if (!values.collegeLogo) {
        errors["collegeLogo"] = "*";
      }
      if (!values.collegeImage) {
        errors["collegeImage"] = "*";
      }
      if (values.CollegeAgency) {
      }
      // if (values.select) {
      //   let itemErrors = []
      //   values.select.map((item, index) => {
      //     console.log(item, 'itrem')
      //     const error = {}
      //       if (!item.agencyName) {
      //         error['agencyName'] = 'required'
      //     }
      //     if (!item.agencyEmail) {
      //         error['agencyEmail'] = 'required'
      //       }
      //       itemErrors.push(error)
      //   })
      //   errors['select'] = itemErrors;
      // }
    }
    if (dataValue === 1) {
      if (values.ChooseStreams) {
        values.ChooseStreams.map((item, index) => {
          let error = {};
          if (!item.SelectStream) {
            error["SelectStream"] = "*";
          }
          if (!item.MainStream) {
            error["MainStream"] = "*";
          }
          if (!item.SubStream) {
            error["SubStream"] = "*";
          }
          itemArray1.push(error);
        });
        errors["ChooseStreams"] = itemArray1;
      }
      if (values.CourseFeeDetails) {
        values.CourseFeeDetails.map((item, index) => {
          let error = {};
          if (!item.FeeType) {
            error["FeeType"] = "*";
          }
          if (!item.CourseFee) {
            error["CourseFee"] = "*";
          }
          itemArray2.push(error);
        });
        errors["CourseFeeDetails"] = itemArray2;
      }
      if (!values.CourseType) {
        errors["CourseType"] = "*";
      }
      if (!values.CourseName) {
        errors["CourseName"] = "*";
      }
      if (!values.CoursePlace) {
        errors["CoursePlace"] = "*";
      }
      if (!values.CourseDuration) {
        errors["CourseDuration"] = "*";
      }
      if (!values.CourseEligibility) {
        errors["CourseEligibility"] = "*";
      }
      if (!values.TypeofCourse) {
        errors["TypeofCourse"] = "*";
      }
      if (!values.ProgramType) {
        errors["ProgramType"] = "*";
      }
      if (!values.CourseCategory) {
        errors["CourseCategory"] = "*";
      }
      if (!values.ChooseExamAccepted) {
        errors["ChooseExamAccepted"] = "*";
      }
      if (!values.ShowonFiltering) {
        errors["ShowonFiltering"] = "*";
      }
      // if (values.courseFees) {
      //   let itemErrors = []
      //   values.courseFees.map((item, index) => {
      //     const error = {}
      //     if (!item.feeType) {
      //       error['feeType'] = 'required'
      //     } if (!item.courseFee) {
      //       error['courseFee'] = 'required'
      //     }
      //     itemErrors.push(error)
      //     console.log(itemErrors,'rrrrrrr')
      //   })
      //   errors['courseFees'] = itemErrors;
      // }
    }

    return errors;
  };

  const handleTab = (index) => {
    setDataValue(index);
  };

  const masterfilterTypes =
    "affilation,collegetype,approvals,agency,courselevel,coursetype,courseplace,coursefeetype,coursecategory,programtype,eligibility";

  const FormSteps = ["College Register", "Associate Course", "CMS"];

  const setInitialValues = (event) => {
    if (event && Object.keys(event).length > 0) {
      return event;
    }
    if (Id) {
      if (collegeDetails) {
        const initialValues = {};
        initialValues.college = [
          {
            chooseAffiliationId: collegeDetails?.chooseAffiliationId,
            collegeName: collegeDetails?.collegeName,
            collegeMailId: collegeDetails?.collegeMailId,
            collegeTypeId: collegeDetails?.collegeTypeId,
            collegeEstablishedDate: collegeDetails?.collegeEstablishedDate,
            chooseApprovalId: collegeDetails?.chooseApprovalId,
            collegeStateId: collegeDetails?.collegeStateId,
            collegeCityId: collegeDetails?.collegeCityId,
            collegeNaacGrade: collegeDetails?.collegeNaacGrade,
            collegeStatusId: collegeDetails?.collegeStatusId,
            collegeLogo: collegeDetails?.collegeLogo, //doubt
            collegeImage: collegeDetails?.collegeImage,
          },
        ];

        collegeDetails?.AssociateCourse?.forEach(
          (item) =>
            (initialValues.collegeCourse = [
              {
                courseTypeId: item?.courseTypeId,
                courseName: item?.courseName,
                coursePlaceId: item?.coursePlaceId,
                courseDuration: item?.courseDuration,
                courseEligibility: item?.courseEligibility,
                courseLevel: item?.courseLevel,
                programTypeId: item?.ProgramType?.id,
                courseCategoryId: item?.CourseCategory?.id,
                chooseExamAcceptedId: item?.chooseExamAcceptedId,
              },
            ])
        );

        collegeDetails?.CollegeAbout?.forEach((item) => {
          initialValues.collegeAbouts = [
            {
              aboutIntro: item?.aboutIntro,
              aboutHighLights: item?.aboutHighLights,
              aboutRankingAndAwards: item?.aboutRankingAndAwards,
              aboutCourses: item?.aboutCourses,
              aboutScholarShipPlacements: item?.aboutScholarShipPlacements,
              aboutFacilities: item?.aboutFacilities,
            },
          ];
        });

        collegeDetails?.CollegeAdmission?.forEach(
          (item) =>
            (initialValues.collegeAdmissions = [
              {
                admissionIntro: item?.admissionIntro,
                admissionAboutTest: item?.admissionAboutTest,
                admissionImportantDates: item?.admissionImportantDates,
                admissionHighLights: item?.admissionHighLights,
                applicationProcess: item?.applicationProcess,
                PHDadmissionProcess: item?.PHDadmissionProcess,
              },
            ])
        );

        collegeDetails?.DistanceEducation?.forEach(
          (item) =>
            (initialValues.distanceEducation = [
              {
                basicInfo: item?.basicInfo,
                courseDetails: item?.courseDetails,
                honors: item?.honors,
              },
            ])
        );

        collegeDetails?.Placements?.forEach(
          (item) =>
            (initialValues.placements = [
              {
                placeMentIntro: item?.placeMentIntro,
                highLights2021: item?.highLights2021,
                MBAhighLights: item?.MBAhighLights,
                BTECHhighLights: item?.BTECHhighLights,
                yearWisePlaceMents: item?.yearWisePlaceMents,
                topRecruiters: item?.topRecruiters,
              },
            ])
        );

        collegeDetails?.Scholarship?.forEach(
          (item) =>
            (initialValues.scholarShip = [
              {
                scholarShipIntro: item?.scholarShipIntro,
                basedOnUniExams: item?.basedOnUniExams,
                basedOnAdmissionTest: item?.basedOnAdmissionTest,
                basedOnSportsQuota: item?.basedOnSportsQuota,
                basedOnDiplomaGraduates: item?.basedOnDiplomaGraduates,
              },
            ])
        );

        collegeDetails?.FAQ?.forEach(
          (item) =>
            (initialValues.faq = [
              {
                question: item?.question,
                answerType: item?.answerType,
                answer: item?.answer,
              },
            ])
        );

        collegeDetails?.CollegeAgency?.forEach(
          (item) =>
            (initialValues.collegeAgencies = [
              {
                collegeAgencyId: item?.collegeAgencyId,
                collegeAgencyFor: item?.collegeAgencyFor,
                totalAgency: item?.totalAgency,
                totalAgencyForYears: item?.totalAgencyForYears,
              },
            ])
        );

        collegeDetails?.AssociateCourse?.forEach((item) =>
          item?.CourseAssociateStream?.forEach(
            (streams) =>
              (initialValues.collegeStreams = [
                {
                  mainStreamId: streams?.MainStream?.id,
                  subStreamId: streams?.SubStream?.id,
                  colStreamId: streams?.ColStream?.id,
                  courseFeeDetailsId: streams?.courseFeeDetailsId,
                  courseFee: item?.courseFee,
                },
              ])
          )
        );
        return initialValues;
      }
    } else {
      const initialValues = {};
      initialValues.college = [
        {
          chooseAffiliationId: "",
          collegeName: "",
          collegeMailId: "",
          collegeTypeId: "",
          collegeEstablishedDate: "",
          chooseApprovalId: "",
          collegeStateId: "",
          collegeCityId: "",
          collegeNaacGrade: "",
          collegeStatusId: "",
          collegeLogo: "",
          collegeImage: "",
        },
      ];
      initialValues.collegeCourse = [
        {
          courseTypeId: "",
          courseName: "",
          coursePlaceId: "",
          courseDuration: "",
          courseEligibility: "",
          courseLevel: "",
          programTypeId: "",
          courseCategoryId: "",
          chooseExamAcceptedId: "",
        },
      ];
      initialValues.collegeAbouts = [
        {
          aboutIntro: "",
          aboutHighLights: "",
          aboutRankingAndAwards: "",
          aboutCourses: "",
          aboutScholarShipPlacements: "",
          aboutFacilities: "",
        },
      ];
      initialValues.collegeAdmissions = [
        {
          admissionIntro: "",
          admissionAboutTest: "",
          admissionImportantDates: "",
          admissionHighLights: "",
          applicationProcess: "",
          PHDadmissionProcess: "",
        },
      ];
      initialValues.distanceEducation = [
        {
          basicInfo: "",
          courseDetails: "",
          honors: "",
        },
      ];
      initialValues.placements = [
        {
          placeMentIntro: "",
          highLights2021: "",
          MBAhighLights: "",
          BTECHhighLights: "",
          yearWisePlaceMents: "",
          topRecruiters: "",
        },
      ];
      initialValues.scholarShip = [
        {
          scholarShipIntro: "",
          basedOnUniExams: "",
          basedOnAdmissionTest: "",
          basedOnSportsQuota: "",
          basedOnDiplomaGraduates: "",
        },
      ];
      initialValues.faq = [
        {
          question: null,
          answerType: null,
          answer: null,
        },
      ];
      initialValues.collegeAgencies = [
        {
          collegeAgencyId: "",
          collegeAgencyFor: "",
          totalAgency: "",
          totalAgencyForYears: "",
        },
      ];
      initialValues.collegeStreams = [
        {
          mainStreamId: "",
          subStreamId: "",
          colStreamId: "",
          courseFeeDetailsId: "",
          courseFee: "",
        },
      ];

      return initialValues;
    }
  };

  useEffect(() => {
    dispatch(getState());
    dispatch(cityDropdown(""));
    dispatch(getAllExams());
    dispatch(getAllMasterFilter(masterfilterTypes));
    dispatch(getMainStream());
    dispatch(getSubStream());
    dispatch(getColStream());
  }, []);

  useEffect(() => {
    dispatch(getCollegebyId({ id: Number(Id) }));
  }, [Id]);

  const handleCityList = (e) => {
    console.log(e.target.value);
    // if (e.target.value!=="") {
    dispatch(cityDropdown(e.target.value));
    // } else {
    // dispatch(cityDropdown(''))
    // }
  };

  return (
    <>
      {/* <Container> */}
      <div className="admin_home_tabs_row">
        <Row>
          <ul className="nav tabs_scroll">
            {FormSteps &&
              FormSteps.map((steps, stepsIndex) => (
                <li className="nav-item" key={stepsIndex}>
                  <a
                    className={`nav-link admin_tabs_name ${
                      dataValue === stepsIndex && "head-active"
                    }`}
                    active="true"
                    onClick={() => handleTab(stepsIndex)}
                  >
                    {steps}
                  </a>
                </li>
              ))}
          </ul>
        </Row>
      </div>

      <Row className="mt-5">
        <Col>
          <Form
            onSubmit={handleSubmit}
            mutators={{
              ...arrayMutators,
            }}
            keepDirtyOnReinitialize
            // validate={validateForm}
            initialValues={useMemo(
              (event) => setInitialValues(event),
              [collegeDetails]
            )}
            render={({
              handleSubmit,
              values,
              form: {
                mutators: { push, pop },
              },
              form,
            }) => (
              <form onSubmit={handleSubmit}>
                {dataValue === 0 && (
                  <>
                    <FieldArray name="college">
                      {({ fields }) => (
                        <>
                          {fields.map((name, index) => (
                            <div key={index}>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.chooseAffiliationId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Choose Affiliation
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input "
                                        >
                                          <option value={""}>
                                            Choose Affilation
                                          </option>
                                          {masterFilterData?.affilation?.map(
                                            (item, index) => (
                                              <option
                                                key={`Affilation_${index}`}
                                                value={item?.id}
                                              >
                                                {item.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeName`}>
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Name
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          {...input}
                                          type="text"
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="Enter College Name"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field
                                    name={`${name}.collegeMailId`}
                                    className="margin_bottom"
                                  >
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Mail Id
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          {...input}
                                          type="email"
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="Enter Mail Id"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeTypeId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Type
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                        >
                                          <option value="">
                                            Select College Type..
                                          </option>
                                          {masterFilterData?.collegetype?.map(
                                            (item, index) => (
                                              <option
                                                key={`CollegeType_${index}`}
                                                value={item?.id}
                                              >
                                                {item.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field
                                    name={`${name}.collegeEstablishedDate`}
                                  >
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Established Date
                                          </label>
                                          {meta.touched && meta.error && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          {...input}
                                          type="month"
                                          className="form-control signup_form_input margin_bottom"
                                          // value={Date.now()}
                                          placeholder="Enter Established Date"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.chooseApprovalId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div>
                                          <label className="signup_form_label">
                                            Choose Approval
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                        >
                                          <option value={""}>
                                            Not Selected
                                          </option>
                                          {masterFilterData?.approvals?.map(
                                            (item, index) => (
                                              <option
                                                key={`Approval_${index}`}
                                                value={item?.id}
                                              >
                                                {item.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeStateId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College State
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                          onChange={(e) => {
                                            input.onChange(e);
                                            handleCityList(e);
                                          }}
                                        >
                                          <option value=" ">
                                            Enter college State
                                          </option>
                                          {stateList &&
                                            stateList.length > 0 &&
                                            stateList.map(
                                              (stateItem, stateIndex) => (
                                                <option
                                                  key={`State_${stateIndex}`}
                                                  value={stateItem.id}
                                                >{`${stateItem.state}`}</option>
                                              )
                                            )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeCityId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College City
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                        >
                                          <option value={""}>
                                            Enter College City
                                          </option>
                                          {cityList &&
                                            cityList.length > 0 &&
                                            cityList.map(
                                              (cityItem, cityIndex) => (
                                                <option
                                                  key={`City_${cityIndex}`}
                                                  value={cityItem.id}
                                                >{`${cityItem.name}`}</option>
                                              )
                                            )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row className="position_label">
                                <Col>
                                  <label className="signup_form_label ">
                                    College Agency
                                  </label>
                                </Col>
                                <FieldArray name={`collegeAgencies`}>
                                  {({ fields }) => (
                                    <div>
                                      <>
                                        {fields.map((name, index) => (
                                          <Row key={`CollegeAgencies_1`}>
                                            <Col md={12} lg={6}>
                                              <div className="d-flex margin_bottom small_screen_for_input">
                                                <Field
                                                  name={`${name}.collegeAgencyId`}
                                                >
                                                  {({ input, meta }) => (
                                                    <>
                                                      <select
                                                        {...input}
                                                        className="form-control select-style signup_form_input "
                                                      >
                                                        <option value={""}>
                                                          select Agencies
                                                        </option>
                                                        {masterFilterData?.agency?.map(
                                                          (item, index) => (
                                                            <option
                                                              key={`Agency_${index}`}
                                                              value={item?.id}
                                                            >
                                                              {item.name}
                                                            </option>
                                                          )
                                                        )}
                                                      </select>
                                                      {meta.error &&
                                                        meta.touched && (
                                                          <span className="text-danger required_msg position_required">
                                                            {meta.error}
                                                          </span>
                                                        )}
                                                    </>
                                                  )}
                                                </Field>
                                                <div className="">
                                                  <img
                                                    className="select_down_icon_second"
                                                    src="/images/down.png"
                                                  />
                                                </div>
                                                <div className="for_input_center">
                                                  For
                                                </div>
                                                <Field
                                                  name={`${name}.collegeAgencyFor`}
                                                >
                                                  {({ input, meta }) => (
                                                    <>
                                                      <select
                                                        {...input}
                                                        className="form-control select-style signup_form_input "
                                                      >
                                                        <option value={""}>
                                                          Overall
                                                        </option>
                                                        {mainStreamlist &&
                                                          mainStreamlist.length >
                                                            0 &&
                                                          mainStreamlist?.map(
                                                            (item, index) => (
                                                              <option
                                                                key={`AgencyFor_${index}`}
                                                                value={item.id}
                                                              >
                                                                {
                                                                  item?.mainStreamName
                                                                }
                                                              </option>
                                                            )
                                                          )}
                                                      </select>
                                                      {meta.error &&
                                                        meta.touched && (
                                                          <span className="text-danger required_msg position_required">
                                                            {meta.error}
                                                          </span>
                                                        )}
                                                    </>
                                                  )}
                                                </Field>
                                                <div className="">
                                                  <img
                                                    className="select_down_icon_second"
                                                    src="/images/down.png"
                                                  />
                                                </div>
                                              </div>
                                            </Col>
                                            <Col md={12} lg={6}>
                                              <div className="d-flex margin_bottom small_screen_for_input">
                                                <Field
                                                  name={`${name}.totalAgency`}
                                                >
                                                  {({ input, meta }) => (
                                                    <>
                                                      <input
                                                        {...input}
                                                        type="text"
                                                        className="form-control select-style signup_form_input"
                                                        placeholder="Enter Total agencies"
                                                      />
                                                      {meta.error &&
                                                        meta.touched && (
                                                          <span className="text-danger required_msg position_required">
                                                            {meta.error}
                                                          </span>
                                                        )}
                                                    </>
                                                  )}
                                                </Field>
                                                <div className="for_input_center">
                                                  For
                                                </div>
                                                <Field
                                                  name={`${name}.totalAgencyForYears`}
                                                >
                                                  {({ input, meta }) => (
                                                    <>
                                                      <input
                                                        {...input}
                                                        type="text"
                                                        className="form-control select-style signup_form_input "
                                                        placeholder="Enter Agency Year"
                                                      />
                                                      {meta.error &&
                                                        meta.touched && (
                                                          <span className="text-danger required_msg position_required">
                                                            {meta.error}
                                                          </span>
                                                        )}
                                                    </>
                                                  )}
                                                </Field>

                                                <div className="d-flex mt-2 add_remove_btn_div">
                                                  <div
                                                    type="button"
                                                    className="add_remove_btn plus_btn_margin"
                                                    onClick={() =>
                                                      fields.push({
                                                        selectAgencies: "",
                                                        Overall: "",
                                                        TotalAgency: "",
                                                        Year: "",
                                                      })
                                                    }
                                                  >
                                                    <img
                                                      className="add_remove_icon"
                                                      src="/images/plus.png"
                                                    />
                                                  </div>
                                                  {fields.length > 1 ? (
                                                    <div
                                                      className="add_remove_btn"
                                                      type="button"
                                                      onClick={() =>
                                                        fields.remove(index)
                                                      }
                                                    >
                                                      <img
                                                        className="add_remove_icon"
                                                        src="/images/minus.png"
                                                      />
                                                    </div>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </div>
                                              </div>
                                            </Col>
                                          </Row>
                                        ))}
                                      </>
                                    </div>
                                  )}
                                </FieldArray>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeNaacGrade`}>
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College NAAC Grade
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          {...input}
                                          type="number"
                                          min="0"
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="Enter NAAC Grade"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeStatusId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Status
                                          </label>
                                          {meta.touched && meta.error && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input "
                                        >
                                          <option value={""}>
                                            Enter College Status
                                          </option>
                                          <option value={1}>Enable</option>
                                          <option value={2}>Disable</option>
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeLogo`}>
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Logo
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          type="file"
                                          onChange={(e) =>
                                            input.onChange(e.target.files[0])
                                          }
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="Enter logo"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.collegeImage`}>
                                    {({ input, meta }) => (
                                      <div>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            College Image
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          // {...input}
                                          type="file"
                                          onChange={(e) =>
                                            input.onChange(e.target.files[0])
                                          }
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="College Image"
                                        />
                                      </div>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="text-center">
                                  <button
                                    className="admin_signup_btn"
                                    onClick={handleSubmit}
                                  >
                                    Add College
                                  </button>
                                </Col>
                              </Row>
                            </div>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </>
                )}
                {dataValue === 1 && (
                  <>
                    {associateCollege.length !== 0 && (
                      <div>
                        <Table
                          responsive
                          className="admin_table"
                          bordered
                          hover
                        >
                          <thead>
                            <tr>
                              {tableHeading &&
                                tableHeading?.map((i, index) => {
                                  return (
                                    <>
                                      <th className="table_head" key={index}>
                                        {i}
                                      </th>
                                    </>
                                  );
                                })}
                            </tr>
                          </thead>
                          <tbody>
                            {associateCollege &&
                              associateCollege?.map((asscourse, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="text-center admin_table_data">
                                      {index + 1}
                                    </td>

                                    <td className="text-center admin_table_data">
                                      {asscourse?.courseName}
                                    </td>

                                    <td className="text-center admin_table_data">
                                      <img
                                        className="mx-1 admin_table_action_icon"
                                        src="/images/edit-icon-blue.png"
                                        onClick={() => handleEdit(item)}
                                      ></img>
                                      <img
                                        className="mx-1 admin_table_action_icon"
                                        src="/images/delete-icon-blue.png"
                                        onClick={() => handleDelete(item)}
                                      ></img>
                                    </td>
                                  </tr>
                                );
                              })}{" "}
                            *
                          </tbody>
                        </Table>
                        <hr></hr>
                      </div>
                    )}
                    <FieldArray name="collegeCourse">
                      {({ fields }) => (
                        <>
                          {fields.map((name, index) => (
                            <div key={index}>
                              <Row>
                                <FieldArray name={`collegeStreams`}>
                                  {({ fields }) => (
                                    <div>
                                      <>
                                        {fields.map((name, index) => (
                                          <Row>
                                            <Col lg={4} md={8}>
                                              <label className="signup_form_label">
                                                Choose Streams
                                              </label>
                                              <Field
                                                name={`${name}.mainStreamId`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <div className="d-flex">
                                                      {meta.touched &&
                                                        meta.error && (
                                                          <span className="text-danger required_msg">
                                                            {meta.error}
                                                          </span>
                                                        )}
                                                    </div>
                                                    <select
                                                      {...input}
                                                      className="form-control select-style signup_form_input"
                                                      onChange={(e) => {
                                                        input.onChange(e);
                                                        handleMainstreamselect(
                                                          e
                                                        );
                                                      }}
                                                      // value={mainStreamlist?.filter(
                                                      //   (item) => {
                                                      //     return (
                                                      //       item.mainStreamName ===
                                                      //       mainstreamdata
                                                      //     );
                                                      //   }
                                                      // )}
                                                    >
                                                      <option value={""}>
                                                        Select Main Stream
                                                      </option>
                                                      {mainStreamlist &&
                                                        mainStreamlist.length >
                                                          0 &&
                                                        mainStreamlist.map(
                                                          (item, index) => (
                                                            <option
                                                              key={`MainStream_${index}`}
                                                              value={item?.id}
                                                            >
                                                              {
                                                                item.mainStreamName
                                                              }
                                                            </option>
                                                          )
                                                        )}
                                                    </select>
                                                  </>
                                                )}
                                              </Field>
                                              <div className="text-end">
                                                <img
                                                  className="select_down_icon"
                                                  src="/images/down.png"
                                                />
                                              </div>
                                            </Col>
                                            <Col lg={4} md={8}>
                                              <Field
                                                name={`${name}.subStreamId`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    {/* <div className="d-flex">
                                            {meta.touched && meta.error && (
                                              <span className="text-danger required_msg">
                                                {meta.error}
                                              </span>
                                            )}
                                          </div> */}

                                                    <select
                                                      {...input}
                                                      className="form-control select-style signup_form_input margin_top"
                                                      onChange={(e) => {
                                                        input.onChange(e);
                                                        handleSubstreamselect(
                                                          e
                                                        );
                                                      }}
                                                    >
                                                      <option value={""}>
                                                        Select Sub Stream
                                                      </option>
                                                      {substreamSelectVal &&
                                                        substreamSelectVal.length >
                                                          0 &&
                                                        substreamSelectVal.map(
                                                          (item, index) => (
                                                            <option
                                                              key={`SubStream_${index}`}
                                                              value={item?.id}
                                                            >
                                                              {
                                                                item?.subStreamName
                                                              }
                                                            </option>
                                                          )
                                                        )}
                                                    </select>
                                                    {/* {meta.touched && meta.error && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )} */}
                                                  </>
                                                )}
                                              </Field>
                                              <div className="text-end">
                                                <img
                                                  className="select_down_icon"
                                                  src="/images/down.png"
                                                />
                                              </div>
                                            </Col>
                                            <Col
                                              lg={4}
                                              md={8}
                                              className="d-flex margin_top"
                                            >
                                              <Field
                                                name={`${name}.colStreamId`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <select
                                                      {...input}
                                                      className="form-control select-style signup_form_input margin_bottom"
                                                      onChange={(e) => {
                                                        input.onChange(e);
                                                        handleColstreamselect(
                                                          e
                                                        );
                                                      }}
                                                      value={colstreamdata}
                                                    >
                                                      <option value={""}>
                                                        Select Col Stream
                                                      </option>
                                                      {colstreamSelectVal &&
                                                        colstreamSelectVal.length >
                                                          0 &&
                                                        colstreamSelectVal.map(
                                                          (item, index) => (
                                                            <option
                                                              key={`ColStream_${index}`}
                                                              value={item.id}
                                                            >
                                                              {
                                                                item.colStreamName
                                                              }
                                                            </option>
                                                          )
                                                        )}
                                                    </select>
                                                    {/* {meta.touched && meta.error && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )} */}
                                                  </>
                                                )}
                                              </Field>
                                              <div className="">
                                                <img
                                                  className="select_down_icon_second"
                                                  src="/images/down.png"
                                                />
                                              </div>
                                              <div className="d-flex mt-2 margin_bottom">
                                                <div
                                                  type="button"
                                                  className="add_remove_btn ms-2"
                                                  onClick={() =>
                                                    fields.push({
                                                      mainStreamId: "",
                                                      subStreamId: "",
                                                      colStreamId: "",
                                                    })
                                                  }
                                                >
                                                  <img
                                                    className="add_remove_icon"
                                                    src="/images/plus.png"
                                                  />
                                                </div>
                                                {fields.length > 1 ? (
                                                  <div
                                                    className="add_remove_btn ms-2"
                                                    type="button"
                                                    onClick={() =>
                                                      fields.remove(index)
                                                    }
                                                  >
                                                    <img
                                                      className="add_remove_icon"
                                                      src="/images/minus.png"
                                                    />
                                                  </div>
                                                ) : (
                                                  <></>
                                                )}
                                              </div>
                                            </Col>
                                          </Row>
                                        ))}
                                      </>
                                    </div>
                                  )}
                                </FieldArray>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.courseTypeId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Course Type
                                          </label>
                                          {meta.touched && meta.error && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control select-style signup_form_input"
                                        >
                                          <option value={""}>
                                            Select Course Type
                                          </option>
                                          {masterFilterData &&
                                            masterFilterData.coursetype.length >
                                              0 &&
                                            masterFilterData.coursetype.map(
                                              (item, index) => (
                                                <option
                                                  key={`CourseType_${index}`}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.courseName`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Course Name
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          {...input}
                                          type="text"
                                          className="form-control select-style signup_form_input margin_bottom"
                                          placeholder="Enter Course Name"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <FieldArray name={`collegeStreams`}>
                                  {({ fields }) => (
                                    <div>
                                      <>
                                        {fields.map((name, index) => (
                                          <Row>
                                            <Col lg={6} md={12}>
                                              <Field
                                                name={`${name}.courseFeeDetailsId`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <div className="w-100">
                                                      <label className="signup_form_label">
                                                        Course Fee Details
                                                      </label>
                                                      {meta.error &&
                                                        meta.touched && (
                                                          <span className="text-danger required_msg">
                                                            {meta.error}
                                                          </span>
                                                        )}
                                                    </div>
                                                    <select
                                                      {...input}
                                                      className="form-control select-style signup_form_input "
                                                    >
                                                      <option value={""}>
                                                        Select Fee type
                                                      </option>
                                                      {masterFilterData?.coursefeetype &&
                                                        masterFilterData?.coursefeetype?.map(
                                                          (item, index) => (
                                                            <option
                                                              key={`coruseFee_${index}`}
                                                              value={item.id}
                                                            >
                                                              {item.name}
                                                            </option>
                                                          )
                                                        )}
                                                    </select>
                                                  </>
                                                )}
                                              </Field>
                                              <div className="text-end">
                                                <img
                                                  className="select_down_icon"
                                                  src="/images/down.png"
                                                />
                                              </div>
                                            </Col>
                                            <Col lg={6} md={12}>
                                              <label className="signup_form_label">
                                                Course Fee
                                              </label>
                                              <div className="d-flex ">
                                                <Field
                                                  name={`${name}.courseFee`}
                                                >
                                                  {({ input, meta }) => (
                                                    <div className="w-100">
                                                      <input
                                                        {...input}
                                                        type="number"
                                                        min={0}
                                                        className="form-control signup_form_input margin_bottom"
                                                        placeholder="Enter Course Fee"
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                                <div className="d-flex mt-2 margin_bottom">
                                                  <div
                                                    type="button"
                                                    className="add_remove_btn ms-2 margin_top"
                                                    onClick={() =>
                                                      fields.push({
                                                        courseFeeDetailsId: "",
                                                        courseFee: "",
                                                      })
                                                    }
                                                  >
                                                    <img
                                                      className="add_remove_icon"
                                                      src="/images/plus.png"
                                                    />
                                                  </div>
                                                  {fields.length > 1 ? (
                                                    <div
                                                      className="add_remove_btn ms-2 margin_top"
                                                      type="button"
                                                      onClick={() =>
                                                        fields.remove(index)
                                                      }
                                                    >
                                                      <img
                                                        className="add_remove_icon"
                                                        src="/images/delete-black.png"
                                                      />
                                                    </div>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </div>
                                              </div>
                                            </Col>
                                          </Row>
                                        ))}
                                      </>
                                    </div>
                                  )}
                                </FieldArray>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.coursePlaceId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Course Place
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control signup_form_input"
                                        >
                                          <option value={""}>
                                            Select Course Place
                                          </option>
                                          {masterFilterData &&
                                            masterFilterData?.courseplace?.map(
                                              (item, index) => (
                                                <option
                                                  key={`CoursePlace_${index}`}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.courseDuration`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Course Duration (Years/Months)
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <input
                                          {...input}
                                          type="number"
                                          min={0}
                                          className="form-control signup_form_input margin_bottom"
                                          placeholder="Enter Course Duration"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.courseEligibility`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Course Eligibility
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>

                                        <select
                                          {...input}
                                          className="form-control signup_form_input "
                                        >
                                          <option value={""}>
                                            Select Course Eligibility
                                          </option>
                                          {masterFilterData &&
                                            masterFilterData.eligibility &&
                                            masterFilterData.eligibility
                                              .length > 0 &&
                                            masterFilterData.eligibility.map(
                                              (item, index) => (
                                                <option
                                                  key={`CourseLEvel_${index}`}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.courseLevel`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Course Level
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control signup_form_input"
                                        >
                                          <option value="">
                                            Select Course Level
                                          </option>
                                          {masterFilterData &&
                                            masterFilterData.courselevel &&
                                            masterFilterData.courselevel
                                              .length > 0 &&
                                            masterFilterData.courselevel.map(
                                              (item, index) => (
                                                <option
                                                  key={`CourseLEvel_${index}`}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.programTypeId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Program Type
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control signup_form_input "
                                        >
                                          <option value={""}>
                                            Select programtype
                                          </option>
                                          {masterFilterData &&
                                            masterFilterData.programtype &&
                                            masterFilterData.programtype
                                              .length > 0 &&
                                            masterFilterData.programtype.map(
                                              (item, index) => (
                                                <option
                                                  key={`ProgramType_${index}`}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.courseCategoryId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Course Category
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control signup_form_input "
                                        >
                                          <option value={""}>
                                            Select course category
                                          </option>
                                          {masterFilterData &&
                                            masterFilterData.coursecategory &&
                                            masterFilterData.coursecategory
                                              .length > 0 &&
                                            masterFilterData.coursecategory.map(
                                              (item, index) => (
                                                <option
                                                  key={`CourseCategory_${index}`}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.chooseExamAcceptedId`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Choose Exam Accepted
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control signup_form_input "
                                        >
                                          <option value={""}>
                                            Choose Exam
                                          </option>
                                          {examList &&
                                            examList.length > 0 &&
                                            examList.map((item, index) => (
                                              <option
                                                key={`Exam_${index}`}
                                                value={item.id}
                                              >
                                                {item?.examName}
                                              </option>
                                            ))}
                                        </select>
                                        <div className="text-end">
                                          <img
                                            className="select_down_icon"
                                            src="/images/down.png"
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                                <Col md={12} lg={6}>
                                  <Field name={`${name}.ShowonFiltering`}>
                                    {({ input, meta }) => (
                                      <>
                                        <div className="d-flex">
                                          <label className="signup_form_label">
                                            Show on Filtering
                                          </label>
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">
                                              {meta.error}
                                            </span>
                                          )}
                                        </div>
                                        <select
                                          {...input}
                                          className="form-control signup_form_input margin_bottom"
                                        >
                                          <option value="">True/False</option>
                                          <option value={1}>True</option>
                                          <option value={2}>False</option>
                                        </select>
                                      </>
                                    )}
                                  </Field>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="text-center">
                                  <button
                                    type="reset"
                                    className="admin_signup_btn me-4 "
                                    onClick={() =>
                                      addAssociateCourse(
                                        fields,
                                        form,
                                        values.collegeCourse
                                      )
                                    }
                                  >
                                    Add More
                                  </button>
                                  <button
                                    className="admin_signup_btn admin_signup_btn_mobile"
                                    type="submit"
                                    onClick={handleSubmit}
                                  >
                                    Submit
                                  </button>
                                </Col>
                              </Row>
                            </div>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </>
                )}
                {dataValue == 2 && (
                  <>
                    <div>
                      <>
                        <Row>
                          <Col>
                            <h4 className="mt-4">College About</h4>
                            <FieldArray name="collegeAbouts">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {collegeAbout &&
                                        collegeAbout?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => {
                                                        // console.log(editor, 'editor')
                                                      }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <h4 className="mt-4">College Admission</h4>
                            <FieldArray name="collegeAdmissions">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {collegeadmission &&
                                        collegeadmission?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => {
                                                        // console.log(editor, 'editor')
                                                      }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <h4 className="mt-4">Distance Education</h4>
                            <FieldArray name="distanceEducation">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {distanceeducation &&
                                        distanceeducation?.map(
                                          (item, index) => {
                                            return (
                                              <Tab
                                                style={{
                                                  padding: "10px",
                                                  border: "1px solid black",
                                                  borderRadius: "5px",
                                                  backgroundColor: "#FFF",
                                                }}
                                                key={index}
                                                eventKey={index}
                                                title={item.title}
                                              >
                                                <Field
                                                  name={`${name}.${item?.key}`}
                                                >
                                                  {({ input, meta }) => (
                                                    <>
                                                      <CKeditorGenerator
                                                        input={input}
                                                        onReady={(editor) => {
                                                          // console.log(editor, 'editor')
                                                        }}
                                                      />
                                                    </>
                                                  )}
                                                </Field>
                                              </Tab>
                                            );
                                          }
                                        )}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <h4 className="mt-4">Scholarship</h4>
                            <FieldArray name="scholarShip">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {scholarship &&
                                        scholarship?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => {
                                                        // console.log(editor, 'editor')
                                                      }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h4 className="mt-4">Placements</h4>
                            <FieldArray name="placements">
                              {({ fields }) => (
                                <>
                                  {fields.map((name, index) => (
                                    <Tabs
                                      key={index}
                                      defaultActiveKey={0}
                                      className="mb-3"
                                    >
                                      {placements &&
                                        placements?.map((item, index) => {
                                          return (
                                            <Tab
                                              style={{
                                                padding: "10px",
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                backgroundColor: "#FFF",
                                              }}
                                              key={index}
                                              eventKey={index}
                                              title={item.title}
                                            >
                                              <Field
                                                name={`${name}.${item?.key}`}
                                              >
                                                {({ input, meta }) => (
                                                  <>
                                                    <CKeditorGenerator
                                                      input={input}
                                                      onReady={(editor) => {
                                                        // console.log(editor, 'editor')
                                                      }}
                                                    />
                                                  </>
                                                )}
                                              </Field>
                                            </Tab>
                                          );
                                        })}
                                    </Tabs>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <h4 className="mt-4">FAQs</h4>
                            <FieldArray name="faq">
                              {({ fields }) => (
                                <>
                                  {fields?.map((name, index) => (
                                    <div key={index}>
                                      <Field name={`${name}.question`}>
                                        {({ input, meta }) => (
                                          <>
                                            <CKeditorGenerator
                                              input={input}
                                              onReady={(editor) => {}}
                                            />
                                          </>
                                        )}
                                      </Field>
                                      <Field name={`${name}.answerType`}>
                                        {({ input, meta }) => (
                                          <>
                                            <select {...input}>
                                              <option value="">
                                                select Answer Type
                                              </option>
                                              <option>Short Answer</option>
                                              <option>Paragraph</option>
                                            </select>
                                          </>
                                        )}
                                      </Field>
                                      <Field name={`${name}.answer`}>
                                        {({ input, meta }) => (
                                          <>
                                            <input
                                              {...input}
                                              type="text"
                                              placeholder="Type Your Answer"
                                            />
                                          </>
                                        )}
                                      </Field>
                                      <Field name={`${name}.image`}>
                                        {({ input, meta }) => (
                                          <>
                                            <input
                                              name={`${name}.image`}
                                              onChange={(e) => {
                                                handleFileChange(
                                                  e.target.files,
                                                  e.target.name
                                                );
                                                // input.onChange(e.target.files[0])
                                              }}
                                              type="file"
                                            />
                                          </>
                                        )}
                                      </Field>
                                      {/* <div> */}
                                      <img
                                        onClick={() =>
                                          fields.push({
                                            question: null,
                                            answerType: null,
                                            answer: null,
                                          })
                                        }
                                        className="add_remove_icon"
                                        src="/images/question-add-icon.png"
                                      />
                                      {fields.length > 1 && (
                                        <img
                                          onClick={() => fields.remove(index)}
                                          className="add_remove_icon"
                                          src="/images/delete-icon-blue.png"
                                        />
                                      )}
                                      {/* </div> */}
                                    </div>
                                  ))}
                                </>
                              )}
                            </FieldArray>
                          </Col>
                        </Row>
                      </>
                      <Row>
                        <Col>
                          <button
                            className="admin_signup_btn admin_signup_btn_mobile"
                            type="submit"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </form>
            )}
          />
        </Col>
      </Row>
    </>
  );
}

export default CreateCollege;
