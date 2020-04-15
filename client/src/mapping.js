import React, { Component } from 'react';

class Mapping extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
            <ul><h2>Assembler Dashboard</h2></ul>
        <strong><h3>Buy Engine</h3></strong>
        Enter Engine Id: <input type="text" name="engineid" value={this.props.engine.engineid} onChange={this.props.typinginput} />
        Enter price in wei: <input type="text" name="engineprice" value={this.props.engine.engineprice} onChange={this.props.typinginput} />
        <button type="button" className="button" onClick ={this.props.buyengine}>Buy Engine</button>
            
        <strong><h3>Buy Battery</h3></strong>
        Enter Battery Id: <input type="text" name="batteryid" value={this.props.battery.batteryid} onChange={this.props.typinginput} />
        Enter price in wei: <input type="text" name="batteryprice" value={this.props.battery.batteryprice} onChange={this.props.typinginput} />
        <button type="button" className="button" onClick ={this.props.buybattery}>Buy Battery</button>

        <ul><h2>Engine and battery mapping with Car</h2></ul>
        <strong><h3>Register Car</h3></strong>
        car Name : <input type="text" name="carname" value={this.props.car.carname} onChange={this.props.typinginput} />
        Car Model : <input type="text" name="carmodel" value={this.props.car.carmodel} onChange={this.props.typinginput} />
        Car Price (Wei) : <input type="text" name="carprice" value={this.props.car.carprice} onChange={this.props.typinginput} />
        Car id: <input type="text" name="carid" value={this.props.car.carid} onChange={this.props.typinginput} />
        Engine id to install: <input type="text" name="engineid" value={this.props.engine.engineid} onChange={this.props.typinginput} />
        Battery id to install: <input type="text" name="batteryid" value={this.props.battery.batteryid} onChange={this.props.typinginput} />
        <button type="button" className="button" onClick ={this.props.registercar}>Register Car</button>
       
        </div>
         );
    }
}
 
export default Mapping;