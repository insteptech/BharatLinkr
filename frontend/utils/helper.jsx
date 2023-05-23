export const FieldTypes = {
  fields: "fields",
  fieldArray: "fieldArray",
  actions: "actions",
};

export const inputFieldTypes = {
  reactselect: "reactselect",
  textarea: "textarea",
  text: "text",
  date: "date",
  file: "file",
  password: "password",
  email: "email",
  number: "number",
  year: "year",
  radio: "radio",
  checkbox: "checkbox",
};

export const buttonTypes = {
  submit: "submit",
  reset: "reset",
  push: "push",
  pop: "pop",
  remove: "remove",
};

export const refined = (title) =>
  title?.toLowerCase()?.replace(/[/\s?]+/g, "-");
