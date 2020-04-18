import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './navbar.css';

class UserNavbar extends Component{
    render(){
        return(
            <header>
                <h1>
                    <a>User Dashboard</a>
                </h1>
            <nav>
                {/* <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/manufacture"} activeStyle={{color: "blue"}}>Manufacture</NavLink></li> */}
                {/* <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/mapping"} activeStyle={{color: "blue"}}>Car Mapping</NavLink></li> */}
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/usernavbar/partsservicenavbar"} activeStyle={{color: "blue"}}>Parts Service</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/usernavbar/buycar"} activeStyle={{color: "blue"}}>Buy Car</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/usernavbar/carhistory"} activeStyle={{color: "blue"}}>Car History</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/"}>Home</NavLink></li>
                {/* <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/deliver"} activeStyle={{color: "blue"}}>Deliver</NavLink></li> */}
                {/* <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/receive"} activeStyle={{color: "blue"}}>Receive</NavLink></li> */}
            </nav>
            </header>
        )
    }
}

export default  UserNavbar;