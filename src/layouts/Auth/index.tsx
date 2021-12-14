// Dependencies
import React from "react";

// Images
import LoginBg from "../../assets/img/placeholders/backgrounds/login_full_bg.jpg";

// Styles
import "./style.scss";

// Create auth layout
const AuthLayout = ({ children }) => {
    return (
      <>
          <img src={ LoginBg } alt="Login Background" className="full-bg animation-pulseSlow" />
          { children }
      </>
    );
};

// Export auth layout
export default AuthLayout;
