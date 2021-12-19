// Dependencies
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";

// Apis
import { ProductApi } from "../../../apis";

// Initial value
const initialValues = {
    productName: "",
    cost: 0,
    amountAvailable: 0
};

// Create new product schema
const newProductSchema = Yup.object().shape({
    productName: Yup.string()
        .required("Please enter product name"),
    cost: Yup.number()
        .required("Please enter price"),
    amountAvailable: Yup.number()
        .required("Please enter available amount"),
});

// Create new product page
const NewProduct = () => {
    return (
        <div className="row d-flex justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-11">
                <div className="block">
                    <div className="block-title">
                        <h2><i className="fa fa-plus" /> <strong>New</strong> Product</h2>
                    </div>
                    <Formik
                        initialValues={ initialValues }
                        validationSchema={ newProductSchema }
                        onSubmit={({ productName, cost, amountAvailable }, { setSubmitting, setFieldError }) => {
                            // Convert type from string to number
                            cost = +cost;
                            amountAvailable = +amountAvailable;

                            ProductApi.create({ productName, cost, amountAvailable })
                                .then(res => {
                                    console.log(res);
                                    setSubmitting(false);
                                })
                                .catch(err => {
                                    console.log(err);

                                    if (err.errorType === "unique_violation") {
                                        setFieldError("productName", "Product already exist!");
                                    }

                                    setSubmitting(false);
                                });
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleSubmit,
                              setFieldValue,
                              resetForm,
                              isSubmitting
                          }) => (
                            <form onSubmit={ handleSubmit } className="form-horizontal form-bordered">
                                <div className={`form-group ${ touched.productName && errors.productName ? "has-error" : null }`}>
                                    <label className="col-md-3 control-label" htmlFor="product-name">Name</label>
                                    <div className="col-md-9">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="gi gi-font" /></div>
                                            <input type="text" name="product-name" className="form-control" placeholder="Enter product name.." value={ values.productName } onChange={e => setFieldValue("productName", e.currentTarget.value)} />
                                        </div>
                                        {
                                            touched.productName && errors.productName &&
                                            <div className="help-block animation-slideDown">
                                                { errors.productName }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={`form-group ${ touched.cost && errors.cost ? "has-error" : null }`}>
                                    <label className="col-md-3 control-label" htmlFor="product-price">Price</label>
                                    <div className="col-md-9">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-usd" /></div>
                                            <input type="number" name="cost" className="form-control" placeholder="0,00" min={ 0 } value={ values.cost } onChange={e => setFieldValue("cost", e.currentTarget.value)} />
                                        </div>
                                        {
                                            touched.cost && errors.cost &&
                                            <div className="help-block animation-slideDown">
                                                { errors.cost }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={`form-group ${ touched.amountAvailable && errors.amountAvailable ? "has-error" : null }`}>
                                    <label className="col-md-3 control-label" htmlFor="product-price">Amount</label>
                                    <div className="col-md-9">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="gi gi-cargo" /></div>
                                            <input type="number" name="amountAvailable" className="form-control" placeholder="0" min={ 0 } value={ values.amountAvailable } onChange={e => setFieldValue("amountAvailable", e.currentTarget.value)} />
                                        </div>
                                        {
                                            touched.amountAvailable && errors.amountAvailable &&
                                            <div className="help-block animation-slideDown">
                                                { errors.amountAvailable }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group form-actions">
                                    <div className="col-md-9 col-md-offset-3">
                                        <button type="submit" className="btn btn-sm btn-primary mr-2"><i className={`fa ${ isSubmitting ? "fa-spinner fa-spin" : "fa-floppy-o" }`} /> Save</button>
                                        <button type="reset" className="btn btn-sm btn-warning" onClick={() => resetForm()}><i className="fa fa-repeat" /> Reset</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

// Export new product page
export default NewProduct;