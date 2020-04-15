import React, { Component } from 'react';

class CarHistory extends Component {
    constructor(props) {
        super(props);

    }
    render() { 
        return ( 
          <div>
            <ul><h2>Owner History Look up</h2></ul>
          <div className={"container"}>

          <div className={"sub-container"}>
        <strong><h3>Car owners history</h3></strong>
        Enter Car Id: <input type="text" name="carid" value={this.props.car.carid} onChange={this.props.typinginput} />
        <button type="button" className="button" onClick ={this.props.carowners}>Get Car Owners history</button>
        <span>All of the Car owners are</span> <br></br>{this.props.carownerhistory ? this.props.carownerhistory.map(eachOwner => {
          return(<span>{eachOwner}</span>)
        }):null}
</div>

        <div className={"sub-container"}>
        <strong><h3>Engine History</h3></strong>
        Enter Engine Id: <input type="text" name="engineid" value={this.props.engine.engineid} onChange={this.props.typinginput} />
        <button type="button"  className="button" onClick ={this.props.engineowners}>Get Engine History</button>
        <span>All of the engine owners are</span><br></br> {this.props.engineownerhistory ? this.props.engineownerhistory.map(eachOwner => {
          return(<span>{eachOwner}</span>)
        }):null}
</div>

<div className={"sub-container"}>
        <strong><h3>Battery History</h3></strong>
        Enter Battery Id: <input type="text" name="batteryid" value={this.props.battery.batteryid} onChange={this.props.typinginput} />
        <button type="button" className="button" onClick ={this.props.batteryowners}>Get Battery History</button>
        <span>All of the battery owners are </span> <br></br>{this.props.batteryownerhistory ? this.props.batteryownerhistory.map(eachOwner => {
          return(<span>{eachOwner}</span>)
        }):null}
          </div>
          </div>
        </div>
         );
    }
}
 
export default CarHistory;