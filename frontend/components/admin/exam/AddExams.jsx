import dynamic from "next/dynamic";
import React, { useState, useMemo, useEffect } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { getMainStream } from "../../../redux/actions/streams/addMainStreams";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMasterFilter,
  getMasterFilter,
} from "../../../redux/actions/masterfilter/createmasterfilter";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  addExam,
  editExam,
  getExamById,
} from "../../../redux/actions/exams/createExam";

const CKeditorGenerator = dynamic(() => import("../CKeditor"), {
  ssr: false,
});
// const CKeditorGenerator = React.lazy(() => import("../Ckeditor"))
export default function AddExams() {
  const FormSteps = ["Exam Register", "CMS"];
  const [dataValue, setDataValue] = useState(0);
  const dispatch = useDispatch();
  const [FileState, setFileState] = useState([]);
  const [examlogo, setExamlogo] = useState();
  const router = useRouter();

  const mainStreamdata = useSelector(
    (data) => data?.mainStreamList?.mainStreamValue?.data?.data?.rows
  );
  const prevExamData = useSelector(
    (data) => data?.exambyid?.exam?.data?.data?.rows[0]
  );
  const prevExamLoader = useSelector((data) => data?.exambyid);
  const masterFilterData = useSelector(
    (data) => data?.allMasterFilterList?.masterfilterlist?.data?.data
  );
  const masterValues = "coursetype,applicationmode,exammode,examtype";

  const { Id } = router.query;

  useEffect(() => {
    dispatch(getMainStream());
    dispatch(getMasterFilter());
    dispatch(getAllMasterFilter(masterValues));
    if (Id) {
      dispatch(getExamById(Number(Id)));
    }
  }, [Id]);

  const examAbout = [
    { title: "Def", key: "examAboutDefination" },
    { title: "Highlights", key: "examAboutHighlights" },
    { title: "Imp. Dates", key: "examAboutImportantDates" },
    { title: "Pattern", key: "examAboutPattern" },
    { title: "Syllabus", key: "examAboutSyllabus" },
    { title: "Imp. Books", key: "examAboutImportantBooks" },
    { title: "Helpline", key: "examAboutHelpLine" },
    { title: "Previous Papers", key: "examAboutPreviousPapers" },
  ];

  const Registration = [
    { title: "Highlights", key: "examRegistrationHighlights" },
    { title: "App. Date", key: "applicationDate" },
    { title: "App. Fees", key: "applicationFees" },
    { title: "Eligibility", key: "eligibility" },
    { title: "Documents Required", key: "documentsRequired" },
    { title: "Guide", key: "guide" },
    { title: "App. Form Correction", key: "applicationFormCorrection" },
  ];

  const AdmitCard = [
    { title: "Highlights", key: "examAdmitCardHighlights" },
    { title: "Release Date", key: "releaseDate" },
    { title: "How To Download", key: "howToDownload" },
    { title: "Sample", key: "sample" },
    { title: "Forgot Login Details", key: "forgotLoginDetails" },
    { title: "Correction", key: "correction" },
  ];

  const ImportantDates = [
    { title: "Intro", key: "examImportantDatesIntro" },
    { title: "Exam Schedule", key: "examSchedule" },
    { title: "Schedule For Other Sessions", key: "scheduleForOtherSession" },
  ];

  const Reservation = [
    { title: "Intro", key: "examReservationIntro" },
    { title: "Highlights", key: "examReservationHighlights" },
    { title: "Criteria", key: "criteria" },
    { title: "Category Wise", key: "categoryWise" },
    { title: "For Women", key: "forWomen" },
    { title: "For Pwd Category", key: "forPWDWomen" },
    { title: "Under EWS Quota", key: "underEWSQuota" },
  ];

  const ExamsCentres = [
    { title: "Intro", key: "examCentreIntro" },
    { title: "List of Exam Centres", key: "listOfExamCentres" },
  ];

  const Eligibility = [
    { title: "Intro", key: "examEligibilityIntro" },
    { title: "Highlights", key: "examEligibilityHighlights" },
    { title: "Detailed Criteria", key: "detailedCriteria" },
    {
      title: "Marks Required For Qualifying",
      key: "marksRequiredForQualifying",
    },
  ];

  const ExamPattern = [
    { title: "Highlights", key: "examPatternHighlights" },
    { title: "Paper 1 Pattern", key: "examPatternPaper1Pattern" },
    { title: "Paper 2 Pattern", key: "examPatternPaper2Pattern" },
    { title: "Paper 3 Pattern", key: "examPatternPaper3Pattern" },
    { title: "Paper 4 Pattern", key: "examPatternPaper4Pattern" },
    { title: "Paper 5 Pattern", key: "examPatternPaper5Pattern" },
    { title: "Paper 6 Pattern", key: "examPatternPaper6Pattern" },
    { title: "Weightage", key: "weightage" },
  ];

  const Syllabus = [
    { title: "Highlights", key: "examSyllabusHighlights" },
    { title: "Paper 1 Pattern", key: "examSyllabusPaper1Pattern" },
    { title: "Paper 2 Pattern", key: "examSyllabusPaper2Pattern" },
    { title: "Paper 3 Pattern", key: "examSyllabusPaper3Pattern" },
    { title: "Paper 4 Pattern", key: "examSyllabusPaper4Pattern" },
    { title: "Paper 5 Pattern", key: "examSyllabusPaper5Pattern" },
    { title: "Paper 6 Pattern", key: "examSyllabusPaper6Pattern" },
    { title: "Best Books", key: "bestBooks" },
  ];

  const PreparationTips = [
    { title: "Best Time", key: "bestTime" },
    {
      title: "Section wise preparation Tips",
      key: "sectionWisePreparationTips",
    },
    { title: "Subject 1 Books", key: "subject1Books" },
    { title: "Subject 2 Books", key: "subject2Books" },
    { title: "Subject 3 Books", key: "subject3Books" },
    { title: "Subject 4 Books", key: "subject4Books" },
  ];

  const Counselling = [
    { title: "Step By Step Process", key: "stepByStepProcess" },
    { title: "Schedule For Exams", key: "scheduleForExams" },
    {
      title: "Other Related Exams Counselling",
      key: "otherRelatedExamsCounselling",
    },
  ];

  const ParticipatingColleges = [
    {
      title: "List of Top Colleges That accepts JEE",
      key: "listOfTopCollegesAcceptingJEE",
    },
  ];

  const handleSubmit = (values) => {
    console.log(values, "values");
    if (Id) {
      if (dataValue === 0) {
        setDataValue(1);
      }
      if (dataValue === 1) {
        let x = values;
        let examobj = {};
        let formdata = new FormData();
        Object.keys(x).map((key) => {
          Object.keys(x[key][0]).map((i) => {
            if (key === "exam") {
              examobj = {
                ...examobj,
                [i]: x[key][0][i],
              };
            }
            if (key === "examFAQ") {
              examobj.faq = x[key];
            } else {
              examobj[key] = {
                ...examobj[key],
                [i]: x[key][0][i],
              };
            }
          });
        });
        delete examobj.exam;

        if (prevExamData?.examName === examobj?.examName) {
          delete examobj.examName;
        }
        if (examlogo) {
          examobj.uniqueId = examlogo?.name?.split("_")[0];
          formdata.append("examLogoFile", examlogo);
        }

        formdata.append("examData", JSON.stringify(examobj));

        dispatch(editExam(formdata)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Exam updated");
            router.push("/admin/exams");
          } else {
            toast.error("error");
          }
        });
      }
    } else {
      if (dataValue === 0) {
        setDataValue(1);
      }
      if (dataValue === 1) {
        let data = { payload: [{}] };
        data.payload[0] = values;

        let formdata = new FormData();
        FileState.map((item, i) => {
          data.payload[0].examFAQ[item?.index].uniqueId =
            item?.file?.name?.split("_")[0];
          formdata.append("imageFile", item.file);
        });
        data.payload[0].exam[0].uniqueId = examlogo?.name?.split("_")[0];
        formdata.append("examLogoFile", examlogo);

        Object.values(values).map((ele, ind) =>
          ele.map((e) => {
            Object.values(e).some((item) => {
              if (item !== null) {
                data.payload[0][Object.keys(values)[ind]] = ele;
              }
            });
          })
        );

        formdata.append("examData", JSON.stringify(data));

        dispatch(addExam(formdata)).then((res) => {
          if (res?.payload?.data?.success) {
            toast.success("Exam Added");
            router.push("/admin/exams");
          } else {
            toast.error("error");
          }
        });
      }
    }
  };

  const validate = (values) => {
    let errors = {};
    if (dataValue === 0) {
      if (!values.mainStream) {
        errors["mainStream"] = "*";
      }
      if (!values.courseType) {
        errors["courseType"] = "*";
      }
      if (!values.examName) {
        errors["examName"] = "*";
      }
      if (!values.examType) {
        errors["examType"] = "*";
      }
      if (!values.examMode) {
        errors["examMode"] = "*";
      }
      if (!values.applicationMode) {
        errors["applicationMode"] = "*";
      }
      if (!values.applicationDate) {
        errors["applicationDate"] = "*";
      }
      if (!values.examDate) {
        errors["examDate"] = "*";
      }
      if (!values.resultDate) {
        errors["resultDate"] = "*";
      }
      if (!values.examLogo) {
        errors["examLogo"] = "*";
      }
    }
    return errors;
  };

  const init = (e) => {
    if (e && Object.keys(e).length > 0) {
      return e;
    }
    if (prevExamData) {
      const initialValues = {
        exam: [
          {
            id: prevExamData?.id,
            mainStreamId: prevExamData?.mainStreamId,
            courseTypeId: prevExamData?.courseTypeId,
            examName: prevExamData?.examName,
            examTypeId: prevExamData?.examTypeId,
            examModeId: prevExamData?.examModeId,
            applicationModeId: prevExamData?.applicationModeId,
            examApplicationDate: prevExamData?.examApplicationDate,
            examDate: prevExamData?.examDate,
            resultAnnouncementDate: prevExamData?.resultAnnouncementDate,
          },
        ],
        examAbouts: [
          {
            id: prevExamData?.ExamAbout[0]?.id,
            examAboutDefination:
              prevExamData?.ExamAbout[0]?.examAboutDefination || null,
            examAboutHighlights:
              prevExamData?.ExamAbout[0]?.examAboutHighlights,
            examAboutImportantDates:
              prevExamData?.ExamAbout[0]?.examAboutImportantDates,
            examAboutPattern: prevExamData?.ExamAbout[0]?.examAboutPattern,
            examAboutSyllabus: prevExamData?.ExamAbout[0]?.examAboutSyllabus,
            examAboutImportantBooks:
              prevExamData?.ExamAbout[0]?.examAboutImportantBooks,
            examAboutHelpLine: prevExamData?.ExamAbout[0]?.examAboutHelpLine,
            examAboutPreviousPapers:
              prevExamData?.ExamAbout[0]?.examAboutPreviousPapers,
          },
        ],
        examRegistrations: [
          {
            id: prevExamData?.Registration[0]?.id,
            examRegistrationHighlights:
              prevExamData?.Registration[0]?.examRegistrationHighlights,
            applicationDate: prevExamData?.Registration[0]?.applicationDate,
            applicationFees: prevExamData?.Registration[0]?.applicationFees,
            eligibility: prevExamData?.Registration[0]?.eligibility,
            documentsRequired: prevExamData?.Registration[0]?.documentsRequired,
            guide: prevExamData?.Registration[0]?.guide,
            applicationFormCorrection:
              prevExamData?.Registration[0]?.applicationFormCorrection,
          },
        ],
        examAdmitCards: [
          {
            id: prevExamData?.AdmitCard[0]?.id,
            examAdmitCardHighlights:
              prevExamData?.AdmitCard[0]?.examAdmitCardHighlights,
            releaseDate: prevExamData?.AdmitCard[0]?.releaseDate,
            howToDownload: prevExamData?.AdmitCard[0]?.howToDownload,
            sample: prevExamData?.AdmitCard[0]?.sample,
            forgotLoginDetails: prevExamData?.AdmitCard[0]?.forgotLoginDetails,
            correction: prevExamData?.AdmitCard[0]?.correction,
          },
        ],
        examImportantDate: [
          {
            id: prevExamData?.ImportantDates[0]?.id,
            examImportantDatesIntro:
              prevExamData?.ImportantDates[0]?.examImportantDatesIntro,
            examSchedule: prevExamData?.ImportantDates[0]?.examSchedule,
            scheduleForOtherSession:
              prevExamData?.ImportantDates[0]?.scheduleForOtherSession,
          },
        ],
        examReservations: [
          {
            id: prevExamData?.Reservation[0]?.id,
            examReservationIntro:
              prevExamData?.Reservation[0]?.examReservationIntro,
            examReservationHighlights:
              prevExamData?.Reservation[0]?.examReservationHighlights,
            criteria: prevExamData?.Reservation[0]?.criteria,
            categoryWise: prevExamData?.Reservation[0]?.categoryWise,
            forWomen: prevExamData?.Reservation[0]?.forWomen,
            forPWDWomen: prevExamData?.Reservation[0]?.forPWDWomen,
            underEWSQuota: prevExamData?.Reservation[0]?.underEWSQuota,
          },
        ],
        examCentre: [
          {
            id: prevExamData?.Centres[0]?.id,
            examCentreIntro: prevExamData?.Centres[0]?.examCentreIntro,
            listOfExamCentres: prevExamData?.Centres[0]?.listOfExamCentres,
          },
        ],
        examEligibilities: [
          {
            id: prevExamData?.Eligibility[0]?.id,
            examEligibilityIntro:
              prevExamData?.Eligibility[0]?.examEligibilityIntro,
            examEligibilityHighlights:
              prevExamData?.Eligibility[0]?.examEligibilityHighlights,
            detailedCriteria: prevExamData?.Eligibility[0]?.detailedCriteria,
            marksRequiredForQualifying:
              prevExamData?.Eligibility[0]?.marksRequiredForQualifying,
          },
        ],
        examPatterns: [
          {
            id: prevExamData?.Pattern[0]?.id,
            examPatternHighlights:
              prevExamData?.Pattern[0]?.examPatternHighlights,
            examPatternPaper1Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper1Pattern,
            examPatternPaper2Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper2Pattern,
            examPatternPaper3Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper3Pattern,
            examPatternPaper4Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper4Pattern,
            examPatternPaper5Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper5Pattern,
            examPatternPaper6Pattern:
              prevExamData?.Pattern[0]?.examPatternPaper6Pattern,
            weightage: prevExamData?.Pattern[0]?.weightage,
          },
        ],
        examSyllabuss: [
          {
            id: prevExamData?.Syllabus[0]?.id,
            examSyllabusHighlights:
              prevExamData?.Syllabus[0]?.examSyllabusHighlights,
            examSyllabusPaper1Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper1Pattern,
            examSyllabusPaper2Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper2Pattern,
            examSyllabusPaper3Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper3Pattern,
            examSyllabusPaper4Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper4Pattern,
            examSyllabusPaper5Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper5Pattern,
            examSyllabusPaper6Pattern:
              prevExamData?.Syllabus[0]?.examSyllabusPaper6Pattern,
            bestBooks: prevExamData?.Syllabus[0]?.bestBooks,
          },
        ],
        examPreparationTip: [
          {
            id: prevExamData?.PreparationTips[0]?.id,
            bestTime: prevExamData?.PreparationTips[0]?.bestTime,
            sectionWisePreparationTips:
              prevExamData?.PreparationTips[0]?.sectionWisePreparationTips,
            subject1Books: prevExamData?.PreparationTips[0]?.subject1Books,
            subject2Books: prevExamData?.PreparationTips[0]?.subject2Books,
            subject3Books: prevExamData?.PreparationTips[0]?.subject3Books,
            subject4Books: prevExamData?.PreparationTips[0]?.subject4Books,
          },
        ],
        examCounsellings: [
          {
            id: prevExamData?.Counselling[0]?.id,
            stepByStepProcess: prevExamData?.Counselling[0]?.stepByStepProcess,
            scheduleForExams: prevExamData?.Counselling[0]?.scheduleForExams,
            otherRelatedExamsCounselling:
              prevExamData?.Counselling[0]?.otherRelatedExamsCounselling,
          },
        ],
        examParticipatingCollege: [
          {
            id: prevExamData?.ParticipatingCollege[0]?.id,
            listOfTopCollegesAcceptingJEE:
              prevExamData?.ParticipatingCollege[0]
                ?.listOfTopCollegesAcceptingJEE,
          },
        ],
        examFAQ: [],
      };
      prevExamData?.FAQ.map((item) => {
        let unqId = item.image && Number(item?.image.split("_")[0]);
        return initialValues.examFAQ.push({
          id: item.id,
          question: item.question,
          answerType: item.answerType,
          answer: item.answer,
          uniqueId: unqId,
        });
      });
      return initialValues;
    } else {
      const initialValues = {
        exam: [
          {
            mainStreamId: "",
            courseTypeId: "",
            examName: "",
            examTypeId: "",
            examModeId: "",
            applicationModeId: "",
            examApplicationDate: "",
            examDate: "",
            resultAnnouncementDate: "",
          },
        ],
        examAbouts: [
          {
            examAboutDefination: null,
            examAboutHighlights: null,
            examAboutImportantDates: null,
            examAboutPattern: null,
            examAboutSyllabus: null,
            examAboutImportantBooks: null,
            examAboutHelpLine: null,
            examAboutPreviousPapers: null,
          },
        ],
        examRegistrations: [
          {
            examRegistrationHighlights: null,
            applicationDate: null,
            applicationFees: null,
            eligibility: null,
            documentsRequired: null,
            guide: null,
            applicationFormCorrection: null,
          },
        ],
        examAdmitCards: [
          {
            examAdmitCardHighlights: null,
            releaseDate: null,
            howToDownload: null,
            sample: null,
            forgotLoginDetails: null,
            correction: null,
          },
        ],
        examImportantDate: [
          {
            examImportantDatesIntro: null,
            examSchedule: null,
            scheduleForOtherSession: null,
          },
        ],
        examReservations: [
          {
            examReservationIntro: null,
            examReservationHighlights: null,
            criteria: null,
            categoryWise: null,
            forWomen: null,
            forPWDWomen: null,
            underEWSQuota: null,
          },
        ],
        examCentre: [
          {
            examCentreIntro: null,
            listOfExamCentres: null,
          },
        ],
        examEligibilities: [
          {
            examEligibilityIntro: null,
            examEligibilityHighlights: null,
            detailedCriteria: null,
            marksRequiredForQualifying: null,
          },
        ],
        examPatterns: [
          {
            examPatternHighlights: null,
            examPatternPaper1Pattern: null,
            examPatternPaper2Pattern: null,
            examPatternPaper3Pattern: null,
            examPatternPaper4Pattern: null,
            examPatternPaper5Pattern: null,
            examPatternPaper6Pattern: null,
            weightage: null,
          },
        ],
        examSyllabuss: [
          {
            examSyllabusHighlights: null,
            examSyllabusPaper1Pattern: null,
            examSyllabusPaper2Pattern: null,
            examSyllabusPaper3Pattern: null,
            examSyllabusPaper4Pattern: null,
            examSyllabusPaper5Pattern: null,
            examSyllabusPaper6Pattern: null,
            bestBooks: null,
          },
        ],
        examPreparationTip: [
          {
            bestTime: null,
            sectionWisePreparationTips: null,
            subject1Books: null,
            subject2Books: null,
            subject3Books: null,
            subject4Books: null,
          },
        ],
        examCounsellings: [
          {
            stepByStepProcess: null,
            scheduleForExams: null,
            otherRelatedExamsCounselling: null,
          },
        ],
        examParticipatingCollege: [{ listOfTopCollegesAcceptingJEE: null }],
        examFAQ: [{ question: null, answerType: null, answer: null }],
      };
      return initialValues;
    }
  };

  const handlefaqremove = (index) => {
    let x = [];
    FileState.map((item, i) => {
      if (item.index !== index) {
        x.push(item);
      }
    });
    setFileState(x);
  };

  const handleFileChange = (filesObject, name, index) => {
    const uniqueId = Date.now();
    const filename = uniqueId + "_" + filesObject[0].name;
    let file = new File(filesObject, filename);
    file["nameType"] = name;
    if (FileState.length === 0) {
      setFileState([{ file: file, index: index }]);
    } else {
      let x = FileState;
      FileState.map((item, i) => {
        if (item.index === index) {
          FileState.splice(i, 1);
          x.push({ file: file, index: index });
          setFileState(x);
        } else {
          setFileState([...FileState, { file: file, index: index }]);
        }
      });
    }
  };

  const examlogohandles = (filesObject) => {
    if (Id) {
      let uniqueId = prevExamData?.examLogo?.split("_")[0];
      let filename = uniqueId + "_" + filesObject[0].name;
      let file = new File(filesObject, filename);
      setExamlogo(file);
    } else {
      let uniqueId = Date.now();
      let filename = uniqueId + "_" + filesObject[0].name;
      let file = new File(filesObject, filename);
      setExamlogo(file);
    }
  };

  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col className="p-0">
            <ul className="nav tabs_scroll">
              {FormSteps &&
                FormSteps?.map((steps, stepsIndex) => (
                  <li className="nav-item " key={stepsIndex}>
                    <a
                      className={`nav-link admin_tabs_name ${
                        dataValue === stepsIndex && "head-active"
                      }`}
                      // active={true}
                      onClick={() => setDataValue(stepsIndex)}
                    >
                      {steps}
                    </a>
                  </li>
                ))}
            </ul>
          </Col>
          <Col className="text-end">
            <Button className="border_btn green delete_btn_margin">
              Delete
            </Button>
          </Col>
        </Row>
      </div>
      <Form
        onSubmit={handleSubmit}
        mutators={{
          ...arrayMutators,
        }}
        keepDirtyOnReinitialize
        // validate={validate}
        initialValues={useMemo((e) => init(e), [prevExamData])}
        render={({ handleSubmit, values, dirtyFields, initialValues }) => (
          <form onSubmit={handleSubmit}>
            {prevExamLoader.loading && <h1>Loading...</h1>}
            {dataValue === 0 && (
              <>
                <FieldArray name="exam">
                  {({ fields }) => (
                    <>
                      {fields.map((name, index) => (
                        <div key={index}>
                          <Row>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.mainStreamId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Main Stream
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
                                        Select Main Stream
                                      </option>
                                      {mainStreamdata &&
                                        mainStreamdata?.map((item, index) => {
                                          return (
                                            <option key={index} value={item.id}>
                                              {item?.mainStreamName}
                                            </option>
                                          );
                                        })}
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
                            <Col md={12} lg={6}>
                              <Field name={`${name}.courseTypeId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Course Type
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
                                        Select Course Type
                                      </option>

                                      {masterFilterData &&
                                        masterFilterData?.coursetype?.map(
                                          (item, index) => {
                                            if (item?.types === "coursetype") {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          }
                                        )}
                                      <option value="">
                                        Select Course Type
                                      </option>
                                      {masterFilterData &&
                                        masterFilterData?.coursetype?.map(
                                          (item, index) => {
                                            if (item?.types === "coursetype") {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          }
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
                          </Row>
                          <Row>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examName`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Name
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
                                      placeholder="Enter Exam Name"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examTypeId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Type
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
                                      {!Id && (
                                        <option value="">
                                          Select Exam Type
                                        </option>
                                      )}
                                      {masterFilterData &&
                                        masterFilterData?.examtype?.map(
                                          (item, index) => {
                                            if (item.types === "examtype") {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          }
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
                          </Row>
                          <Row>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examModeId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Mode
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
                                      {!Id && (
                                        <option value="">
                                          Select Exam Mode
                                        </option>
                                      )}
                                      {masterFilterData &&
                                        masterFilterData?.exammode?.map(
                                          (item, index) => {
                                            if (item.types === "exammode") {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          }
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
                            <Col md={12} lg={6}>
                              <Field name={`${name}.applicationModeId`}>
                                {({ input, meta }) => (
                                  <>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Application mode
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
                                      <option>Select Application mode</option>
                                      {masterFilterData &&
                                        masterFilterData?.applicationmode?.map(
                                          (item, index) => {
                                            if (
                                              item.types === "applicationmode"
                                            ) {
                                              return (
                                                <option
                                                  key={index}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              );
                                            }
                                          }
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
                          </Row>
                          <Row>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examApplicationDate`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Application Date
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      {...input}
                                      type="input"
                                      className="form-control signup_form_input margin_bottom"
                                      placeholder="DD/MM/YYYY - DD/MM/YYYY"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examDate`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Date
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      {...input}
                                      type="input"
                                      className="form-control signup_form_input margin_bottom"
                                      placeholder="DD/MM/YYYY - DD/MM/YYYY"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.resultAnnouncementDate`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Result Date
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      {...input}
                                      type="date"
                                      className="form-control signup_form_input margin_bottom"
                                      placeholder="Enter Exam Name"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col md={12} lg={6}>
                              <Field name={`${name}.examLogoFile`}>
                                {({ input, meta }) => (
                                  <div>
                                    <div className="d-flex">
                                      <label className="signup_form_label">
                                        Exam Logo
                                      </label>
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      onChange={(e) => {
                                        examlogohandles(e.target.files);
                                      }}
                                      type="file"
                                      className="form-control signup_form_input"
                                      placeholder="Enter Exam Name"
                                    />
                                  </div>
                                )}
                              </Field>
                              {/* <Field name={`${name}.examLogoFile`} component="input" type="file"/> */}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="text-center">
                              <button
                                className="admin_signup_btn admin_signup_btn_mobile"
                                onClick={() => setDataValue(1)}
                              >
                                Add Category
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
                <div>
                  <Row>
                    <Col>
                      <h4>Exam About</h4>
                      <FieldArray name="examAbouts">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {examAbout?.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Registration</h4>
                      <FieldArray name="examRegistrations">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                defaultActiveKey={0}
                                className="mb-3"
                                key={index}
                              >
                                {Registration.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Admit Card</h4>
                      <FieldArray name="examAdmitCards">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {AdmitCard.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Important Dates</h4>
                      <FieldArray name="examImportantDate">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {ImportantDates.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Reservation</h4>
                      <FieldArray name="examReservations">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {Reservation.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Exams Centres</h4>
                      <FieldArray name="examCentre">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {ExamsCentres.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Eligibility</h4>
                      <FieldArray name="examEligibilities">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {Eligibility.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Exam Pattern</h4>
                      <FieldArray name="examPatterns">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {ExamPattern.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Syllabus</h4>
                      <FieldArray name="examSyllabuss">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {Syllabus.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Preparation Tips</h4>
                      <FieldArray name="examPreparationTip">
                        {({ fields }) => (
                          <>
                            {fields.map((name, index) => (
                              <Tabs
                                key={index}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {PreparationTips.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                      <h4 className="mt-4">Counselling</h4>
                      <FieldArray name="examCounsellings">
                        {({ fields }) => (
                          <>
                            {fields.map((name, fieldIndex) => (
                              <Tabs
                                key={fieldIndex}
                                defaultActiveKey={0}
                                className="mb-3"
                              >
                                {Counselling.map((item, index) => {
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
                                      <Field name={`${name}.${item.key}`}>
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
                </div>
                <Row>
                  <Col>
                    <h4 className="mt-4">Participating Colleges</h4>
                    <FieldArray name="examParticipatingCollege">
                      {({ fields }) => (
                        <>
                          {fields?.map((name, fieldIndex) => (
                            <Tabs
                              key={fieldIndex}
                              defaultActiveKey={0}
                              className="mb-3"
                            >
                              {ParticipatingColleges?.map((item, index) => {
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
                                    <Field name={`${name}.${item.key}`}>
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
                    <Tabs defaultActiveKey={0} className="mb-3">
                      <Tab
                        style={{
                          padding: "10px",
                          border: "1px solid black",
                          borderRadius: "5px",
                          backgroundColor: "#FFF",
                        }}
                        eventKey={0}
                        title="General"
                      >
                        <FieldArray name="examFAQ">
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
                                              e.target.name,
                                              index
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
                                      onClick={() => {
                                        fields.remove(index);
                                        handlefaqremove(index);
                                      }}
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
                      </Tab>
                    </Tabs>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <button
                      className="admin_signup_btn admin_signup_btn_mobile"
                      type="submit"
                      // onClick={()=>{ddddddddddd(values,dirtyFields)}}
                    >
                      Add Category
                    </button>
                  </Col>
                </Row>
              </>
            )}
          </form>
        )}
      />
    </>
  );
}
