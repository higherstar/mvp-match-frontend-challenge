// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Images
import HeaderImg from "../../../assets/img/placeholders/headers/dashboard_header.jpg";

// Constants
const products = [
    {
        id: 1,
        productName: "headset",
        cost: 23,
        availableAmount: 4,
    }
];

// Create products page
const Products = () => {
    return (
        <>
            <div className="content-header content-header-media">
                <div className="header-section">
                    <div className="row">
                        <div className="col-md-4 col-lg-6">
                            <h1>Welcome <strong>Seller</strong><br /><small>You Look Awesome!</small></h1>
                        </div>
                    </div>
                </div>
                <img src={ HeaderImg } alt="header-image"
                     className="animation-pulseSlow" />
            </div>
            <div className="block full">
                <div className="block-title">
                    <div className="block-options pull-right">
                        <Link to="/products/create" className="btn btn-sm btn-success"><i className="fa fa-plus" /> New</Link>
                    </div>
                    <h2><i className="gi gi-shopping_cart mr-2" /> <strong>Products</strong></h2>
                </div>
                <div className="input-group push">
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-primary"><i className="fa fa-search mr-3" />Search</button>
                        </span>
                    <input type="text" id="example-input1-group2" name="example-input1-group2" className="form-control" placeholder="Please enter product name..." />
                </div>
                <table id="ecom-products" className="table table-bordered table-striped table-vcenter">
                    <thead>
                    <tr>
                        <th className="text-center" style={{ width: 70 }}>No</th>
                        <th>Product Name</th>
                        <th className="text-right hidden-xs">Price</th>
                        <th className="hidden-xs">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map(({ id, productName, cost, availableAmount }, index) => (
                            <tr>
                                <td className="text-center">{ index + 1 }</td>
                                <td>{ productName }</td>
                                <td className="text-right hidden-xs"><strong>$ { cost }</strong></td>
                                <td className="hidden-xs">
                                        <span className={`label ${ availableAmount ? "label-success" : "label-danger" } `}>
                                            {
                                                availableAmount ? `Available(${ availableAmount })` : "Out of stock"
                                            }
                                        </span>
                                </td>
                                <td className="text-center">
                                    <div className="btn-group btn-group-xs">
                                        <Link to={ `/products/edit/${ id }` } data-toggle="tooltip" title="Edit"
                                              className="btn btn-default"><i className="fa fa-pencil"></i></Link>
                                        <a href="javascript:void(0)" data-toggle="tooltip" title="Delete"
                                           className="btn btn-xs btn-danger"><i className="fa fa-times"></i></a>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <div className="text-right">
                    <ul className="pagination pagination-sm">
                        <li><a href="javascript:void(0)"><i className="fa fa-angle-left"></i></a></li>
                        <li className="active"><a href="javascript:void(0)">1</a></li>
                        <li><a href="javascript:void(0)">2</a></li>
                        <li><a href="javascript:void(0)">3</a></li>
                        <li><a href="javascript:void(0)">4</a></li>
                        <li><a href="javascript:void(0)"><i className="fa fa-angle-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

// Return products page
export default Products;
