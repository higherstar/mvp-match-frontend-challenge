// Dependencies
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// Apis
import { AuthApi } from "../../apis";
import {shallowEqual, useSelector} from "react-redux";
import {IState} from "../../interfaces";

// Interfaces
interface ISettingsModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

// Create profile validation schema
const profileSchema = Yup.object().shape({
    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Please enter email"),
    password: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Please enter new password"),
    confirmPassword: Yup.string()
        .required("Please confirm new password")
        .when("password", {
            is: (val) => (val && val.length > 0),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "New password and confirm new password didn't match"
            ),
        }),
});

// Create settings component
const SettingsModal = ({ open, setOpen }: ISettingsModalProps) => {
    // Get user from store
    const user = useSelector((state: IState) => state.user, shallowEqual);

    // Formik initial values
    const initialValues = {
        email: user.email,
        password: "",
        confirmPassword: ""
    };

    // Return setting component
    return (
        <>
            {
                open &&
                <div className="modal fade in d-block">
                  <div className="modal-backdrop fade in" onClick={() => setOpen(false)} />
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header text-center">
                        <h2 className="modal-title"><i className="fa fa-pencil mr-3" /> Settings</h2>
                      </div>

                      <div className="modal-body">
                        <Formik
                          initialValues={ initialValues }
                          validationSchema={ profileSchema }
                          onSubmit={({ email, password }, { setSubmitting, setErrors }) => {
                              AuthApi.updateProfile({ email, password })
                                  .then((res) => {
                                      setSubmitting(false);
                                      console.log(res.message);
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
                            {
                                ({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue}) => (
                                    <form onSubmit={ handleSubmit } className="form-horizontal form-bordered">
                                        <fieldset>
                                            <legend>Vital Info</legend>
                                            <div className={`form-group ${ touched.email && errors.email ? "has-error" : null }`}>
                                                <label className="col-md-4 control-label" htmlFor="email">Email</label>
                                                <div className="col-md-8">
                                                    <input type="email" id="email" name="email" className="form-control" placeholder="Please enter email..." value={ values.email } onInput={e => setFieldValue("email", e.currentTarget.value)} />
                                                    {
                                                        touched.email && errors.email &&
                                                        <div className="help-block animation-slideDown">
                                                            { errors.email }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend>Password Update</legend>
                                            <div className={`form-group ${ touched.password && errors.password ? "has-error" : null }`}>
                                                <label className="col-md-4 control-label" htmlFor="password">New Password</label>
                                                <div className="col-md-8">
                                                    <input type="password" id="password" name="password" className="form-control" placeholder="Please choose a complex one.." value={ values.password } onInput={e => setFieldValue("password", e.currentTarget.value)} />
                                                    {
                                                        touched.password && errors.password &&
                                                        <div className="help-block animation-slideDown">
                                                            { errors.password }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className={`form-group ${ touched.confirmPassword && errors.confirmPassword ? "has-error" : null }`}>
                                                <label className="col-md-4 control-label" htmlFor="confirmPassword">Confirm New Password</label>
                                                <div className="col-md-8">
                                                    <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="..and confirm it!" value={ values.confirmPassword } onInput={e => setFieldValue("confirmPassword", e.currentTarget.value)} />
                                                    {
                                                        touched.confirmPassword && errors.confirmPassword &&
                                                        <div className="help-block animation-slideDown">
                                                            { errors.confirmPassword }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="form-group form-actions">
                                            <div className="col-xs-12 text-right">
                                                <button type="button" className="btn btn-sm btn-default mr-2" onClick={() => setOpen(false)}>Close</button>
                                                <button type="submit" className="btn btn-sm btn-primary">
                                                    { isSubmitting && <i className="fa fa-spinner fa-spin mr-2" />}
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )
                            }
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
            }
        </>
    );
};

// Export settings component
export default SettingsModal;
