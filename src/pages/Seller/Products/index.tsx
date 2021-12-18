// Dependencies
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

// Apis
import { ProductApi } from "../../../apis";

// Images
import HeaderImg from "../../../assets/img/placeholders/headers/dashboard_header.jpg";

// Create products page
const Products = () => {
    // States
    const [showModal, setShowModal] = useState<boolean>(false);
    const [productId, setProductId] = useState<number>(0);
    const [deleteProductName, setDeleteProductName] = useState<string>();
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState<string>();
    const [page, setPage] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState({
        productName: "ASC",
        cost: "ASC",
        amountAvailable: "ASC",
    });
    const [sortBy, setSortBy] = useState<"productName" | "cost" | "amountAvailable">("productName");

    // Delete click handler
    const handleDeleteClick = (id: number, name: string) => {
        setProductId(id);
        setDeleteProductName(name);
        setShowModal(true);
    };

    // Delete handler
    const handleDelete = () => {
        ProductApi.delete(productId)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        setShowModal(false);
    };

    // Sort handler
    const handleSort = (sortByName: "productName" | "cost" | "amountAvailable") => {
        setSortOrder({
            ...sortOrder,
            [sortByName]: sortOrder[sortByName] === "ASC" ? "DESC" : "ASC"
        });
        setSortBy(sortByName);
    };

    // Limit handler
    const handleLimit = (limitValue) => {
        setPage(1);
        setLimit(+limitValue);
    };

    // Search handler
    const handleSearch = (searchValue) => {
        setPage(1);
        setSearch(searchValue);
    };

    useEffect(() => {
        const order = sortOrder[sortBy] as "ASC" | "DESC";

        ProductApi.readAll({ search, limit, page, sortBy, order })
            .then(res => {
                console.log(res);
                setProducts(res.listData);
                setTotalPages(res.pagination.totalPages);
            })
            .catch(err => console.log(err));
    }, [ search, limit, page, sortBy, sortOrder]);

    // Return product page
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
                <img src={ HeaderImg } alt="header" className="animation-pulseSlow" />
            </div>
            <div className="block full">
                <div className="block-title">
                    <div className="block-options pull-right">
                        <Link to="/products/create" className="btn btn-sm btn-success"><i className="fa fa-plus" /> New</Link>
                    </div>
                    <h2><i className="gi gi-shopping_cart mr-2" /> <strong>Products</strong></h2>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-xs-9">
                        <div className="input-group">
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-primary"><i className="fa fa-search mr-3" /></button>
                                            </span>
                            <input type="text" name="example-input1-group2" className="form-control" placeholder="Please enter product name..." onInput={e => handleSearch(e.currentTarget.value)} />
                        </div>
                    </div>
                    <div className="col-sm-8 col-xs-3">
                        <label className="pull-right">
                            <select name="example-datatable_length" className="form-control" onChange={e => handleLimit(e.currentTarget.value)}>
                                <option value={ 10 }>10</option>
                                <option value={ 20 }>20</option>
                                <option value={ 30 }>30</option>
                            </select>
                        </label>
                    </div>
                </div>
                <table id="ecom-products" className="table table-bordered table-striped table-vcenter mt-4">
                    <thead>
                    <tr>
                        <th className="text-center" style={{ width: 70 }}>No</th>
                        <th className="cursor" onClick={() => handleSort("productName")}>Product Name <i className={`hi hi-sort-by-alphabet${ sortOrder.productName === "DESC" ? "" : "-alt" }`} /></th>
                        <th className="hidden-xs cursor" onClick={() => handleSort("cost")}>Price <i className={`hi hi-sort-by-order${ sortOrder.cost === "DESC" ? "" : "-alt" }`} /></th>
                        <th className="hidden-xs cursor" onClick={() => handleSort("amountAvailable")}>Status <i className={`hi hi-sort-by-order${ sortOrder.amountAvailable === "DESC" ? "" : "-alt" }`} /></th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.length > 0
                            ? products.map(({ id, productName, cost, amountAvailable }, index) => (
                                <tr>
                                    <td className="text-center">{ (page - 1) * limit + index + 1 }</td>
                                    <td>{ productName }</td>
                                    <td className="hidden-xs"><strong>$ { cost }</strong></td>
                                    <td className="hidden-xs">
                                                    <span className={`label ${ amountAvailable ? "label-success" : "label-danger" } `}>
                                                        {
                                                            amountAvailable ? `Available(${ amountAvailable })` : "Out of stock"
                                                        }
                                                    </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group btn-group-xs">
                                            <Link to={ `/products/edit/${ id }` } data-toggle="tooltip" title="Edit" className="btn btn-default"><i className="fa fa-pencil" /></Link>
                                            <span className="btn btn-xs btn-danger" onClick={() => handleDeleteClick(id, productName)}><i className="fa fa-times" /></span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            : (
                                <tr>
                                    <td colSpan={ 5 }>
                                        <div className="text-center">
                                            <h4>There is no data to display</h4>
                                        </div>
                                    </td>
                                </tr>
                            )
                    }
                    </tbody>
                </table>
                <div className="text-right">
                    {
                        totalPages > 1 &&
                        <ul className="pagination pagination-sm">
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
            {
                showModal &&
                <div id="modal-regular" className="modal fade in d-block" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-body">
                        <div>
                          <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <h4>
                          Are you sure to delete { deleteProductName }?
                        </h4>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-default" onClick={() => setShowModal(false)}>No</button>
                        <button type="button" className="btn btn-sm btn-primary" onClick={() => handleDelete()}>Yes</button>
                      </div>
                    </div>
                  </div>
                </div>
            }
        </>
    );
};

// Return products page
export default Products;
