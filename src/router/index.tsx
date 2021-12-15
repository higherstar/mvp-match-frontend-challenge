// Dependencies
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Layouts
import { AuthLayout, BuyerLayout, SellerLayout } from "../layouts";

// Routes
import { authRoutes, buyerRoutes, sellerRoutes } from "./routes";

// Interfaces
import { IState, IUser } from "../interfaces";

// Child routes
const childRoutes = (Layout, routes) =>
    routes.map(({ children, path, component: Component }, index) =>
        children ? (
            // Route item with children
            children.map(({ path, component: Component }, index) => (
                <Route
                    key={index}
                    path={path}
                    exact
                    render={props => (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            ))
        ) : (
            // Route item without children
            <Route
                key={index}
                path={path}
                exact
                render={props => (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )}
            />
        )
    );

// Create Routes
const Router = () => {
    // Get user from store
    const user: IUser = useSelector((state: IState) => state.user, shallowEqual);

    console.log(user);

    // Return router
    return (
        <BrowserRouter>
            <Switch>
                {
                    !user.token
                        ? (
                            <>
                                { childRoutes(AuthLayout, authRoutes) }
                                <Redirect to="/auth/sign-in" />
                            </>
                        )
                        : (
                            <>
                                {
                                    user.role === "seller"
                                        ? childRoutes(SellerLayout, sellerRoutes)
                                        : childRoutes(BuyerLayout, buyerRoutes)
                                }
                                <Redirect to="/" />
                            </>
                        )
                }
            </Switch>
        </BrowserRouter>
    );
};

// Export routes
export default Router;
