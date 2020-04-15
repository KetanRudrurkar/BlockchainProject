import React, { Component } from 'react';

class CarHistory extends Component {
    constructor(props) {
        super(props);

    }
    render() { 
        return ( 
            <div>
        <ul><h2>Owner History Look up</h2></ul>
        <strong><h3>Car owners history</h3></strong>
        Enter Car Id: <input type="text" name="carid" value={this.props.car.carid} onChange={this.props.typinginput} />
        <button type="button" className="button" onClick ={this.props.carowners}>Get Car Owners history</button>
        All of the Car owners are {this.props.carownerhistory ? this.props.carownerhistory.map(eachOwner => {
          return(<div><li>{eachOwner}</li></div>)
        }):null};
        <strong><h3>Engine History</h3></strong>
        Enter Engine Id: <input type="text" name="engineid" value={this.props.engine.engineid} onChange={this.props.typinginput} />
        <button type="button"  className="button" onClick ={this.props.engineowners}>Get Engine History</button>
        All of the engine owners are {this.props.engineownerhistory ? this.props.engineownerhistory.map(eachOwner => {
          return(<div><li>{eachOwner}</li></div>)
        }):null};

        <strong><h3>Battery History</h3></strong>
        Enter Battery Id: <input type="text" name="batteryid" value={this.props.battery.batteryid} onChange={this.props.typinginput} />
        <button type="button" className="button" onClick ={this.props.batteryowners}>Get Battery History</button>
        All of the battery owners are {this.props.batteryownerhistory ? this.props.batteryownerhistory.map(eachOwner => {
          return(<div><li>{eachOwner}</li></div>)
        }):null};

        </div>
         );
    }
}
 
export default CarHistory;