import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class PartsServiceNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <header>
                Parts Service Prediction
            
            <nav>
            <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/usernavbar/partsservicenavbar/user"} activeStyle={{color: "blue"}}>User</NavLink></li>
            <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/usernavbar/partsservicenavbar/servicepoint"} activeStyle={{color: "blue"}}>Service Point</NavLink></li>
            </nav>
            </header>
        
        );
    }
}
 
export default PartsServiceNavbar;