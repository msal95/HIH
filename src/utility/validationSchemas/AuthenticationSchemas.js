import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(3, "Password is too short - should be 3 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export const SignupValidationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Minimum 4 Characters are required")
    .required("UserName is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(3, "Password is too short - should be 3 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});
