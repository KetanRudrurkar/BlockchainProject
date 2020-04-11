import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <a to="/" className="navbar-brand">Dashbord</a>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <a to="/" className="nav-link">Transactions</a>
          </li>
          <li className="navbar-item">
          <a to="/create" className="nav-link">Create New Transaction</a>
          </li>
          <li className="navbar-item">
          <a to="/user" className="nav-link">Create User</a>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}