import React from "react";
import { Link } from "react-router-dom";

// local imports
import HIHLogo from "@src/assets/images/logo/hih_Logo.png";
import "../../style/views/Login/authentication.scss";

export default function AuthHeader(props) {
  const { title, subTitle } = props;
  return (
    <>
      <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
        <img src={HIHLogo} width="90px" height="30px" alt="HIH Logo" />
      </Link>
      <h4 className="container__welcome-title">{title}</h4>
      <p className="container__welcome-description">{subTitle}</p>
    </>
  );
}
