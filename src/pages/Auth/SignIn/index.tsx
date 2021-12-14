// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Create sign in page
const SignIn = () => {
    return (
        <div className="login-container animation-fadeIn">
            <div className="login-title text-center">
                <h1>
                    <strong>Sign In</strong>
                </h1>
            </div>
            <div className="block push-bit">
                <form className="form-horizontal form-bordered form-control-borderless">
                    <div className="form-group">
                        <div className="col-xs-12">
                            <div className="input-group">
                        <span className="input-group-addon">
                            <i className="gi gi-envelope"/>
                        </span>
                                <input type="text" name="login-email" className="form-control input-lg" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="gi gi-asterisk"/>
                                </span>
                                <input type="password" name="login-password" className="form-control input-lg" placeholder="Password" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group form-actions">
                        <div className="col-xs-4">
                            <label className="switch switch-primary" data-toggle="tooltip" title="Remember Me?">
                                <input type="checkbox" name="login-remember-me" />
                                <span />
                            </label>
                        </div>
                        <div className="col-xs-8 text-right">
                            <button type="submit" className="btn btn-sm btn-primary">
                                <i className="fa fa-angle-right" /> Login to Dashboard
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12 text-center">
                            <Link to="/auth/sign-up">
                                <small>Create a new account</small>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Export sign in page
export default SignIn;
