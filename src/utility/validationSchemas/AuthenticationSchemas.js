import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .required("Required")
      .min(8, "should be 8 chars minimum")
    // .min(3, "Password is too short - should be 3 chars minimum."),
  // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export const SignupValidationSchema = Yup.object({
  username: Yup.string()
    // .min(4, "Minimum 4 Characters are required")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "should be 8 chars minimum")
    // .min(3, "Password is too short - should be 3 chars minimum.")
    // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});
