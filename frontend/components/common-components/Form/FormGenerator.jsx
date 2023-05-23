import { Button, Col, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { FieldTypes, inputFieldTypes } from "../../../utils/helper";

const renderFields = (
  values,
  fieldObject,
  fieldIndex,
  fieldArrayObject,
  fieldArrayFunctions
) => {
  let isFieldShow = fieldObject.show ? fieldObject.show(values) : true;
  let buttonShow = fieldObject.buttonShow
    ? fieldObject.buttonShow(fieldArrayObject?.fieldArrayIndex)
    : true;
  return (
    <>
      <Col
        md={fieldObject.col ? fieldObject.col : "6"}
        key={`fields_${fieldIndex}`}
        className="my-3 align-self-end"
      >
        <div>
          {fieldObject.component && isFieldShow && (
            <>
              <Field
                name={
                  fieldArrayObject?.fieldArrayName
                    ? `${fieldArrayObject?.fieldArrayName}${fieldObject.name}`
                    : `${fieldObject.name}`
                }
              >
                {({ input, meta }) => (
                  <div className="d-flex flex-column">
                    <label htmlFor="" className="mx-3 signup_form_label">
                      {fieldObject && fieldObject?.label && fieldObject?.label}
                    </label>
                    {fieldObject?.component(input, meta)}

                    {meta.error && meta.touched && (
                      <p className="p-error error_message">{meta.error}</p>
                    )}
                  </div>
                )}
              </Field>
            </>
          )}
          {!fieldObject.component &&
            fieldObject.fieldType !== FieldTypes.actions &&
            fieldObject.type !== inputFieldTypes.textarea &&
            isFieldShow && (
              <Field
                name={
                  fieldArrayObject?.fieldArrayName
                    ? `${fieldArrayObject?.fieldArrayName}${fieldObject.name}`
                    : `${fieldObject?.name}`
                }
              >
                {({ input, meta }) => (
                  <div className="d-flex flex-column">
                    <label
                      htmlFor={`${fieldObject.name}`}
                      className="mx-3 signup_form_label"
                    >
                      {fieldObject && fieldObject?.label && fieldObject?.label}
                    </label>
                    <input
                      className={`form-control signup_form_input ${
                        fieldObject?.className && fieldObject?.className
                      }`}
                      {...input}
                      type={fieldObject?.type}
                      disabled={fieldObject?.disabled}
                      placeholder={
                        fieldObject.placeholder && fieldObject.placeholder
                      }
                    />
                    <div className="signup_input_icon_div">
                      {fieldObject.icon && (
                        <img
                          className="signup_input_icon"
                          src={fieldObject.icon}
                        />
                      )}
                    </div>
                    {meta.error && meta.touched && (
                      <p className="p-error error_message">{meta.error}</p>
                    )}
                  </div>
                )}
              </Field>
            )}
          {!fieldObject.component &&
            fieldObject.fieldType !== FieldTypes.actions &&
            fieldObject.type === inputFieldTypes.textarea &&
            isFieldShow && (
              <Field
                name={
                  fieldArrayObject?.fieldArrayName
                    ? `${fieldArrayObject?.fieldArrayName}${fieldObject.name}`
                    : `${fieldObject.name}`
                }
              >
                {({ input, meta }) => (
                  <div className="d-flex flex-column">
                    <label htmlFor="" className="mx-3 signup_form_label">
                      {fieldObject && fieldObject?.label && fieldObject.label}
                    </label>
                    <textarea
                      {...input}
                      className={`form-control signup_form_input big_input ${
                        fieldObject?.className && fieldObject?.className
                      }`}
                      disabled={fieldObject?.disabled}
                      placeholder={
                        fieldObject.placeholder && fieldObject.placeholder
                      }
                    ></textarea>
                    {meta.error && meta.touched && (
                      <p className="p-error error_message">{meta.error}</p>
                    )}
                  </div>
                )}
              </Field>
            )}
          {!fieldObject.component &&
            fieldObject.fieldType === FieldTypes.actions &&
            buttonShow &&
            isFieldShow && (
              <Col
                className="text-center"
                md={fieldObject.col ? fieldObject?.col : "12"}
                key={`button_${fieldObject}`}
              >
                <Button
                  variant={
                    fieldObject.variant ? fieldObject?.variant : "primary"
                  }
                  type={fieldObject?.type}
                  className={fieldObject.className && fieldObject?.className}
                  active={
                    fieldObject.activeCondition && fieldObject.activeCondition
                  }
                  size={fieldObject.size && fieldObject.size}
                  onClick={() =>
                    fieldArrayFunctions[fieldObject.event](
                      `${fieldObject.name}`
                    )
                  }
                  disabled={fieldObject.disabled && fieldObject.disabled}
                >
                  {/* {`${fieldObject?.body}`} */}
                  <img
                    className="add_remove_icon"
                    src={`${fieldObject?.icon}`}
                  />
                </Button>
              </Col>
            )}
        </div>
      </Col>
    </>
  );
};

const renderFieldArray = (
  values,
  fieldArrayItem,
  fieldArrayIndex,
  funcObject
) => {
  return (
    <FieldArray name={fieldArrayItem.name} key={fieldArrayIndex}>
      {({ fields }) =>
        fields.map((fieldArrayName, fieldArrayIndex) => {
          return (
            fieldArrayItem.fields &&
            fieldArrayItem.fields.map((item, index) =>
              renderFields(
                values,
                item,
                index,
                {
                  fieldArrayName: fieldArrayName,
                  fieldArrayIndex: fieldArrayIndex,
                },
                funcObject
              )
            )
          );
        })
      }
    </FieldArray>
  );
};

const renderButtons = (values, buttonItem, buttonIndex) => {
  return (
    <Col
      className="text-center"
      md={buttonItem.col ? buttonItem?.col : "12"}
      key={`button_${buttonIndex}`}
    >
      <Button
        variant={buttonItem.variant ? buttonItem?.variant : "primary"}
        type={buttonItem?.type}
        className={buttonItem.className && buttonItem?.className}
        active={buttonItem.activeCondition && buttonItem.activeCondition}
        size={buttonItem.size && buttonItem.size}
        onClick={buttonItem.onClick && buttonItem.onClick}
        disabled={buttonItem.disabled && buttonItem.disabled}
      >
        {`${buttonItem?.body}`}
      </Button>
    </Col>
  );
};
const FormGenerator = (props) => {
  const { validate, onSubmit, fieldData, initialValues, css, rowCss } = props;
  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues ? initialValues : ""}
        mutators={{ ...arrayMutators }}
        render={({
          values,
          handleSubmit,
          form: {
            mutators: { push, pop, setValue },
          },
        }) => {
          return (
            <form onSubmit={handleSubmit} className={`${css && css}`}>
              <Row className={rowCss && rowCss}>
                {fieldData &&
                  fieldData.map((fieldItem, fieldIndex) => {
                    if (fieldItem.fieldType === FieldTypes.fields) {
                      return renderFields(values, fieldItem, fieldIndex);
                    } else if (fieldItem.fieldType === FieldTypes.fieldArray) {
                      return renderFieldArray(values, fieldItem, fieldIndex, {
                        push: push,
                        pop: pop,
                      });
                    }
                  })}
              </Row>
              <Row>
                {fieldData &&
                  fieldData
                    .find((item) => item.fieldType === FieldTypes.actions)
                    ?.buttons.map((buttonItem, buttonIndex) =>
                      renderButtons(values, buttonItem, buttonIndex)
                    )}
              </Row>
            </form>
          );
        }}
      />
    </>
  );
};

export default FormGenerator;
