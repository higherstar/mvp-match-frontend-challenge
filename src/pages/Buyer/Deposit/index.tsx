// Dependencies
import React from "react";

// Create deposit page
const Deposit = () => {
    return (
        <>
            <section className="site-section site-section-light site-section-top themed-background-dark">
                <div className="container text-center">
                    <h1 className="animation-slideDown"><strong>Deposit</strong></h1>
                </div>
            </section>
            <section className="site-content site-section">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xs-12 col-sm-10 col-md-8">
                            <div className="input-group push">
                                <input type="number" id="example-input2-group2" name="example-input2-group2" className="form-control" placeholder="Please enter deposit..." />
                                <span className="input-group-btn">
                                    <button type="button" className="btn btn-primary">Deposit</button>
                                </span>
                            </div>
                            <button type="reset" className="btn btn-block btn-warning"><i className="fa fa-repeat" /> Reset</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Export deposit page
export default Deposit;
