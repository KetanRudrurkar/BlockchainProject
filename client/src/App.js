import React, { Component } from "react";
import ItemAuthenticityContract from "./contracts/ItemAuthenticity.json";
// import {Router, Route, browserHistory} from "react-router";
import _ from 'lodash';
import { BrowserRouter, Link, Route} from 'react-router-dom';
import Manufacture from "./manufacture";
// import './manufacture.css';
import Deliver from "./deliver";
// import './deliver.css';
import Mapping from './mapping';
// import './mapping.css';
import Receive from './receive';
import BuyCar from './buycar';
import Navbar from './navbar';
import CarHistory from './carhistory';
import BusinessNavbar from './businessnavbar';
import UserNavbar from './usernavbar';
import Role from './role'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

import "./App.css";

import getWeb3 from "./getWeb3";

// import "./App.css";

class App extends Component {
  state = {gotaccounts: false, engine: { enginename: "Tesla Engine", engineprice: 100 , enginequantity: 1, engineid: 1003} , battery: {batteryname: "Tesla Battery", batteryprice: 100, batteryquantity: 1,batteryid: 1002}, engineownerhistory: [] , batteryownerhistory:[] , carownerhistory:[] , car: {carname: "Tesla", carmodel: "M",carprice: 500, carid: 1004}};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
    this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      // const accounts = await this.web3.eth.getAccounts();
      // console.log(this.accounts);

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.contractinstance = new this.web3.eth.Contract(
        ItemAuthenticityContract.abi,
        ItemAuthenticityContract.networks[this.networkId] && ItemAuthenticityContract.networks[this.networkId].address,
      );

