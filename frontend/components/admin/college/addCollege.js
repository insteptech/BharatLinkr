import React from 'react';
import dynamic from 'next/dynamic';
// import withAuth from 'redux/services/withAuth';

const CreateCollege = dynamic(() => import('../../../page-components/admin/college/collegeAdd'), {
  ssr: false,
});

import { Table } from "react-bootstrap";
import {
  collegeAbout,
  collegeadmission,
  placements,
  scholarship,
  distanceeducation,
} from "../../../utils/helper";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

function CreateCollege() {
  const dispatch = useDispatch();
  const [dataValue, setDataValue] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);

  const router = useRouter();
  const { Id } = router.query;

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
  const substreamSelectVal = useSelector(
    (state) => state?.subStreamList?.subStreamDetails?.data?.data?.rows
  );
  const examList = useSelector(
    (state) => state?.examList?.examlist?.data?.data?.rows
  );
  const colstreamSelectVal = useSelector(
    (state) => state?.colStreamList?.colstreamDetails?.data?.data?.rows
  );

  const tableHeading = ["No.", "Course-Name", "Action"];

  const [FileState, setFileState] = useState([]);

  const collegeDetails = useSelector((data) => {
    if (data?.collegelist?.college?.rows?.length > 0) {
      return data?.collegelist?.college?.rows[0];
    }
  });

  const [collegeArr, setCollegeArr] = useState({
    0: { substreamData: substreamSelectVal, colStreamData: colstreamSelectVal },
  });

  const handleMainstreamselect = (form) => {
    form.change("subStreamId", "");
  };

  const handleDeleteAssociate = (deletecourse) => {
    let deletepayload = {
      id: deletecourse.id,
      collegeId: deletecourse?.id,
    };

    dispatch(deleteAssociateCOllege(deletepayload)).then((res) => {
      if (res?.payload?.data?.success) {
        toast.success("Deleted", { autoClose: 1000 });
      }
    });
  };

  const handleSubmit = (values, form) => {
    if (!Id) {
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
        setDataValue(2);
      } else if (dataValue === 2) {
        if (FileState && FileState.length > 0) {
          values.faq.map((item, index) => {
            let x = FileState[index].name.split("_")[0];
            item.uniqueId = x;
          });
          for (let i = 0; i < FileState.length; i++) {
            formData.append("imageFile", FileState[i]);
          }
        }
      }

      if (dataValue == 0) {
        setDataValue(1);
      } else if (dataValue === 1) {
        setDataValue(2);
      } else if (dataValue === 2) {
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
            Router.push("/admin/college");
            toast.success("College added");
          } else {
            toast.error("Error");
          }
        });
      }
    } else {
      if (dataValue == 0) {
        setDataValue(1);
      } else if (dataValue === 1) {
        setDataValue(2);
      } else if (dataValue === 2) {
        let x = values;
        let collegeUpdateObj = {};
        let formdata = new FormData();

        Object.keys(x).map((key) => {
          if (key === "college") {
            Object.keys(x[key][0]).map((ele) => {
              collegeUpdateObj[ele] = x[key][0][ele];
            });
          }
          if (
            key === "scholarShip" ||
            key === "placements" ||
            key === "distanceEducation" ||
            key === "collegeAdmissions" ||
            key === "collegeAbouts"
          ) {
            collegeUpdateObj[key] = x[key][0];
          }
          if (key === "collegeAgencies" || key === "faq") {
            collegeUpdateObj[key] = x[key];
          }
        });

        formdata.append("collegeData", JSON.stringify(collegeUpdateObj));
        if (formdata !== 0) {
          dispatch(updateCollege(formdata)).then((res) => {
            if (res?.payload?.data?.success) {
              Router.push("/admin/college");
              toast.success("College updated");
            } else {
              toast.error("Error");
            }
          });
        }
      }
    }
  };
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

  const validate = (values) => {
    const errors = {};
    let itemArray1 = [];
    let itemArray2 = [];
    let itemArray3 = [];
    let itemArray4 = [];
    let itemArray5 = [];

    if (dataValue === 0) {
      values?.college?.map((item, index) => {
        const error = {};
        if (!item.chooseAffiliationId) {
          error["chooseAffiliationId"] = "*";
        }
        if (!item.collegeName) {
          error["collegeName"] = "*";
        }
        if (!item.collegeMailId) {
          error["collegeMailId"] = "*";
        }
        if (!item.collegeTypeId) {
          error["collegeTypeId"] = "*";
        }
        if (!item.collegeEstablishedDate) {
          error["collegeEstablishedDate"] = "*";
        }
        if (!item.chooseApprovalId) {
          error["chooseApprovalId"] = "*";
        }
        if (!item.collegeStateId) {
          error["collegeStateId"] = "*";
        }
        if (!item.collegeCityId) {
          error["collegeCityId"] = "*";
        }
        if (!item.collegeNaacGrade) {
          error["collegeNaacGrade"] = "*";
        }
        if (!item.collegeStatusId) {
          error["collegeStatusId"] = "*";
        }
        if (!item.collegeLogo) {
          error["collegeLogo"] = "*";
        }
        if (!item.collegeImage) {
          error["collegeImage"] = "*";
        }
        itemArray1.push(error);
      });
      errors["college"] = itemArray1;

      values?.collegeAgencies?.map((item, index) => {
        const error = {};
        if (!item.collegeAgencyId) {
          error["collegeAgencyId"] = "*";
        }
        if (!item.collegeAgencyFor) {
          error["collegeAgencyFor"] = "*";
        }
        if (!item.totalAgency) {
          error["totalAgency"] = "*";
        }
        if (!item.totalAgencyForYears) {
          error["totalAgencyForYears"] = "*";
        }
        itemArray2.push(error);
      });
      errors["collegeAgencies"] = itemArray2;
    }
    if (dataValue === 1) {
      values?.collegeCourse?.map((item, index) => {
        let error = {};
        if (!item.courseTypeId) {
          error["courseTypeId"] = "*";
        }
        if (!item.courseName) {
          error["courseName"] = "*";
        }
        if (!item.coursePlaceId) {
          error["coursePlaceId"] = "*";
        }
        if (!item.courseDuration) {
          error["courseDuration"] = "*";
        }
        if (!item.courseDuration) {
          error["courseDuration"] = "*";
        }
        if (!item.courseEligibility) {
          error["courseEligibility"] = "*";
        }
        if (!item.courseLevel) {
          error["courseLevel"] = "*";
        }
        if (!item.programTypeId) {
          error["programTypeId"] = "*";
        }
        if (!item.courseCategoryId) {
          error["courseCategoryId"] = "*";
        }
        if (!item.chooseExamAcceptedId) {
          error["chooseExamAcceptedId"] = "*";
        }
        if (!item.ShowonFiltering) {
          error["ShowonFiltering"] = "*";
        }

        item?.collegeStreams?.map((items) => {
          let error = {};
          if (!items.mainStreamId) {
            error["mainStreamId"] = "*";
          }
          if (!items.subStreamId) {
            error["subStreamId"] = "*";
          }
          if (!items.colStreamId) {
            error["colStreamId"] = "*";
          }
          itemArray3.push(error);
        });
        itemArray4.push(error);

        item?.courseFees?.map((itemss, index) => {
          let error = {};
          if (!itemss.courseFeeDetailsId) {
            error["courseFeeDetailsId"] = "*";
          }
          if (!itemss.fees) {
            error["fees"] = "*";
          }
          itemArray5.push(error);
        });
        errors["courseFees"] = itemArray5;
      });
      errors["collegeCourse"] = itemArray4;
      errors["collegeCourse"][0]["collegeStreams"] = itemArray3;
      errors["collegeCourse"][0]["courseFees"] = itemArray5;
    }
    return errors;
  };

  const handleTab = (index) => {
    setDataValue(index);
  };

  const masterfilterTypes =
    "affilation,collegetype,approvals,agency,courselevel,coursetype,courseplace,coursefeetype,coursecategory,programtype,eligibility";

  const FormSteps = ["College Register", "Associate Course", "CMS"];

  const dispatchforStreams = (mainArray, subarray) => {
    dispatch(getSubstreamData({ mainStreamId: mainArray }));
    dispatch(getColStreamlist({ subStreamId: subarray }));
  };
  const setInitialValues = (event) => {
    if (event && Object.keys(event).length > 0) {
      return event;
    }
    if (Id) {
      if (collegeDetails) {
        const initialValues = {};
        initialValues.college = [
          {
            id: collegeDetails?.id,
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
            collegeLogo: collegeDetails?.collegeLogo,
            collegeImage: collegeDetails?.collegeImage,
          },
        ];
        let mainStreamArray = [];
        let subStreamArray = [];
        initialValues.collegeCourse = collegeDetails?.AssociateCourse?.map(
          (item) => {
            let x = item?.CourseAssociateStream?.map((ele) => {
              if (!mainStreamArray.includes(ele.mainStreamId))
                mainStreamArray.push(ele.mainStreamId);
              if (!subStreamArray.includes(ele.subStreamId))
                subStreamArray.push(ele.subStreamId);
              return {
                id: ele?.mainStreamId,
                mainStreamId: ele?.mainStreamId,
                subStreamId: ele.subStreamId,
                colStreamId: ele?.ColStream?.id,
              };
            });
            let y = item?.CourseFees?.map((ele) => {
              return {
                id: ele?.id,
                courseFeeDetailsId: ele?.courseFeeDetailsId,
                fees: ele?.fees,
              };
            });

            return {
              id: item?.id,
              courseTypeId: item?.courseTypeId,
              courseName: item?.courseName,
              coursePlaceId: item?.coursePlaceId,
              courseDuration: item?.courseDuration,
              courseEligibility: item?.courseEligibility,
              courseLevel: item?.courseLevel,
              programTypeId: item?.programTypeId,
              courseCategoryId: item?.courseCategoryId,
              chooseExamAcceptedId: item?.chooseExamAcceptedId,
              collegeStreams: x,
              courseFees: y,
            };
          }
        );

        dispatchforStreams(mainStreamArray, subStreamArray);

        collegeDetails?.CollegeAbout?.map((item) => {
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

        collegeDetails?.CollegeAdmission?.map(
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

        collegeDetails?.DistanceEducation?.map(
          (item) =>
            (initialValues.distanceEducation = [
              {
                basicInfo: item?.basicInfo,
                courseDetails: item?.courseDetails,
                honors: item?.honors,
              },
            ])
        );

        collegeDetails?.Placements?.map(
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

        collegeDetails?.Scholarship?.map(
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

        collegeDetails?.FAQ?.map(
          (item) =>
            (initialValues.faq = [
              {
                question: item?.question,
                answerType: item?.answerType,
                answer: item?.answer,
              },
            ])
        );

        collegeDetails?.CollegeAgency?.map(
          (item) =>
            (initialValues.collegeAgencies = [
              {
                id: item?.id,
                collegeAgencyId: item?.collegeAgencyId,
                collegeAgencyFor: item?.collegeAgencyFor,
                totalAgency: item?.totalAgency,
                totalAgencyForYears: item?.totalAgencyForYears,
              },
            ])
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

      (initialValues.collegeCourse = [
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
          collegeStreams: [
            {
              mainStreamId: "",
              subStreamId: "",
              colStreamId: "",
            },
          ],
          courseFees: [
            {
              courseFeeDetailsId: "",
              fees: "",
            },
          ],
        },
      ]),
        (initialValues.collegeAbouts = [
          {
            aboutIntro: "",
            aboutHighLights: "",
            aboutRankingAndAwards: "",
            aboutCourses: "",
            aboutScholarShipPlacements: "",
            aboutFacilities: "",
          },
        ]);
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
      return initialValues;
    }
  };

  const substreamfulllist = useSelector(
    (state) => state?.subStreamList?.subStreamValue?.data?.data?.rows
  );
  const colstreamfulllist = useSelector(
    (state) => state?.colStreamList?.colStreamSlice?.data?.data?.rows
  );

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
    if (Id) dispatch(getCollegebyId({ id: Number(Id) }));
  }, [Id]);

  const handleCityList = (e) => {
    dispatch(cityDropdown(e.target.value));
  };


const CreateCollegeAdd = () => {
  return (
    <>

      {/* <Container> */}
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0">
            <ScrollingCarousel show={5.5} slide={4} swiping={true}>
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
            </ScrollingCarousel>
          </Col>
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
            validate={validate}
            initialValues={useMemo(
              (event) => setInitialValues(event),
              [collegeDetails]
            )}
            render={({
              handleSubmit,
              values,
              initialValues,
              form: {
                mutators: { push, pop, remove },
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
                                          <option value={0}>
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
                                          <option value={0}>
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
                                                        <option value={0}>
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
                                                          <span className="text-danger required_msg">
                                                            {meta.error}
                                                          </span>
                                                        )}
                                                    </>
                                                  )}
                                                </Field>
                                                <div className="item_hide_768">
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
                                                          <span className="text-danger required_msg">
                                                            {meta.error}
                                                          </span>
                                                        )}
                                                    </>
                                                  )}
                                                </Field>
                                                <div className="item_hide_768">
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
                                                          <span className="text-danger required_msg">
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
                                                          <span className="text-danger required_msg">
                                                            {meta.error}
                                                          </span>
                                                        )}
                                                    </>
                                                  )}
                                                </Field>

                                                <div className="d-flex plus_minus_btn_row my-2">
                                                  {!router.query.Id && (
                                                    <div
                                                      type="button"
                                                      className="add_remove_btn"
                                                      onClick={() =>
                                                        fields.push({
                                                          industryId: "",
                                                        })
                                                      }
                                                    >
                                                      <img
                                                        className="add_remove_icon"
                                                        src="/images/plus.png"
                                                      />
                                                    </div>
                                                  )}
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
                    {values?.collegeCourse?.length > 1 && (
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
                            {values?.collegeCourse &&
                              values?.collegeCourse?.map((asscourse, index) => (
                                <tr key={index}>
                                  <td className="text-center admin_table_data">
                                    {displayIndex === index && "*"}
                                    {index + 1}
                                  </td>

                                  <td className="text-center admin_table_data">
                                    {asscourse?.courseName}
                                  </td>

                                  <td className="text-center admin_table_data">
                                    <img
                                      className="mx-1 admin_table_action_icon"
                                      src="/images/edit-icon-blue.png"
                                      onClick={() => setDisplayIndex(index)}
                                    ></img>

                                    {Id ? (
                                      <img
                                        className="mx-1 admin_table_action_icon"
                                        src="/images/delete-icon-blue.png"
                                        onClick={() =>
                                          handleDeleteAssociate(asscourse)
                                        }
                                      ></img>
                                    ) : (
                                      <img
                                        className="mx-1 admin_table_action_icon"
                                        src="/images/delete-icon-blue.png"
                                        onClick={() => {
                                          remove("collegeCourse", index);
                                          if (index !== 0) {
                                            setDisplayIndex(index - 1);
                                          } else {
                                            setDisplayIndex(0);
                                          }
                                        }}
                                      ></img>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                      </div>
                    )}

                    <Row>
                      <FieldArray name="collegeCourse">
                        {({ fields }) => (
                          <>
                            {fields.map(
                              (name, index) =>
                                index === displayIndex && (
                                  <div key={index}>
                                    <Row>
                                      <FieldArray
                                        name={`${name}.collegeStreams`}
                                      >
                                        {({ fields }) => (
                                          <div>
                                            <>
                                              {fields.map(
                                                (
                                                  collegeStreamsname,
                                                  collegeStreamsIndex
                                                ) => (
                                                  <Row>
                                                    <>
                                                      <Col lg={4} md={8}>
                                                        <label className="signup_form_label">
                                                          Choose Streams
                                                        </label>
                                                        <Field
                                                          name={`${collegeStreamsname}.mainStreamId`}
                                                        >
                                                          {({
                                                            input,
                                                            meta,
                                                          }) => (
                                                            <>
                                                              <select
                                                                {...input}
                                                                className="form-control select-style signup_form_input"
                                                                onChange={(
                                                                  e
                                                                ) => {
                                                                  input.onChange(
                                                                    e
                                                                  );
                                                                  handleMainstreamselect(
                                                                    form
                                                                  );
                                                                }}
                                                              >
                                                                <option value="">
                                                                  Select Main
                                                                  Stream
                                                                </option>
                                                                {mainStreamlist &&
                                                                  mainStreamlist.length >
                                                                    0 &&
                                                                  mainStreamlist.map(
                                                                    (
                                                                      item,
                                                                      index
                                                                    ) => (
                                                                      <option
                                                                        key={`MainStream_${index}`}
                                                                        value={
                                                                          item?.id
                                                                        }
                                                                      >
                                                                        {
                                                                          item.mainStreamName
                                                                        }
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
                                                              <div className="d-flex">
                                                                {meta.touched &&
                                                                  meta.error && (
                                                                    <span className="text-danger required_msg">
                                                                      {
                                                                        meta.error
                                                                      }
                                                                    </span>
                                                                  )}
                                                              </div>
                                                            </>
                                                          )}
                                                        </Field>
                                                      </Col>
                                                      <Col lg={4} md={8}>
                                                        <Field
                                                          name={`${collegeStreamsname}.subStreamId`}
                                                        >
                                                          {({
                                                            input,
                                                            meta,
                                                          }) => {
                                                            let list =
                                                              substreamfulllist?.filter(
                                                                (ele) => {
                                                                  return (
                                                                    ele?.mainStreamId ==
                                                                    values
                                                                      ?.collegeCourse[
                                                                      index
                                                                    ]
                                                                      ?.collegeStreams[
                                                                      collegeStreamsIndex
                                                                    ]
                                                                      ?.mainStreamId
                                                                  );
                                                                }
                                                              );
                                                            return (
                                                              <>
                                                                <select
                                                                  {...input}
                                                                  className="form-control select-style signup_form_input margin_top"
                                                                  onChange={(
                                                                    e
                                                                  ) => {
                                                                    input.onChange(
                                                                      e
                                                                    );
                                                                  }}
                                                                  disabled={
                                                                    values
                                                                      ?.collegeCourse[
                                                                      index
                                                                    ]
                                                                      ?.collegeStreams[
                                                                      collegeStreamsIndex
                                                                    ]
                                                                      ?.mainStreamId
                                                                      ? false
                                                                      : true
                                                                  }
                                                                >
                                                                  <option
                                                                    value={""}
                                                                    hidden
                                                                  >
                                                                    Select Sub
                                                                    Stream
                                                                  </option>
                                                                  {substreamfulllist?.map(
                                                                    (ele, i) =>
                                                                      ele?.mainStreamId ==
                                                                        values
                                                                          ?.collegeCourse[
                                                                          index
                                                                        ]
                                                                          ?.collegeStreams[
                                                                          collegeStreamsIndex
                                                                        ]
                                                                          ?.mainStreamId && (
                                                                        <option
                                                                          key={
                                                                            i
                                                                          }
                                                                          value={
                                                                            ele?.id
                                                                          }
                                                                        >
                                                                          {
                                                                            ele?.subStreamName
                                                                          }
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
                                                                <div className="d-flex">
                                                                  {meta.touched &&
                                                                    meta.error && (
                                                                      <span className="text-danger required_msg">
                                                                        {
                                                                          meta.error
                                                                        }
                                                                      </span>
                                                                    )}
                                                                </div>
                                                              </>
                                                            );
                                                          }}
                                                        </Field>
                                                      </Col>
                                                      <Col
                                                        lg={4}
                                                        md={8}
                                                        className="d-flex margin_top"
                                                      >
                                                        <Field
                                                          name={`${collegeStreamsname}.colStreamId`}
                                                        >
                                                          {({
                                                            input,
                                                            meta,
                                                          }) => (
                                                            <>
                                                              <select
                                                                {...input}
                                                                disabled={
                                                                  values
                                                                    ?.collegeCourse[
                                                                    index
                                                                  ]
                                                                    ?.collegeStreams[
                                                                    collegeStreamsIndex
                                                                  ]?.subStreamId
                                                                    ? false
                                                                    : true
                                                                }
                                                                className="form-control select-style signup_form_input margin_bottom"
                                                                onChange={(
                                                                  e
                                                                ) => {
                                                                  input.onChange(
                                                                    e
                                                                  );
                                                                }}
                                                              >
                                                                <option
                                                                  value={""}
                                                                  hidden
                                                                >
                                                                  Select Col
                                                                  Stream
                                                                </option>

                                                                {colstreamfulllist?.map(
                                                                  (ele, i) =>
                                                                    ele?.subStreamId ==
                                                                      values
                                                                        ?.collegeCourse[
                                                                        index
                                                                      ]
                                                                        ?.collegeStreams[
                                                                        collegeStreamsIndex
                                                                      ]
                                                                        ?.subStreamId && (
                                                                      <option
                                                                        key={i}
                                                                        value={
                                                                          ele?.id
                                                                        }
                                                                      >
                                                                        {
                                                                          ele?.colStreamName
                                                                        }
                                                                      </option>
                                                                    )
                                                                )}
                                                              </select>
                                                              <div className="">
                                                                <img
                                                                  className="select_down_icon_second"
                                                                  src="/images/down.png"
                                                                />
                                                              </div>
                                                              <div className="d-flex">
                                                                {meta.touched &&
                                                                  meta.error && (
                                                                    <span className="text-danger required_msg">
                                                                      {
                                                                        meta.error
                                                                      }
                                                                    </span>
                                                                  )}
                                                              </div>
                                                            </>
                                                          )}
                                                        </Field>

                                                        <div className="d-flex plus_btn_margin_bottom_top">
                                                          <div
                                                            type="button"
                                                            className="add_remove_btn ms-2"
                                                            onClick={() => {
                                                              fields.push({
                                                                mainStreamId:
                                                                  "",
                                                                subStreamId: "",
                                                                colStreamId: "",
                                                              });
                                                              setCollegeArr({
                                                                ...collegeArr,
                                                                [fields.length]:
                                                                  {
                                                                    substreamData:
                                                                      substreamSelectVal,
                                                                    colStreamData:
                                                                      colstreamSelectVal,
                                                                  },
                                                              });
                                                            }}
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
                                                                fields.remove(
                                                                  collegeStreamsIndex
                                                                )
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
                                                    </>
                                                  </Row>
                                                )
                                              )}
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
                                                  masterFilterData.coursetype
                                                    .length > 0 &&
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
                                                // onChange={(e) =>
                                                //   input.onChange(e)
                                                // }
                                              />
                                            </>
                                          )}
                                        </Field>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <FieldArray name={`${name}.courseFees`}>
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
                                                                (
                                                                  item,
                                                                  index
                                                                ) => (
                                                                  <option
                                                                    key={`coruseFee_${index}`}
                                                                    value={
                                                                      item.id
                                                                    }
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
                                                    <div className="d-flex ">
                                                      <Field
                                                        name={`${name}.fees`}
                                                      >
                                                        {({ input, meta }) => (
                                                          <div className="w-100">
                                                            <label className="signup_form_label">
                                                              Course Fee
                                                            </label>
                                                            <div className="d-flex">
                                                              {meta.touched &&
                                                                meta.error && (
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
                                                              placeholder="Enter Course Fee"
                                                            />
                                                          </div>
                                                        )}
                                                      </Field>
                                                      <div className="d-flex plus_btn_margin_bottom_top">
                                                        <div
                                                          type="button"
                                                          className="add_remove_btn ms-2 margin_top"
                                                          onClick={() =>
                                                            fields.push({
                                                              courseFeeDetailsId:
                                                                "",
                                                              fees: "",
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
                                                              fields.remove(
                                                                index
                                                              )
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
                                        <Field
                                          name={`${name}.courseEligibility`}
                                        >
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
                                        <Field
                                          name={`${name}.courseCategoryId`}
                                        >
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
                                                  masterFilterData
                                                    .coursecategory.length >
                                                    0 &&
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
                                        <Field
                                          name={`${name}.chooseExamAcceptedId`}
                                        >
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
                                                  examList.map(
                                                    (item, index) => (
                                                      <option
                                                        key={`Exam_${index}`}
                                                        value={item.id}
                                                      >
                                                        {item?.examName}
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
                                                <option value="">
                                                  True/False
                                                </option>
                                                <option value={true}>
                                                  True
                                                </option>
                                                <option value={false}>
                                                  False
                                                </option>
                                              </select>
                                            </>
                                          )}
                                        </Field>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col className="text-center">
                                        <button
                                          type="button"
                                          className="admin_signup_btn me-4"
                                          onClick={() => {
                                            push("collegeCourse", {
                                              courseTypeId: "",
                                              courseName: "",
                                              coursePlaceId: "",
                                              courseDuration: "",
                                              courseEligibility: "",
                                              courseLevel: "",
                                              programTypeId: "",
                                              courseCategoryId: "",
                                              chooseExamAcceptedId: "",
                                              collegeStreams: [
                                                {
                                                  mainStreamId: "",
                                                  subStreamId: "",
                                                  colStreamId: "",
                                                },
                                              ],
                                              courseFees: [
                                                {
                                                  courseFeeDetailsId: "",
                                                  fees: "",
                                                },
                                              ],
                                            });
                                            setDisplayIndex(
                                              values?.collegeCourse?.length
                                            );
                                          }}
                                        >
                                          Add more
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
                                )
                            )}
                          </>
                        )}
                      </FieldArray>
                    </Row>
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
                                            <select
                                              {...input}
                                              className="signup_form_input"
                                            >
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
                                              className="signup_form_input"
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
                        <Col className="text-center">
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
};

export default CreateCollegeAdd