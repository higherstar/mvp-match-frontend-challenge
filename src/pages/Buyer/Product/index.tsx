// Dependencies
import React from "react";
import {Link} from "react-router-dom";

// Create product page
const Product = () => {
    return (
        <>
            <section className="site-section site-section-light site-section-top themed-background-dark">
                <div className="container text-center">
                    <h1 className="animation-slideDown"><strong>Product</strong></h1>
                </div>
            </section>
            <section className="site-content site-section">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xs-12 col-sm-10 col-md-8">
                            <aside className="sidebar site-block">
                                <div className="sidebar-block">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-xs-8 push-bit">
                                            <span className="h3">$ 750<br /><small><em>3 Items</em></small></span>
                                        </div>
                                        <div className="col-xs-4">
                                            <Link to="/shopping-cart" className="btn btn-sm btn-block btn-success">VIEW CART</Link>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <div className="clearfix">
                                <div className="pull-right">
                                    <span className="h2"><strong>$ 69</strong></span>
                                </div>
                                <span className="h4"><strong className="text-success">IN STOCK</strong><br /><small>15 Available</small></span>
                            </div>
                            <hr />
                            <p>Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam quis ligula elit.
                                Aliquam at orci ac neque semper dictum. Sed tincidunt scelerisque ligula, et
                                facilisis nulla hendrerit non. Suspendisse potenti. Pellentesque non accumsan
                                orci.</p>
                            <p>Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam quis ligula elit.
                                Aliquam at orci ac neque semper dictum. Sed tincidunt scelerisque ligula, et
                                facilisis nulla hendrerit non. Suspendisse potenti. Pellentesque non accumsan
                                orci.</p>
                            <hr />
                            <div className="text-right">
                                <button type="submit" className="btn btn-block btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Export product page
export default Product;
