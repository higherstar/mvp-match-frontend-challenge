// Dependencies
import React, {useState} from "react";
import { useSelector } from "react-redux";

// Interfaces
import { IState } from "../../../interfaces";

// Apis
import { BusinessApi } from "../../../apis";

// Actions

// Create deposit page
const Deposit = () => {
    // Get deposit from store
    const { deposit } = useSelector((state: IState) => state.user);

    // States
    const [value, setValue] = useState<number>(0);
    const [currentValue, setCurrentValue] = useState<number>(deposit || 0);

    // Deposit handler
    const handleDeposit = () => {
        BusinessApi.deposit(value)
            .then(res => {
                console.log(res);
                setCurrentValue(value + currentValue);
            })
            .catch(err => console.log(err));
    };

    // Reset handler
    const handleReset = () => {
        BusinessApi.reset()
            .then(res => {
                console.log(res);
                setCurrentValue(0);
            })
            .catch(err => console.log(err));
    };

    // Return deposit page
    return (
        <>
            <section className="site-section site-section-light site-section-top themed-background-dark">
                <div className="container text-center">
                    <h1 className="animation-slideDown"><strong>Deposit</strong></h1>
                </div>
            </section>
            <section className="site-content site-section">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xs-12 col-sm-10 col-md-8">
                            <h3>Current deposit: { currentValue }</h3>
                            <div className="input-group input-group-lg push">
                                <select className="form-control" onChange={e => setValue(+e.currentTarget.value)}>
                                    <option value={ 0 }>Please enter deposit...</option>
                                    <option value={ 5 }>  5  </option>
                                    <option value={ 10 }> 10 </option>
                                    <option value={ 20 }> 20 </option>
                                    <option value={ 50 }> 50 </option>
                                    <option value={ 100 }>100</option>
                                </select>
                                <span className="input-group-btn">
                                    <button type="button" className="btn btn-primary" disabled={ value === 0 } onClick={ handleDeposit }>Deposit</button>
                                </span>
                            </div>
                            <button type="reset" className="btn btn-block btn-lg btn-warning" onClick={ handleReset }><i className="fa fa-repeat" /> Reset</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

// Export deposit page
export default Deposit;
