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

// Actions
import { setUser } from "../../../store/actions";

// Interfaces
import { IUser } from "../../../interfaces";

// Initial values
const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
};

// Create sign up page
const SignUp = () => {
    // Get dispatch from hook
    const dispatch = useDispatch();

    // Get history from hook
    const history = useHistory();

    // Sign up schema
    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .email("Wrong email format")
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Please enter email"),
        password: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Please enter password"),
        confirmPassword: Yup.string()
            .required("Please confirm password")
            .when("password", {
                is: (val) => (val && val.length > 0),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Password and confirm password didn't match"
                ),
            }),
        role: Yup.mixed()
            .oneOf(["seller", "buyer"] as const)
            .required("Please select role"),
    });

    // Return sign up page
    return (
        <div className="login-container animation-fadeIn">
            <div className="login-title text-center">
                <h1>
                    <strong>Sign Up</strong>
                </h1>
            </div>
            <div className="block push-bit">
                <Formik
                    initialValues={ initialValues }
                    validationSchema={ SignUpSchema }
                    onSubmit={({ email, password, role  }: any, { setSubmitting, setErrors, setFieldError }) => {
                        AuthApi.register({ email, password, role })
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

                                if (err.errorType === "unique_violation") {
                                    setFieldError("email", "User already exist!");
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
                          handleChange,
                          setFieldValue,
                          isSubmitting,
                      }) => (
                        <form onSubmit={ handleSubmit } className="form-horizontal form-bordered">
                            <div className={`form-group ${ touched.email && errors.email ? "has-error" : null }`}>
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="gi gi-envelope" />
                                        </span>
                                        <input type="text" name="email" className="form-control input-lg" placeholder="Email" value={ values.email } onInput={e => setFieldValue("email", e.currentTarget.value)} />
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
                                            <i className="gi gi-asterisk" />
                                        </span>
                                        <input type="password" name="password" className="form-control input-lg" placeholder="Password" value={ values.password } onInput={e => setFieldValue("password", e.currentTarget.value)} />
                                    </div>
                                    {
                                        touched.password && errors.password &&
                                        <div className="help-block animation-slideDown">
                                            { errors.password }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={`form-group ${ touched.confirmPassword && errors.confirmPassword ? "has-error" : null }`}>
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="gi gi-asterisk" />
                                        </span>
                                        <input type="password" name="confirmPassword" className="form-control input-lg" placeholder="Verify Password" value={ values.confirmPassword } onInput={e => setFieldValue("confirmPassword", e.currentTarget.value)} />
                                    </div>
                                    {
                                        touched.confirmPassword && errors.confirmPassword &&
                                        <div className="help-block animation-slideDown">
                                            { errors.confirmPassword }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={`form-group ${ touched.role && errors.role ? "has-error" : null }`}>
                                <div className="col-xs-12">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="gi gi-user" />
                                        </span>
                                        <select name="role" className="form-control input-lg" value={ values.role } onChange={ handleChange }>
                                            <option value="" disabled>Please select</option>
                                            <option value="seller">Seller</option>
                                            <option value="buyer">Buyer</option>
                                        </select>
                                    </div>
                                    {
                                        touched.role && errors.role &&
                                        <div className="help-block animation-slideDown">
                                            { errors.role }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="form-group form-actions">
                                <div className="col-xs-12">
                                    <button type="submit" className="btn btn-block btn-lg btn-success" disabled={ isSubmitting }>
                                        <i className={`fa mr-3 ${ isSubmitting ? "fa-spinner fa-spin" : "fa-plus"}`} />
                                        Register Account
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12 text-center">
                                    Do you have an account? <Link to="/auth/sign-in">Login</Link>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

// Export sign up page
export default SignUp;
