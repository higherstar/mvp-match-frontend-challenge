// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Interfaces
import { IState } from "../../../interfaces";

// Actions
import { addCart } from "../../../store/actions";

// Apis
import { BusinessApi } from "../../../apis";

// Create shopping cart page
const ShoppingCart = () => {
    // Get product in cart from store
    const products = useSelector((state: IState) => state.cart);

    // Get dispatch from hook
    const dispatch = useDispatch();

    // Plus handler
    const handlePlus = (productId, index: number) => {
        const currentProduct = products.filter(p => p.id === productId)[0];

        if (currentProduct.amountAvailable > currentProduct.quantity) {
            currentProduct.quantity = currentProduct.quantity + 1;

            products[index] = currentProduct;
            dispatch(addCart([...products]));
        }
    };

    // Minus handler
    const handleMinus = (productId, index: number) => {
        const currentProduct = products.filter(p => p.id === productId)[0];

        if (currentProduct.quantity > 1) {
            currentProduct.quantity = currentProduct.quantity - 1;

            products[index] = currentProduct;
            dispatch(addCart([...products]));
        }
    };

    // Purchase handler
    const handlePurchase = () => {
        console.log(products);
        BusinessApi.purchase(products)
            .then(res => {
                console.log(res);
                dispatch(addCart([]));
            })
            .catch(err => console.log(err));
    };

    // Return shopping cart page
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
                                products.length > 0
                                    ? products.map(({id, productName, cost, quantity}, index) => (
                                        <tr key={ id }>
                                            <td>
                                                <strong className="text-success">{ productName }</strong>
                                            </td>
                                            <td className="text-center">
                                                <strong>{ quantity }</strong>
                                                <button className="btn btn-xs btn-success" onClick={() => handlePlus(id, index) }><i className="fa fa-plus" /></button>
                                                <button className="btn btn-xs btn-danger" onClick={() => handleMinus(id, index) }><i className="fa fa-minus" /></button>
                                            </td>
                                            <td className="text-right">$ { cost }</td>
                                            <td className="text-right"><strong>$ { cost * quantity }</strong></td>
                                        </tr>
                                    ))
                                    : (
                                        <tr>
                                            <td colSpan={ 4 }>
                                                <h5 className="text-center"><strong>There is no product in the cart. Please add product to the cart</strong></h5>
                                            </td>
                                        </tr>
                                    )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-xs-7 col-md-3">
                            <Link to="/products" className="btn btn-block btn-primary">Continue Shopping</Link>
                        </div>
                        <div className="col-xs-5 col-md-3 col-md-offset-6">
                            <button className="btn btn-block btn-danger" disabled={ products.length <= 0 } onClick={ handlePurchase }>Purchase</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Export shopping cart page
export default ShoppingCart;