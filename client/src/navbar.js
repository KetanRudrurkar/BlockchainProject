import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './navbar.css';

class Navbar extends Component{
    render(){
        return(
            <header>
                <h2>
                    <a>Car Management System</a>
                </h2>
            <nav>
                <li><NavLink to={"/manufacture"} activeStyle={{color: "blue"}}>Manufacture</NavLink></li>
                <li><NavLink to={"/mapping"} activeStyle={{color: "blue"}}>Car Mapping</NavLink></li>
                <li><NavLink to={"/buycar"} activeStyle={{color: "blue"}}>Buy Car</NavLink></li>
                <li><NavLink to={"/carhistory"} activeStyle={{color: "blue"}}>Car History</NavLink></li>
                <li><NavLink to={"/deliver"} activeStyle={{color: "blue"}}>Deliver</NavLink></li>
                <li><NavLink to={"/receive"} activeStyle={{color: "blue"}}>Receive</NavLink></li>
            </nav>
            </header>
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