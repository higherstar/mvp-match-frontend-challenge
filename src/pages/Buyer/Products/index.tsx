// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Constants
const products = [
    {
        id: 1,
        productName: "Sunglasses",
        cost: 109,
    },
    {
        id: 2,
        productName: "Gloves",
        cost: 59,
    },
    {
        id: 3,
        productName: "Jacket",
        cost: 99,
    },
    {
        id: 4,
        productName: "Headset",
        cost: 79,
    },
    {
        id: 5,
        productName: "Laptop",
        cost: 1599,
    },
    {
        id: 6,
        productName: "Sunglasses",
        cost: 149
    },
    {
        id: 7,
        productName: "Laptop",
        cost: 1293
    },
    {
        id: 8,
        productName: "Gloves",
        cost: 59,
    },
    {
        id: 9,
        productName: "Jacket",
        cost: 99,
    },
    {
        id: 10,
        productName: "Headset",
        cost: 79,
    },
    {
        id: 11,
        productName: "Laptop",
        cost: 1599,
    },
];

// Create products page
const Products = () => {
    return (
        <>
            <section className="site-section site-section-light site-section-top themed-background-dark">
                <div className="container text-center">
                    <h1 className="animation-slideDown"><strong>Explore over 5.000 products!</strong></h1>
                </div>
            </section>
            <section className="site-content site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-3">
                            <div className="form-group push">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="input-group">
                                            <input type="text" id="ecom-search" name="ecom-search" className="form-control" placeholder="Search Store.." value="" />
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn btn-primary"><i className="fa fa-search" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <aside className="sidebar site-block">
                                <div className="sidebar-block">
                                    <div className="row d-flex align-items-center">
                                        <div className="col-xs-6 push-bit">
                                            <span className="h3">$ 750<br /><small><em>3 Items</em></small></span>
                                        </div>
                                        <div className="col-xs-6">
                                            <Link to="/shopping-cart" className="btn btn-sm btn-block btn-success">VIEW CART</Link>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="form-inline push-bit clearfix">
                                <select id="results-show" name="results-show" className="form-control pull-right">
                                    <option value="0" disabled selected>SHOW</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="75">75</option>
                                    <option value="100">100</option>
                                </select>
                                <select id="results-sort" name="results-sort" className="form-control">
                                    <option value="0" disabled selected>SORT BY</option>
                                    <option value="1">Popularity</option>
                                    <option value="2">Name (A to Z)</option>
                                    <option value="3">Name (Z to A)</option>
                                    <option value="4">Price (Lowest to Highest)</option>
                                    <option value="5">Price (Highest to Lowest)</option>
                                    <option value="6">Sales (Lowest to Highest)</option>
                                    <option value="7">Sales (Highest to Lowest)</option>
                                </select>
                            </div>
                            <div className="row store-items">
                                {
                                    products.map(({id, productName, cost}) => (
                                        <div key={ id } className="col-md-6" data-toggle="animation-appear" data-animation-class="animation-fadeInQuick" data-element-offset="-100">
                                            <div className="store-item">
                                                <div className="store-item-info clearfix">
                                                    <span className="store-item-price themed-color-dark pull-right">$ { cost }</span>
                                                    <Link to={`/products/${ id }`}><strong>{ productName }</strong></Link><br />
                                                    <small><i className="fa fa-shopping-cart text-muted" /> <a href="javascript:void(0)" className="text-muted">Add to cart</a></small>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Export products page
export default Products;