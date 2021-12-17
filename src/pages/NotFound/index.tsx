// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Create not found page
const NotFound = () => (
    <div id="error-container">
        <div className="error-options">
            <h3><i className="fa fa-chevron-circle-left text-muted" /> <Link to="/">Go Back</Link></h3>
        </div>
        <div className="d-flex align-items-center justify-content-center">
            <h1 className="animation-fadeIn"><i className="fa fa-times-circle-o text-muted" /> <strong>Not Found</strong></h1>
        </div>
    </div>
);

// Export not found page
export default NotFound;