// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Create sign up page
const SignUp = () => {
    return (
        <div className="login-container animation-fadeIn">
            <div className="login-title text-center">
                <h1>
                    <strong>Sign Up</strong>
                </h1>
            </div>
            <div className="block push-bit">
                <form className="form-horizontal form-bordered form-control-borderless">
                    <div className="form-group">
                        <div className="col-xs-12">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="gi gi-envelope" />
                                </span>
                                <input type="text" name="register-email" className="form-control input-lg" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="gi gi-asterisk" />
                                </span>
                                <input type="password" name="register-password" className="form-control input-lg" placeholder="Password" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="gi gi-asterisk" />
                                </span>
                                <input type="password" name="register-password-verify" className="form-control input-lg" placeholder="Verify Password" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="gi gi-user" />
                                </span>
                                <input type="text" name="register-role" className="form-control input-lg" placeholder="Role" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group form-actions">
                        <div className="col-xs-6">
                            <label className="switch switch-primary" data-toggle="tooltip" title="Agree to the terms">
                                <input type="checkbox" name="register-terms" />
                                <span />
                            </label>
                        </div>
                        <div className="col-xs-6 text-right">
                            <button type="submit" className="btn btn-sm btn-success">
                                <i className="fa fa-plus" /> Register Account
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12 text-center">
                            <small>Do you have an account?</small> <Link to="/auth/sign-in"><small>Login</small></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Export sign up page
export default SignUp;
