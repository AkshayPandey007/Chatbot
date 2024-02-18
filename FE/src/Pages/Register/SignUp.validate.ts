import { TFunction } from "i18next";

import { FormikErrors } from "formik";
import { ValidField, validationResult } from "../../Constraints/Shared.Validation";
import { SignUpValues } from "./Signup";


export function validateSignUp(
  values: SignUpValues,
  t: TFunction
): FormikErrors<SignUpValues> {
  return validationResult({
    username: validateUsername(values, t),
    email:validateEmail(values,t),
    password: validatePassword(values, t),
  });
}

const validateUsername = (values: SignUpValues, t: TFunction) => {
  if (!values.username) {
    return t("{{field}} is a required field", {
      field: "Username",
    });
  }
  return ValidField;
};

const validateEmail = (values: SignUpValues, t: TFunction) => {
    if (!values.email) {
      return t("{{field}} is a required field", {
        field: "Email",
      });
    } else if (!isValidEmail(values.email)) {
      return t("Invalid email format");
    }
    return ValidField;
  };
  

  const validatePassword = (values: SignUpValues, t: TFunction) => {
    if (!values.password) {
      return t("{{field}} is a required field", {
        field: "Password",
      });
    } else if (!isValidPassword(values.password)) {
      return t("Password must be at least 8 characters long, contain at least one uppercase letter, and one symbol");
    }
    return ValidField;
  };


const isValidEmail = (email: string): boolean => {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPassword = (password: string): boolean => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
