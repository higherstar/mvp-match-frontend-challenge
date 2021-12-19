// Dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// Apis
import { ProductApi } from "../../../apis";

// Interfaces
import { IQueryParams, IState } from "../../../interfaces";

// Actions
import { addCart } from "../../../store/actions";

// Images
import StoreHomeImg from "../../../assets/img/placeholders/headers/store_home.jpg";

// Create home page
const Home = () => {
    // States
    const [search, setSearch] = useState<string>();
    const [newArrivals, setNewArrivals] = useState([]);

    // Get history from hook
    const history = useHistory();

    // Get dispatch form hook
    const dispatch = useDispatch();

    // Get cart from store
    const cart = useSelector((state: IState) => state.cart);

    // input handler
    const handleInput = (inputValue) => {
        setSearch(inputValue);
    };

    // Key up handler
    const handleKeyUp = (key) => {
        if (key === "Enter") {
            history.push(`/products?${ search }`);
        }
    };

    // Add to cart handler
    const handleCart = (product) => {
        if (!(cart.filter(p => p.id === product.id).length > 0)) {
            dispatch(addCart([...cart, { ...product, quantity: 1 }]));
        }
    };

    useEffect(() => {
        const query = {
            limit: 5,
            sortBy: "createdAt",
            order: "DESC"
        } as IQueryParams;

        ProductApi.readAll(query)
            .then(res => {
                console.log(res);
                setNewArrivals(res.listData);
            })
            .catch(err => console.log(err));
    }, []);

    // Return home page
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
                        <div className="input-group input-group-lg">
                            <input type="text" className="form-control text-center" placeholder="Search Store.." onKeyUp={e => handleKeyUp(e.key)} onInput={e => handleInput(e.currentTarget.value)} />
                            <div className="input-group-btn">
                                <button type="submit" className="btn btn-primary" onClick={() => history.push(`/products?${ search }`)}><i className="fa fa-search" /></button>
                            </div>
                        </div>
                    </div>

                    <h2 className="site-heading"><strong>New</strong> Arrivals</h2>
                    <hr />
                    <div className="row store-items">
                        {
                            newArrivals.map(({id, productName, amountAvailable, cost}) => (
                                <div key={ id } className="col-md-4" data-toggle="animation-appear" data-animation-class="animation-fadeInQuick" data-element-offset="-100">
                                    <div className="store-item">
                                        <div className="store-item-info clearfix">
                                            <span className="store-item-price themed-color-dark pull-right">$ { cost }</span>
                                            <Link to={`/products/${ id }`}><strong>{ productName }</strong></Link><br />
                                            <small>
                                                <i className="fa fa-shopping-cart text-muted" /> <span className="text-muted add-cart" onClick={() => handleCart({ id, productName, cost, amountAvailable })}>Add to cart</span>
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
                </div>
            </section>
        </>
    );
};

// Export home page
export default Home;
