import { USER } from "../models/user.js";

const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
const isPhoneUA = (phone) => /^\+380\d{9}$/.test(phone);
const isPasswordValid = (password) =>
  typeof password === "string" && password.length >= 4;

const allowedFields = Object.keys(USER).filter((key) => key !== "id");

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  const data = req.body;

  if ("id" in data) {
    res.err = new Error("Field 'id' should not be provided");
    return next();
  }

  const extraFields = Object.keys(data).filter(
    (key) => !allowedFields.includes(key)
  );
  if (extraFields.length) {
    res.err = new Error(`Unexpected field(s): ${extraFields.join(", ")}`);
    return next();
  }

  for (const field of allowedFields) {
    if (!data[field]) {
      res.err = new Error(`Field '${field}' is required`);
      return next();
    }
  }

  if (!isValidEmail(data.email)) {
    res.err = new Error("Email must be a valid email address");
    return next();
  }

  if (!isPhoneUA(data.phone)) {
    res.err = new Error("Phone must match pattern +380xxxxxxxxx");
    return next();
  }

  if (!isPasswordValid(data.password)) {
    res.err = new Error("Password must be at least 4 characters long");
    return next();
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const data = req.body;

  if ("id" in data) {
    res.err = new Error("Field 'id' cannot be updated");
    return next();
  }

  const keys = Object.keys(data);
  if (!keys.length) {
    res.err = new Error("At least one field must be provided for update");
    return next();
  }

  const invalidFields = keys.filter((key) => !allowedFields.includes(key));
  if (invalidFields.length) {
    res.err = new Error(`Unexpected field(s): ${invalidFields.join(", ")}`);
    return next();
  }

  if (data.email && !isValidEmail(data.email)) {
    res.err = new Error("Email must be a valid gmail address");
    return next();
  }

  if (data.phone && !isPhoneUA(data.phone)) {
    res.err = new Error("Phone must match pattern +380xxxxxxxxx");
    return next();
  }

  if (data.password && !isPasswordValid(data.password)) {
    res.err = new Error("Password must be at least 4 characters long");
    return next();
  }

  next();
};

export { createUserValid, updateUserValid };
