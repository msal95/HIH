// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Hooks
import useJwt from "@src/auth/jwt/useJwt";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub, Coffee, X } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  Row,
  Toast,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import InputField from "../../../components/InputField/InputField";
import "../../../style/views/Login/authentication.scss";
import { Formik } from "formik";
import { LoginValidationSchema } from "../../../utility/validationSchemas/AuthenticationSchemas";
import ErrorMessage, {
  getHomeRouteForLoggedInUser,
} from "../../../utility/Utils";
import AuthHeader from "../../../components/AuthHeader/AuthHeader";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import Avatar from "../../components/avatar";
// ** Actions
import { handleLogin } from "@store/authentication";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";
import { toast } from "react-hot-toast";
import { AuthLogin } from "../../../../api/ApiMethods/AuthApiEndPoint";
import InputPasswordToggle from "@components/input-password-toggle";

const ToastContent = ({ t, name, role }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6>{name}</h6>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <span>
          You have successfully logged in as an {role} user to Vuexy. Now you
          can start to explore. Enjoy!
        </span>
      </div>
    </div>
  );
};

const defaultValues = {
  password: "admin",
  loginEmail: "admin@demo.com",
  role: "user",
};

const LoginBasic = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);

  //   const onSubmit = data => {
  //     if (Object.values(data).every(field => field.length > 0)) {
  //       useJwt
  //         .login({ email: data.loginEmail, password: data.password })
  //         .then(res => {
  //           const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
  //           console.log('✅ data    ', data)

  //           dispatch(handleLogin(data))
  //           ability.update(res.data.userData.ability)
  //           navigate(getHomeRouteForLoggedInUser(data.role))
  //           toast(t => (
  //             <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
  //           ))
  //         })
  //         .catch(err => setError('loginEmail', {
  //             type: 'manual',
  //             message: err.response.data.error
  //           })
  //         )
  //     } else {
  //       for (const key in data) {
  //         if (data[key].length === 0) {
  //           setError(key, {
  //             type: 'manual'
  //           })
  //         }
  //       }
  //     }
  //   }

  const onSubmit = (data) => {
    try {
      AuthLogin(data).then((res) => {
        const message = res?.message;
        const validationErrors = res?.validation_errors;
        const response = res?.response;
        if (response === 200) {
          toast.success(message);
          const data = {
            ...res?.data?.userData,
            accessToken: res?.data?.accessToken,
            refreshToken: res?.data?.refreshToken,
          };
          dispatch(handleLogin(data));
          ability.update(res?.data?.userData?.ability);
          navigate(getHomeRouteForLoggedInUser(data?.role));
        } else {
          Object.keys(validationErrors).forEach((key) => {
            toast.error(validationErrors[key]);
          });
        }
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:169 ~ handleCreateProject ~ error:",
        error
      );
    }
  };

  return (
    <div className="auth-wrapper auth-basic px-2 container">
      <div className="auth-inner my-2 container__inner-container">
        <Card className="mb-0">
          <CardBody>
            <AuthHeader
              title="Welcome to HIH"
              subTitle="Please sign-in to your account and start the adventure"
            />
            <Formik
              initialValues={defaultValues}
              validationSchema={LoginValidationSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                getFieldProps,
                // isSubmitting,
                /* and other goodies */
              }) => (
                <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                  <InputField
                    label="Email *"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    autoFocus
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
                    placeholder="⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉"
                    className="input-group-merge"
                    errorType={errors.password && touched.password}
                    errorMessage={errors.password}
                  /> */}

                  <InputPasswordToggle
                    className="mb-2"
                    label="Password *"
                    htmlFor="basic-default-password"
                    // onChange={handleChange}
                    {...getFieldProps("password")}
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage message={errors.password} />
                  )}
                  <div className="d-flex justify-content-between">
                    <div className="form-check mb-1">
                      <Input type="checkbox" id="remember-me" />
                      <Label
                        className="container__form-check-label"
                        for="remember-me"
                      >
                        Remember Me
                      </Label>
                    </div>
                    <Link to="/pages/forgot-password-basic">
                      <small>Forgot Password?</small>
                    </Link>
                  </div>
                  <Button color="primary" block>
                    Sign in
                  </Button>
                </Form>
              )}
            </Formik>
            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/pages/register-basic">
                <span>Create an account</span>
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

export default LoginBasic;
