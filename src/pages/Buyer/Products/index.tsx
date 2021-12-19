// Dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

// Apis
import { ProductApi } from "../../../apis";

// Interfaces
import { IState } from "../../../interfaces";

// Actions
import { addCart } from "../../../store/actions";

// Create products page
const Products = () => {
    // States
    const [limit, setLimit] = useState<number>(25);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState<string>();
    const [sortOrder, setSortOrder] = useState<{ sortBy: string, order: "ASC" | "DESC" }>({ sortBy: "productName", order: "ASC" });

    // Get search from url
    const { search: searchKey } = useLocation();

    // Get dispatch from hook
    const dispatch = useDispatch();

    // Get cart from store
    const cart = useSelector((state: IState) => state.cart);

    // Limit handler
    const handleLimit = (limitValue: number) => {
        setPage(1);
        setLimit(limitValue);
    };

    // Search handler
    const handleSearch = (searchVale: string) => {
        setPage(1);
        setSearch(searchVale);
    };

    // Sort handler
    const handleSort = (sortValue) => {
        setSortOrder({
            sortBy: sortValue.sortBy,
            order: sortValue.order
        });
    };

    // Add to cart handler
    const handleCart = (product) => {
        if (!(cart.filter(p => p.id === product.id).length > 0)) {
            dispatch(addCart([...cart, { ...product, quantity: 1 }]));
        }
    };

    useEffect(() => {
        const { sortBy, order } = sortOrder;

        ProductApi.readAll({ search, limit, page, sortBy, order })
            .then(res => {
                console.log(res);
                setProducts(res.listData);
                setTotalPages(res.pagination.totalPages);
            })
            .catch(err => console.log(err));
    }, [ search, limit, page, sortOrder ]);

    useEffect(() => {
        setSearch(searchKey.slice(1));
    }, [searchKey]);

    // Return products page
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
                                            <input type="text" className="form-control" placeholder="Search Store.." value={ search } onInput={e => handleSearch(e.currentTarget.value)} />
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn btn-primary"><i className="fa fa-search" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <aside className="sidebar site-block">
                                <div className="sidebar-block">
                                    {
                                        cart.length > 0
                                            ? (
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-xs-6 push-bit">
                                                        <span className="h3">$ { cart.reduce((totalPrice, p) => totalPrice + p.quantity * p.cost, 0) }<br /><small><em>{ cart.length } Item{ cart.length > 1 ? "s" : null }</em></small></span>
                                                    </div>
                                                    <div className="col-xs-6">
                                                        <Link to="/shopping-cart" className="btn btn-sm btn-block btn-success">VIEW CART</Link>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <h5 className="text-center"><strong>Please add product in the cart.</strong></h5>
                                            )
                                    }
                                </div>
                            </aside>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="form-inline push-bit clearfix">
                                <select className="form-control pull-right" onChange={e => handleLimit(+e.currentTarget.value)}>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="75">75</option>
                                    <option value="100">100</option>
                                </select>
                                <select className="form-control" onChange={e => handleSort(JSON.parse(e.currentTarget.value))}>
                                    <option value="0" disabled selected>SORT BY</option>
                                    <option value={JSON.stringify({ sortBy: "productName", order: "ASC" })}>Name (A to Z)</option>
                                    <option value={JSON.stringify({ sortBy: "productName", order: "DESC" })}>Name (Z to A)</option>
                                    <option value={JSON.stringify({ sortBy: "cost", order: "ASC" })}>Price (Lowest to Highest)</option>
                                    <option value={JSON.stringify({ sortBy: "cost", order: "DESC" })}>Price (Highest to Lowest)</option>
                                    <option value={JSON.stringify({ sortBy: "amountAvailable", order: "ASC" })}>Sales (Lowest to Highest)</option>
                                    <option value={JSON.stringify({ sortBy: "amountAvailable", order: "DESC" })}>Sales (Highest to Lowest)</option>
                                </select>
                            </div>
                            <div className="row store-items">
                                {
                                    products.length > 0
                                        ? products.map(({id, productName, amountAvailable, cost}) => (
                                            <div key={ id } className="col-md-6" data-toggle="animation-appear" data-animation-class="animation-fadeInQuick" data-element-offset="-100">
                                                <div className="store-item">
                                                    <div className="store-item-info clearfix">
                                                        <span className="store-item-price themed-color-dark pull-right">$ { cost }</span>
                                                        <Link to={`/products/${ id }`}><strong>{ productName }</strong></Link><br />
                                                        <small><i className="fa fa-shopping-cart text-muted" /> <span className="text-muted add-cart" onClick={() => handleCart({ id, productName, cost, amountAvailable })}>Add to cart</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : (
                                            <div className="text-center">
                                                <h4>There is no data to display</h4>
                                            </div>
                                        )
                                }
                            </div>
                            <div className="text-right">
                                {
                                    totalPages > 1 &&
                                    <ul className="pagination">
                                      <li className={ page === 1 ? "disabled" : "" } onClick={() => setPage(page - 1)}><span><i className="fa fa-angle-left" /></span></li>
                                        {
                                            new Array(totalPages).fill(1).map((_, index) => (
                                                <li className={ page === (index + 1) ? "active" : "" } onClick={() => setPage(index + 1)}>
                                                    <span>{ index + 1 }</span>
                                                </li>
                                            ))
                                        }
                                      <li className={ page === totalPages ? "disabled" : "" } onClick={() => setPage(page + 1)}><span><i className="fa fa-angle-right" /></span></li>
                                    </ul>
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