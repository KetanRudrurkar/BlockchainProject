import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './navbar.css';

class BusinessNavbar extends Component{
    render(){
        return(
            <header>
                <h1>
                    <a>Business Dashboard</a>
                </h1>
            <nav>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/businessnavbar/manufacture"} activeStyle={{color: "cyan"}}>Manufacture</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/businessnavbar/mapping"} activeStyle={{color: "cyan"}}>Car Mapping</NavLink></li>
                {/* <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/buycar"} activeStyle={{color: "blue"}}>Buy Car</NavLink></li> */}
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/businessnavbar/carhistory"} activeStyle={{color: "cyan"}}>Car History</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/businessnavbar/deliver"} activeStyle={{color: "cyan"}}>Deliver</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/businessnavbar/receive"} activeStyle={{color: "cyan"}}>Receive</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/"}>Home</NavLink></li>
            </nav>
            </header>
        )
    }
}

export default  BusinessNavbar;