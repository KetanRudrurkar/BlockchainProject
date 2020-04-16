import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Role from './role';
import './navbar.css';

class Navbar extends Component{
    render(){
        return(
            <div>
            <header>
                <h1>
                    <a>Car Management System</a>
                </h1>
            <nav>
                {/* <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/manufacture"} activeStyle={{color: "blue"}}>Manufacture</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/mapping"} activeStyle={{color: "blue"}}>Car Mapping</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/buycar"} activeStyle={{color: "blue"}}>Buy Car</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/carhistory"} activeStyle={{color: "blue"}}>Car History</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/deliver"} activeStyle={{color: "blue"}}>Deliver</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/receive"} activeStyle={{color: "blue"}}>Receive</NavLink></li> */}
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/businessnavbar"} activeStyle={{color: "blue"}}>Business Dashboard</NavLink></li>
                <li><NavLink className={"tab hvr-shutter-out-horizontal"} to={"/usernavbar"} activeStyle={{color: "blue"}}>User Dashboard</NavLink></li>
            </nav>
            </header>
            <Role />
            </div>
        )
    }
}

export default  Navbar;


/* <strong><h3>Create Engine</h3></strong>
            Engine Name : <input type="text" name="enginename" value={this.state.enginename} onChange={this.typinginput} />
            Engine Price (Wei) : <input type="text" name="engineprice" value={this.state.engineprice} onChange={this.typinginput} />
            Engine Quantity: <input type="text" name="enginequantity" value={this.state.enginequantity} onChange={this.typinginput} />
            Engine id: <input type="text" name="engineid" value={this.state.engineid} onChange={this.typinginput} />
            <button type="button" className="button" onClick ={this.manufactureengine}>Manufacture Engine</button> */