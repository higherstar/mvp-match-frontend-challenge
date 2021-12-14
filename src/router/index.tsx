// Dependencies
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Layouts
import { AuthLayout, BuyerLayout, SellerLayout } from "../layouts";

// Routes
import { authRoutes, buyerRoutes, sellerRoutes } from "./routes";

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
const Router = () => (
    <BrowserRouter>
        <Switch>
            {childRoutes(AuthLayout, authRoutes)}
            {childRoutes(BuyerLayout, buyerRoutes)}
            {/*{childRoutes(SellerLayout, sellerRoutes)}*/}
        </Switch>
    </BrowserRouter>
);

// Export routes
export default Router;