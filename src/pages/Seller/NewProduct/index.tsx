// Dependencies
import React from "react";

// Create new product page
const NewProduct = () => {
    return (
        <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
                <div className="block">
                    <div className="block-title">
                        <h2><i className="fa fa-plus" /> <strong>New</strong> Product</h2>
                    </div>

                    <form action="page_ecom_product_edit.html" method="post" className="form-horizontal form-bordered">
                        <div className="form-group">
                            <label className="col-md-3 control-label" htmlFor="product-name">Name</label>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-addon"><i className="gi gi-cargo" /></div>
                                    <input type="text" id="product-name" name="product-name" className="form-control"
                                           placeholder="Enter product name.." />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label" htmlFor="product-price">Price</label>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-addon"><i className="fa fa-usd" /></div>
                                    <input type="number" id="product-price" name="product-price" className="form-control" placeholder="0,00" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-3 control-label" htmlFor="product-price">Amount</label>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-addon"><i className="gi gi-font" /></div>
                                    <input type="number" id="product-price" name="product-price" className="form-control" placeholder="0" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group form-actions">
                            <div className="col-md-9 col-md-offset-3">
                                <button type="submit" className="btn btn-sm btn-primary"><i className="fa fa-floppy-o" /> Save</button>
                                <button type="reset" className="btn btn-sm btn-warning"><i className="fa fa-repeat" /> Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Export new product page
export default NewProduct;