// Dependencies
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

// Action
import { setNavStatus } from "../../store/actions";

// Interface
import { IState } from "../../interfaces";

// Routes
import { buyerRoutes } from "../../router/routes";

// Styles
import "./style.scss";

// Create buyer layout
const BuyerLayout = ({ children }) => {
    // Get header ref from hook
    const headerRef = useRef(null);
    // Get dispatch from hook
    const dispatch = useDispatch();
    // Get nav status from hook
    const showNav = useSelector((state: IState) => state.showNav, shallowEqual);

    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        window.onscroll = (e) => {
            // @ts-ignore
            if (e.currentTarget.scrollY > headerRef.current?.clientHeight) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };
    }, []);

    // Return buyer layout
    return (
        <div id="page-container">
            <header ref={ headerRef } className={ isScroll ? "header-scroll" : "" }>
                <div className="container">
                    <Link to="/" className="site-logo">
                        <i className="gi gi-flash" /> <strong>MVP </strong>Match Challenge
                    </Link>

                    <nav>
                        <span className="btn btn-default site-menu-toggle visible-xs visible-sm" onClick={() => dispatch(setNavStatus(true))}>
                            <i className="fa fa-bars" />
                        </span>

                        <ul className={`site-nav ${ showNav ? "site-nav-visible" : null }`} onMouseLeave={() => dispatch(setNavStatus(false))}>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <Link to="/shopping-cart">Shopping cart</Link>
                            </li>
                            <li>
                                <Link to="/deposit">Deposit</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            { children }
        </div>
    );
};

// Export buyer layout
export default BuyerLayout;
