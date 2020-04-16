import React, { Component } from 'react';

class Receive extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2><strong>Supply Chain (Assembler End)</strong></h2>
                <div className={"container"}>

                    <div className={"sub-container"}>
                        <strong><h3>Receive Engine</h3></strong>
        Engine id: <input type="text" id = "engine" name="engineid" value={this.props.engine.engineid} onChange={this.props.typinginput} />
                        <button type="button" className="button" onClick={this.props.receiveengine}>Received Engine</button>
                    </div>

                    <div className={"sub-container"}>
                        <strong><h3>Receive Battery</h3></strong>
        Battery id: <input type="text" id = "battery" name="batteryid" value={this.props.battery.batteryid} onChange={this.props.typinginput} />
                        <button type="button" className="button" onClick={this.props.receivebattery}>Received Battery</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Receive;