// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Constants
const products = [
    {
        id: 1,
        productName: "Super Laptop 11",
        amount: 1,
        cost: 799,
    },
    {
        id: 2,
        productName: "White Headset",
        amount: 2,
        cost: 59,
    },
    {
        id: 3,
        productName: "Bluetooth",
        amount: 1,
        cost: 23,
    }
];

// Create shopping cart page
const ShoppingCart = () => {
    return (
        <>
            <section className="site-section site-section-light site-section-top themed-background-dark">
                <div className="container text-center">
                    <h1 className="animation-slideDown"><i className="fa fa-shopping-cart" /> <strong>Shopping Cart</strong></h1>
                </div>
            </section>
            <section className="site-content site-section">
                <div className="container">
                    <div className="table-responsive">
                        <table className="table table-bordered table-vcenter">
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th className="text-center">QTY</th>
                                <th className="text-right">Unit Price</th>
                                <th className="text-right">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.map(({id, productName, amount, cost}) => (
                                    <tr key={ id }>
                                        <td>
                                            <strong className="text-success">{ productName }</strong>
                                        </td>
                                        <td className="text-center">
                                            <strong>1</strong>
                                            <button className="btn btn-xs btn-success" data-toggle="tooltip"
                                                    title="Add"><i className="fa fa-plus" /></button>
                                            <button className="btn btn-xs btn-danger" data-toggle="tooltip"
                                                    title="Remove"><i className="fa fa-minus" /></button>
                                        </td>
                                        <td className="text-right">$ { cost }</td>
                                        <td className="text-right"><strong>$ { cost * amount }</strong></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-xs-7 col-md-3">
                            <Link to="/products" className="btn btn-block btn-primary">Continue Shopping</Link>
                        </div>
                        <div className="col-xs-5 col-md-3 col-md-offset-6">
                            <button className="btn btn-block btn-danger">Purchase</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Export shopping cart page
export default ShoppingCart;