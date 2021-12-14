// Dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

// Routes
import { sellerRoutes } from "../../router/routes";

// Interfaces
import { IState } from "../../store/reducers";

// Images
import AvatarImg from "../../assets/img/placeholders/avatars/avatar.jpg";

// Actions
import { setMenuStatus } from "../../store/actions";

// Styles
import "./style.scss";

// Create seller layout
const SellerLayout = ({ children }) => {
    // Get dispatch from hook
    const dispatch = useDispatch();
    // Get showMenu from hook
    const showMenu = useSelector((state: IState) => state.showMenu);

    // @ts-ignore
    window.onresize = (e => {
        if (e.innerWidth > 991) {
            dispatch(setMenuStatus(true));
        } else {
            dispatch(setMenuStatus(false));
        }
    });

    // Return seller layout
    return (
        <div id="page-wrapper">
            <div id="page-container" className={`sidebar-partial ${ showMenu ? "sidebar-visible-lg sidebar-visible-xs" : null } sidebar-no-animations`}>
                <div id="sidebar">
                    <div id="sidebar-scroll">
                        <div className="sidebar-content">
                            <Link to="/projects" className="sidebar-brand">
                                <i className="gi gi-flash" />
                                <span className="sidebar-nav-mini-hide"><strong>MVP</strong> Match</span>
                            </Link>

                            <div className="sidebar-section sidebar-user clearfix sidebar-nav-mini-hide">
                                <div className="sidebar-user-avatar">
                                    <img src={ AvatarImg } alt="avatar" />
                                </div>
                                <div className="sidebar-user-name">John Doe</div>
                                <div className="sidebar-user-links">
                                    <a href="#modal-user-settings" data-toggle="modal" className="enable-tooltip" data-placement="bottom" title="Settings"><i className="gi gi-cogwheel" /></a>
                                    <a href="login.html" data-toggle="tooltip" data-placement="bottom" title="Logout"><i className="gi gi-exit" /></a>
                                </div>
                            </div>

                            <ul className="sidebar-nav">
                                {
                                    sellerRoutes.map(({path, name, icon}) => (
                                        <li key={ name }>
                                            <NavLink to={ path }>
                                                <i className={`gi gi-${ icon } sidebar-nav-icon`} /> <span className="sidebar-nav-mini-hide">{ name }</span>
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="main-container">
                    <header className="navbar navbar-default">
                        <ul className="nav navbar-nav-custom">
                            <li>
                                <a href="javascript:void(0)" onClick={() => dispatch(setMenuStatus(!showMenu))}>
                                    <i className="fa fa-bars fa-fw" />
                                </a>
                            </li>
                        </ul>

                        <ul className="nav navbar-nav-custom pull-right">
                            <li className="dropdown">
                                <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={ AvatarImg } alt="avatar" />
                                    <i className="fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu dropdown-custom dropdown-menu-right">
                                    <li className="dropdown-header text-center">Account</li>
                                    <li>
                                        <a href="page_ready_user_profile.html">
                                            <i className="fa fa-user fa-fw pull-right" />
                                            Profile
                                        </a>
                                        <a href="#modal-user-settings" data-toggle="modal">
                                            <i className="fa fa-ban fa-fw pull-right" />
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </header>
                    { children }
                </div>
            </div>
        </div>
    );
};

// Export seller layout
export default SellerLayout;