// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

import { toast } from "react-hot-toast";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import AuthHeader from "../../../components/AuthHeader/AuthHeader";
import { Formik } from "formik";
import InputField from "../../../components/InputField/InputField";
import { SignupValidationSchema } from "../../../utility/validationSchemas/AuthenticationSchemas";
import ErrorMessage from "../../../utility/Utils";
import { AuthSignUp } from "../../../../api/ApiMethods/AuthApiEndPoint";

const RegisterBasic = () => {
  const navigate = useNavigate();
  const onHandleSubmit = (values) => {
    console.log(
      "🚀 ~ file: RegisterBasic.js:33 ~ onHandleSubmit ~ values:",
      values
    );
    // event.preventDefault();
    // navigate(
    //   "/pages/two-steps-basic"
    //   // {
    //   //   meta: {
    //   //     publicRoute: true,
    //   //     restricted: true,
    //   //   },
    //   // }
    // );

    try {
        AuthSignUp(values).then((res) => {
          const message = res?.message;
          const validationErrors = res?.validation_errors;
          const response = res?.response;
          if (response === 200) {
              toast.success(message);
              navigate("/login");
          } else {
            console.log('✅ element    ', message,
            validationErrors,
            response);
            Object.keys(validationErrors).forEach(key => {
              toast.error(validationErrors[key]);
            });
          }
        });
      } catch (error) {
        console.log("🚀 ~ file: index.js:169 ~ handleCreateProject ~ error:", error);
      }
    // AuthSignUp(values)
  };
  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <AuthHeader
              title="Welcome to HIH"
              subTitle="Please Create an account"
            />

            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              // validationSchema={SignupValidationSchema}
              onSubmit={onHandleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                // isSubmitting,
                /* and other goodies */
              }) => (
                <Form
                  className="auth-register-form mt-2"
                  onSubmit={handleSubmit}
                >
                  <InputField
                    label="Username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    autoFocus
                    placeholder="Enter User Name"
                    errorType={errors.username && touched.username}
                    errorMessage={errors.username}
                  />

                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="email@email.com"
                    errorType={errors.email && touched.email}
                    errorMessage={errors.email}
                  />

                  {/* <InputField
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    autoFocus
                    placeholder="⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉"
                    className="input-group-merge"
                    errorType={errors.password && touched.password}
                    errorMessage={errors.password}
                  /> */}
                  <InputPasswordToggle className='mb-2' name="password" label='Password' htmlFor='basic-default-password'
                    onChange={handleChange}
                  />
                  <div className="form-check mb-1">
                    <Input type="checkbox" id="terms" />
                    <Label className="form-check-label" for="terms">
                      I agree to
                      <a
                        className="ms-25"
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        privacy policy & terms
                      </a>
                    </Label>
                  </div>
                  <Button color="primary" block onClick={handleSubmit}>
                    Sign up
                  </Button>
                </Form>
              )}
            </Formik>

            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/pages/login-basic">
                <span>Sign in instead</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RegisterBasic;
