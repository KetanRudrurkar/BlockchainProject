import React, { Component } from 'react';
import "./manufacture.css"

class manufacture extends Component {
    constructor(props) {
        super(props);
    }
    

    render() { 
        // let display = <div><li>{this.props.engineobject.Object.events.returnvalues.itemname}</li></div>
        return (  
            <div>
            <h2><strong>Manufacturer Dashboard</strong></h2>
            <div className={"container"}>
            <div className={"sub-container"}>
            <strong><h3>Create Engine</h3></strong>
            Engine Name : <input type="text" id = "engine" name="enginename" value={this.props.engine.enginename} onChange={this.props.typinginput} />
            Engine Price (Wei) : <input type="text" id = "engine" name="engineprice" value={this.props.engine.engineprice} onChange={this.props.typinginput} />
            Engine Quantity: <input type="text" id = "engine" name="enginequantity" value={this.props.engine.enginequantity} onChange={this.props.typinginput} />
            Engine id: <input type="text" id = "engine" name="engineid" value={this.props.engine.engineid} onChange={this.props.typinginput} />
            <button type="button" className="button" onClick ={this.props.manufactureengine}>Manufacture Engine</button>
            </div>
            <br></br>
            {/* The engine has been created with the following details: {this.props.engineobject ? <li>{display}</li>{}} */}
            <div className={"sub-container"}>
            <strong><h3>Create Battery</h3></strong>
             Battery Name : <input type="text" name="batteryname" value={this.props.battery.batteryname} onChange={this.props.typinginput} />
            Battery Price (Wei) : <input type="text" name="batteryprice" value={this.props.battery.batteryprice} onChange={this.props.typinginput} />
            Battery Quantity: <input type="text" name="batteryquantity" value={this.props.battery.batteryquantity} onChange={this.props.typinginput} />
            Battery id: <input type="text" name="batteryid" value={this.props.battery.batteryid} onChange={this.props.typinginput} />
            <button type="button" className="button" onClick ={this.props.manufacturebattery}>Manufacture Battery</button>
            </div>
            </div>
            </div>
        );
    }
}
 
export default manufacture;

