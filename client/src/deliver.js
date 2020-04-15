import React, { Component } from 'react';

class Deliver extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (  
            <div>
            <strong><h3>Deliver Engine</h3></strong>
            Engine id: <input type="text" name="engineid" value={this.props.engine.engineid} onChange={this.props.typinginput} />
            <button type="button" className="button" onClick ={this.props.deliverengine}>Deliver Engine</button>
    
            <strong><h3>Deliver Battery</h3></strong>
            Battery id: <input type="text" name="batteryid" value={this.props.battery.batteryid} onChange={this.props.typinginput} />
            <button type="button" className="button" onClick ={this.props.deliverbattery}>Deliver Battery</button>
            </div>
        );
    }
}
 
export default Deliver;