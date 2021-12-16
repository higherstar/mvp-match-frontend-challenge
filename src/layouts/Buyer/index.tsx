// Dependencies
import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

// Action
import { setNavStatus, setUser } from "../../store/actions";

// Interface
import { IState } from "../../interfaces";

// Routes
import { buyerRoutes } from "../../router/routes";

// Services
import { Storage } from "../../services";

// Styles
import "./style.scss";
import {SettingsModal} from "../../components";

// Create buyer layout
const BuyerLayout = ({ children }) => {
    // Get header ref from hook
    const headerRef = useRef(null);
    // Get dispatch from hook
    const dispatch = useDispatch();
    // Get nav status from hook
    const showNav = useSelector((state: IState) => state.showNav, shallowEqual);

    // States
    const [isScroll, setIsScroll] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

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

    // Logout handler
    const handleLogout = () => {
        // Remove token from local storage
        Storage.removeItem(process.env.ACCESS_TOKEN_KEY || "access_token");

        // Dispatch set user action
        dispatch(setUser({
            role: "buyer",
            token: false,
            deposit: 0,
            email: ""
        }));
    };

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
                            <li className="visible-xs visible-sm">
                                <span className="site-menu-toggle text-center" onClick={() => dispatch(setNavStatus(false))}>
                                    <i className="fa fa-times" />
                                </span>
                            </li>
                            {
                                buyerRoutes.map(({ path, name, children }, index) => (
                                    <li key={ index }>
                                        <NavLink to={ path } exact={ !children }>{ name }</NavLink>
                                    </li>
                                ))
                            }
                            <li onClick={() => setShowModal(true)}>
                                <span className="m-0 visible-md visible-lg">
                                    <i className="gi gi-user" />
                                </span>
                                <span className="visible-xs visible-sm">
                                    Profile
                                </span>
                            </li>
                            <li onClick={ handleLogout }>
                                <span className="m-0 visible-md visible-lg">
                                    <i className="gi gi-power" />
                                </span>
                                <span className="visible-xs visible-sm">
                                    Logout
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <SettingsModal open={ showModal } setOpen={ setShowModal } />
            { children }
        </div>
    );
};

// Export buyer layout
export default BuyerLayout;
