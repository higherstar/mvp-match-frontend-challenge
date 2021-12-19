// Dependencies
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Interfaces
import { IProductInCart, IState } from "../../../interfaces";

// Apis
import { ProductApi } from "../../../apis";

// Actions
import { addCart } from "../../../store/actions";

// Create product page
const Product = () => {
    // States
    const [product, setProduct] = useState<IProductInCart>();

    // Get id from url
    const { id } = useParams<{ id: string }>();

    // Get cart from store
    const cart = useSelector((state: IState) => state.cart);

    // Get dispatch from hook
    const dispatch = useDispatch();

    // Cart handler
    const handleCart = () => {
        if (product && !(cart.filter(p => p.id === product.id).length > 0)) {
            dispatch(addCart([...cart, {...product, quantity: 1}]));
        }
    };

    useEffect(() => {
        ProductApi.read(+id)
            .then(res => {
                console.log(res);
                setProduct(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    // Return product page
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
                                    {
                                        cart.length > 0
                                            ? (
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-xs-8 push-bit">
                                                        <span className="h3">$ { cart.reduce((totalPrice, p) => totalPrice + p.quantity * p.cost, 0) }<br /><small><em>{ cart.length } Item{ cart.length > 1 ? "s" : null }</em></small></span>
                                                    </div>
                                                    <div className="col-xs-4">
                                                        <Link to="/shopping-cart" className="btn btn-sm btn-block btn-success">VIEW CART</Link>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <h3 className="text-center">There is no product in the cart.</h3>
                                            )
                                    }
                                </div>
                            </aside>
                            {
                                product
                                    ? (
                                        <>
                                            <div className="clearfix">
                                                <div className="pull-right">
                                                    <span className="h2"><strong>$ { product.cost }</strong></span>
                                                </div>
                                                <span className="h4"><strong className="text-success">IN STOCK</strong><br /><small>{ product.amountAvailable } Available</small></span>
                                            </div>
                                            <hr />
                                            <div className="text-right">
                                                <button type="submit" className="btn btn-block btn-primary" onClick={ handleCart }>Add to Cart</button>
                                            </div>
                                        </>
                                    )
                                    : (
                                        <h1 className="text-center"><i className="fa fa-spinner fa-spin" /></h1>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Export product page
export default Product;
