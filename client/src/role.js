import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Role extends Component {
    constructor(props) {
        super(props);
        
    }
    
    
    
    render() { 
        return ( 
            <div className="role">
                <h1>Welcome to Car Management System.</h1>
                <h3>One place for all your car needs.</h3>
                <br>
                </br>
                <h3>Please choose your role:</h3>
                <div className="row">
                <Link to='/businessnavbar' id = "rolebutton" className="btn btn-light">Business</Link>
                <Link to='/usernavbar' id = "rolebutton" className="btn btn-dark">User</Link>
                </div>
            </div>
         );
    }
}
 
export default Role;

