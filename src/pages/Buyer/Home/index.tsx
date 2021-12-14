// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Images
import StoreHomeImg from "../../../assets/img/placeholders/headers/store_home.jpg";

// Constants
const newArrivals = [
    {
        id: 1,
        productName: "Sport Shoes",
        cost: 79,
    },
    {
        id: 2,
        productName: "Jacket",
        cost: 99,
    },
    {
        id: 3,
        productName: "Watch",
        cost: 299
    }
];

const bestSellers = [
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
    }
];

// Create home page
const Home = () => {
    return (
        <>
            <div className="media-container">
                <section className="site-section site-section-light site-section-top">
                    <div className="container text-center">
                        <h1 className="animation-slideDown"><strong>Welcome to our Online Store!</strong></h1>
                        <h2 className="h3 animation-slideUp hidden-xs">Explore over 5.000 products!</h2>
                    </div>
                </section>

                <img src={ StoreHomeImg } alt="store-home-img" className="media-image animation-pulseSlow" />
            </div>
            <section className="site-content site-section">
                <div className="container">
                    <div className="site-block">
                        <form action="ecom_search_results.html" method="post">
                            <div className="input-group input-group-lg">
                                <input type="text" id="ecom-search" name="ecom-search"
                                       className="form-control text-center" placeholder="Search Store.." />
                                <div className="input-group-btn">
                                    <button type="submit" className="btn btn-primary"><i
                                        className="fa fa-search" /></button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <h2 className="site-heading"><strong>New</strong> Arrivals</h2>
                    <hr />
                    <div className="row store-items">
                        {
                            newArrivals.map(({id, productName, cost}) => (
                                <div key={ id } className="col-md-4" data-toggle="animation-appear" data-animation-class="animation-fadeInQuick" data-element-offset="-100">
                                    <div className="store-item">
                                        <div className="store-item-info clearfix">
                                            <span className="store-item-price themed-color-dark pull-right">$ { cost }</span>
                                            <Link to={`/products/${ id }`}><strong>{ productName }</strong></Link><br />
                                            <small>
                                                <i className="fa fa-shopping-cart text-muted" /> <a href="javascript:void(0)" className="text-muted">Add to cart</a>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="col-md-12 text-right">
                            <Link to="/products"><strong>View All</strong> <i className="fa fa-arrow-right" /></Link>
                        </div>
                    </div>

                    <h2 className="site-heading"><strong>Best</strong> Sellers</h2>
                    <hr />
                    <div className="row store-items">
                        {
                            bestSellers.map(({id, productName, cost}) => (
                                <div key={ id } className="col-md-4" data-toggle="animation-appear" data-animation-class="animation-fadeInQuick" data-element-offset="-100">
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
                        <div className="col-md-12 text-right">
                            <Link to="/products"><strong>View All</strong> <i className="fa fa-arrow-right" /></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Export home page
export default Home;
