import React, { Component } from 'react';

class BuyCar extends Component {
    constructor(props) {
        super(props);

    }
    render() { 
        return ( 
            <div>
                  <h2><strong>Buy car</strong></h2>
            <div className={"container"}>
            <div className={"sub-container"}>
        Enter Car Id: <input type="text" id = "car" name="carid" value={this.props.car.carid} onChange={this.props.typinginput} />
        Enter price in wei: <input type="text" id = "car" name="carprice" value={this.props.car.carprice} onChange={this.props.typinginput} />
        <button type="button" className="button" onClick ={this.props.buycar}>Buy Car</button>
        </div>
        </div>
            </div>
         );
    }
}
 
export default BuyCar;