      console.log("methods", this.contractinstance.methods);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({gotaccounts: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  typinginput = (word) => {
    const target = word.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    const id = word.target.id;
    if(word.target.id) {
      var newState = {...this.state}
      var temp = newState[id]
      temp[name] = value
    }
    this.setState({
      newState
    })
    console.log("Handle input change called.")
  }

  manufactureengine= async() => {
    const {enginename,engineprice, enginequantity,engineid} = this.state.engine;
    const accounts = await this.web3.eth.getAccounts();
    console.log(accounts[0]);
    var balance = this.web3.eth.getBalance(accounts[0]);
    console.log("balance is", balance); 
    console.log(this.contractinstance.methods.itemcreation(enginename,engineprice,enginequantity, engineid));
    let engineobject = await this.contractinstance.methods.itemcreation(enginename, engineprice, enginequantity,engineid).send({from:accounts[0], gas:3000000});
    console.log("engine object is", engineobject);
    // document.getElementById("enginecreated").innerHTML(engineobject.events.statusevent.returnValues.itemname);
    alert("The engine has been manufactured with the unique engine id: "+ engineid +"by the account " + accounts[0]);
    // document.getElementById("engine").innerHTML = "The Engine has been manufactured with the unique id: "<li>engineobject.events.statusevent.returnValues.itemname</li>;

  }


  manufacturebattery= async() => {
    const {batteryname,batteryprice, batteryquantity,batteryid} = this.state.battery;
    const accounts = await this.web3.eth.getAccounts();
    console.log("account 0 and 1",accounts[0], accounts[1]);
    var balance = this.web3.eth.getBalance(accounts[0]);
    console.log("balance is", balance);
    console.log(this.contractinstance.methods.batterycreation(batteryname,batteryprice,batteryquantity, batteryid));
    let batteryobject = await this.contractinstance.methods.batterycreation(batteryname, batteryprice, batteryquantity,batteryid).send({from:accounts[0], gas:3000000});
    console.log("battery object is", batteryobject);
    // document.getElementById("enginecreated").innerHTML(engineobject.events.statusevent.returnValues.itemname);
    alert("The battery has been manufactured with the unique battery id: "+ batteryid +"by the account " + accounts[0] );
  }
  
  buyengine = async() => {
    const {engineid, engineprice} = this.state.engine;
    const accounts = await this.web3.eth.getAccounts();
    let buyengineobject = await this.contractinstance.methods.buyandpayitem(engineid).send({from:accounts[0], gas:3000000, value: engineprice})
    console.log("buy engine object is", buyengineobject);
    alert("The engine with " + engineid + "has been bought by account " + accounts[0]);
    // console.log("buy engine object is", buyengineobject);
}

buybattery = async() => {
  const {batteryid, batteryprice} = this.state.battery;
  const accounts = await this.web3.eth.getAccounts();
  console.log("account 0 and 1",accounts[0], accounts[1]);
  let buybatteryobject = await this.contractinstance.methods.buyandpaybattery(batteryid).send({from:accounts[0], gas:3000000, value: batteryprice})
  console.log("buy engine object is", buybatteryobject);
  alert("The battery with " + batteryid + "has been bought by account " + accounts[0]);
  // console.log("buy engine object is", buyengineobject);
}

deliverengine = async() => {
  const {engineid} = this.state.engine;
  const accounts = await this.web3.eth.getAccounts();
  let deliverengineobject = await this.contractinstance.methods.enginedeliveredbymanufacturer(engineid).send({from:accounts[0], gas:3000000})
  console.log("deleiver engine object is", deliverengineobject);
  alert("The engine is out for delivery from address " + accounts[0]);
}

deliverbattery = async() => {
  const {batteryid} = this.state.battery;
  const accounts = await this.web3.eth.getAccounts();
  let deliverbatteryobject = await this.contractinstance.methods.batterydeliveredbymanufacturer(batteryid).send({from:accounts[0], gas:3000000})
  console.log("deleiver battery object is", deliverbatteryobject);
  alert("The battery is out for delivery from address " + accounts[0]);
}

receiveengine = async() => {
  const {engineid} = this.state.engine;
  const accounts = await this.web3.eth.getAccounts();
  let receiveengineobject = await this.contractinstance.methods.itemreceived(engineid).send({from:accounts[0], gas:3000000})
  console.log("receive engine object is", receiveengineobject);
  alert("The engine is received by " + accounts[0]);
}

receivebattery = async() => {
  const {batteryid} = this.state.battery;
  const accounts = await this.web3.eth.getAccounts();
  let receivebatteryobject = await this.contractinstance.methods.batteryreceived(batteryid).send({from:accounts[0], gas:3000000})
  console.log("receive battery object is", receivebatteryobject);
  console.log("accoutns", accounts[0]);
  alert("The battery is received by "+ accounts[0]);
}

engineowners = async() => {
  const {engineid} = this.state.engine;
  console.log("hello");
  const owners = await this.contractinstance.methods.itemownersdetails(engineid).call().then(result => {console.log(result);
  return result;
});
  console.log(owners);
  this.setState({engineownerhistory: owners});
  
  // alert("Call successful");
}

batteryowners = async() => {
  const {batteryid} = this.state.battery;
  console.log("hello");
  const owners = await this.contractinstance.methods.batteryownersdetails(batteryid).call().then(result => {console.log(result);
  return result;
});
  console.log(owners);
  this.setState({batteryownerhistory: owners});
  
  // alert("Call successful");
}

registercar = async() => {
  const {carname, carmodel, carprice, carid} = this.state.car;
  const {batteryid} = this.state.battery;
  const {engineid} = this.state.engine;
  const accounts = await this.web3.eth.getAccounts();
  console.log(accounts[0]);
  var balance = this.web3.eth.getBalance(accounts[0]);
  console.log("balance is", balance);
  console.log(this.contractinstance.methods.registercar(carname, carmodel, carprice, carid, engineid, batteryid));
  let carobject = await this.contractinstance.methods.registercar(carname, carmodel, carprice, carid, engineid, batteryid).send({from:accounts[0], gas:3000000});
  console.log("engine object is", carobject);
  // document.getElementById("enginecreated").innerHTML(engineobject.events.statusevent.returnValues.itemname);
  alert("The car with car id: " + carid + "has been registered with the engineid: " + engineid + "and battery id: " + batteryid);
}

buycar = async() => {
  const {carid, carprice} = this.state.car;
  const accounts = await this.web3.eth.getAccounts();
  let buycarobject = await this.contractinstance.methods.buyandpaycar(carid).send({from:accounts[0], gas:3000000, value: carprice})
  console.log("buy engine object is", buycarobject);
  alert("The car with carid: " + carid +"has been purchased by " + accounts[0]);
  // console.log("buy engine object is", buyengineobject);
}

carowners = async() => {
  const {carid} = this.state.car;
  console.log("hello");
  const owners = await this.contractinstance.methods.carownershistory(carid).call({gas:3000000}).then(result => {console.log(result);
  return result;
});
  console.log(owners);
  this.setState({carownerhistory: owners});
  
  // alert("Call successful");
}

//   contract.functionName.sendTransaction(parameter_1,parameter_2,parameter_n,{{from:web3.eth.accounts[X], value:xyz}},function (error, result){   if(!error){
//     console.log(result);
// } else{
//     console.log(error);
// }
// });

  // runExample = async () => {
  //   const { accounts, contract } = this.state;
  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    // console.log(this.state)
    if (!this.state.gotaccounts) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <BrowserRouter>

          <Route exact path='/' render={(props) => <Navbar />} />
          {/* <Route exact path='/navbar' render={(props) => <Role />}/> */}
          <Route path='/businessnavbar' render={(props) => <BusinessNavbar />} />
          <Route path='/usernavbar' render={(props) => <UserNavbar />} />
          {/* <Route exact path='/' render={(props) => <Manufacture manufactureengine = {this.manufactureengine} manufacturebattery = {this.manufacturebattery} typinginput={this.typinginput} engine={this.state.engine} battery={this.state.battery}/>}/> */}
          <Route path='/businessnavbar/manufacture' render={(props) => <Manufacture manufactureengine = {this.manufactureengine} engineobject={this.engineobject} manufacturebattery = {this.manufacturebattery} typinginput={this.typinginput} engine={this.state.engine} battery={this.state.battery}/>}/>
          <Route path='/businessnavbar/deliver' render={(props) => <Deliver deliverengine = {this.deliverengine} deliverbattery={this.deliverbattery} typinginput= {this.typinginput} engine={this.state.engine} battery={this.state.battery}/> }/>
          <Route path='/businessnavbar/mapping' render={(props) => <Mapping buyengine={this.buyengine} buybattery={this.buybattery} registercar={this.registercar} typinginput={this.typinginput} car={this.state.car} engine={this.state.engine} battery={this.state.battery}/> }/>
          <Route path='/usernavbar/buycar'  render={(props) => <BuyCar buycar={this.buycar} typinginput={this.typinginput} car={this.state.car} /> } />
          <Route path='/businessnavbar/receive' render={(props) => <Receive receiveengine = {this.receiveengine} receivebattery={this.receivebattery} typinginput= {this.typinginput} engine={this.state.engine} battery={this.state.battery}/>}/>
          <Route path='/businessnavbar/carhistory' render={(props) => <CarHistory batteryowners={this.batteryowners} engineowners={this.engineowners} carowners={this.carowners} typinginput={this.typinginput} car={this.state.car} engine={this.state.engine} battery={this.state.battery} engineownerhistory={this.state.engineownerhistory} batteryownerhistory={this.state.batteryownerhistory} carownerhistory={this.state.carownerhistory} />}/>
          <Route path='/usernavbar/carhistory' render={(props) => <CarHistory batteryowners={this.batteryowners} engineowners={this.engineowners} carowners={this.carowners} typinginput={this.typinginput} car={this.state.car} engine={this.state.engine} battery={this.state.battery} engineownerhistory={this.state.engineownerhistory} batteryownerhistory={this.state.batteryownerhistory} carownerhistory={this.state.carownerhistory} />}/> 
  
      </BrowserRouter>         
    );
  }
}

export default App;
