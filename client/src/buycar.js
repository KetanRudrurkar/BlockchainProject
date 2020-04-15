import React, { Component } from 'react';

class BuyCar extends Component {
    constructor(props) {
        super(props);

    }
    render() { 
        return ( 
            <div>
                <strong><h3>Buy Car</h3></strong>
        Enter Car Id: <input type="text" name="carid" value={this.props.car.carid} onChange={this.props.typinginput} />
        Enter price in wei: <input type="text" name="carprice" value={this.props.car.carprice} onChange={this.props.typinginput} />
        <button type="button" className="button" onClick ={this.props.buycar}>Buy Car</button>
            </div>
         );
    }
}
 
export default BuyCar;