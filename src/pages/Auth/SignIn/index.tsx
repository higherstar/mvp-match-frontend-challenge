// Dependencies
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// Apis
import { AuthApi } from "../../../apis";

// Services
import { Storage } from "../../../services";

// Interfaces
import { IUser } from "../../../interfaces";

// Actions
import { setUser } from "../../../store/actions";

// Initial values
const initialValues = {
    email: "",
    password: "",
};

// Create sign in page
const SignIn = () => {
    // Get history from hook
    const history = useHistory();

    // Get dispatch from hook
    const dispatch = useDispatch();

    // Create login schema
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Wrong email format")
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Please enter email"),
        password: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Please enter password"),
    });

    // Return sign in page
    return (
        <div className="login-container animation-fadeIn">
            <div className="login-title text-center">
                <h1>
                    <strong>Sign In</strong>
                </h1>
            </div>
            <div className="block push-bit">
                <Formik
                    initialValues={ initialValues }
                    validationSchema={ LoginSchema }
                    onSubmit={({ email, password }, { setSubmitting, setErrors }) => {
                        AuthApi.login({ email, password })
                            .then(res => {
                                // Save token to local storage
                                Storage.setItem(process.env.ACCESS_TOKEN_KEY || "access_token", res.data.accessToken);

                                // Get user from res
                                const user = res.data.user as Pick<IUser, "role" | "deposit" | "email">;

                                // Dispatch set user action
                                dispatch(setUser({
                                    ...user,
                                    token: true
                                }));

                                // Move to dashboard according to role
                                history.push("/");
                            })
                            .catch(err => {
                                setSubmitting(false);

                                if (err.errors) {
                                    setErrors(err.errors);
                                }

                                console.log(err);
                            });
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleSubmit,
                          setFieldValue,
                          isSubmitting
                      }) => (
                        <form onSubmit={ handleSubmit } className="form-horizontal form-bordered">
                            <div className={`form-group ${ touched.email && errors.email ? "has-error" : null }`}>
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="gi gi-envelope"/>
                                        </span>
                                        <input type="text" name="email" className="form-control input-lg" placeholder="Email" value={ values.email } onChange={e => setFieldValue("email", e.currentTarget.value)} />
                                    </div>
                                    {
                                        touched.email && errors.email &&
                                        <div className="help-block animation-slideDown">
                                            { errors.email }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={`form-group ${ touched.password && errors.password ? "has-error" : null }`}>
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="gi gi-asterisk"/>
                                        </span>
                                        <input type="password" name="password" className="form-control input-lg" placeholder="Password" value={ values.password } onChange={e => setFieldValue("password", e.currentTarget.value)} />
                                    </div>
                                    {
                                        touched.password && errors.password &&
                                        <div className="help-block animation-slideDown">
                                            { errors.password }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="form-group form-actions">
                                <div className="col-xs-12">
                                    <button type="submit" className="btn btn-block btn-lg btn-primary" disabled={ isSubmitting }>
                                        <i className={`fa mr-3 ${ isSubmitting ? "fa-spinner fa-spin" : "fa-angle-right"}`} />
                                        Login
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 text-center">
                                    <Link to="/auth/sign-up">
                                        Create a new account
                                    </Link>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

// Export sign in page
export default SignIn;
