import React, { Component } from "react";
import ItemAuthenticityContract from "./contracts/ItemAuthenticity.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {gotaccounts: false, enginename: "Engine 1", engineprice: 10, enginequantity: 1,engineid: 0, batteryname: "Battery 1", batteryprice: 10, batteryquantity: 1,batteryid: 0, engineownerhistory: [], carname: "Tesla", carmodel: "M",carprice: 400, carid: 0};

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
    const name = target.name;
    this.setState({
      [name]:value 
    })
    console.log("Handle input change called.")
  }

  manufactureengine= async() => {
    const {enginename,engineprice, enginequantity,engineid} = this.state;
    const accounts = await this.web3.eth.getAccounts();
    console.log(accounts[0]);
    var balance = this.web3.eth.getBalance(accounts[0]);
    console.log("balance is", balance);
    console.log(this.contractinstance.methods.itemcreation(enginename,engineprice,enginequantity, engineid));
    let engineobject = await this.contractinstance.methods.itemcreation(enginename, engineprice, enginequantity,engineid).send({from:accounts[0], gas:3000000});
    console.log("engine object is", engineobject);
    // document.getElementById("enginecreated").innerHTML(engineobject.events.statusevent.returnValues.itemname);
    alert("send" + engineprice + "wei");
  }

  manufacturebattery= async() => {
    const {batteryname,batteryprice, batteryquantity,batteryid} = this.state;
    const accounts = await this.web3.eth.getAccounts();
    console.log("account 0 and 1",accounts[0], accounts[1]);
    var balance = this.web3.eth.getBalance(accounts[0]);
    console.log("balance is", balance);
    console.log(this.contractinstance.methods.batterycreation(batteryname,batteryprice,batteryquantity, batteryid));
    let batteryobject = await this.contractinstance.methods.batterycreation(batteryname, batteryprice, batteryquantity,batteryid).send({from:accounts[0], gas:3000000});
    console.log("battery object is", batteryobject);
    // document.getElementById("enginecreated").innerHTML(engineobject.events.statusevent.returnValues.itemname);
    alert("send" + batteryprice + "wei to" + accounts[0] );
  }
  
  buyengine = async() => {
    const {engineid, engineprice} = this.state;
    const accounts = await this.web3.eth.getAccounts();
    let buyengineobject = await this.contractinstance.methods.buyandpayitem(engineid).send({from:accounts[0], gas:3000000, value: engineprice})
    console.log("buy engine object is", buyengineobject);
    alert("Thanks for the payment!");
    // console.log("buy engine object is", buyengineobject);
}

buybattery = async() => {
  const {batteryid, batteryprice} = this.state;
  const accounts = await this.web3.eth.getAccounts();
  console.log("account 0 and 1",accounts[0], accounts[1]);
  let buybatteryobject = await this.contractinstance.methods.buyandpaybattery(batteryid).send({from:accounts[0], gas:3000000, value: batteryprice})
  console.log("buy engine object is", buybatteryobject);
  alert("Thanks for the payment!");
  // console.log("buy engine object is", buyengineobject);
}

deliverengine = async() => {
  const {engineid} = this.state;
  const accounts = await this.web3.eth.getAccounts();
  let deliverengineobject = await this.contractinstance.methods.enginedeliveredbymanufacturer(engineid).send({from:accounts[0], gas:3000000})
  console.log("deleiver engine object is", deliverengineobject);
  alert("The engine is out for delivery");
}

deliverbattery = async() => {
  const {batteryid} = this.state;
  const accounts = await this.web3.eth.getAccounts();
  let deliverbatteryobject = await this.contractinstance.methods.batterydeliveredbymanufacturer(batteryid).send({from:accounts[0], gas:3000000})
  console.log("deleiver battery object is", deliverbatteryobject);
  alert("The battery is out for delivery");
}

receiveengine = async() => {
  const {engineid} = this.state;
  const accounts = await this.web3.eth.getAccounts();
  let receiveengineobject = await this.contractinstance.methods.itemreceived(engineid).send({from:accounts[0], gas:3000000})
  console.log("receive engine object is", receiveengineobject);
  alert("The engine is received by" + accounts[0]);
}

receivebattery = async() => {
  const {batteryid} = this.state;
  const accounts = await this.web3.eth.getAccounts();
  let receivebatteryobject = await this.contractinstance.methods.batteryreceived(batteryid).send({from:accounts[0], gas:3000000})
  console.log("receive battery object is", receivebatteryobject);
  console.log("accoutns", accounts[0]);
  alert("The battery is received by"+ accounts[0]);
}

engineowners = async() => {
  const {engineid} = this.state;
  console.log("hello");
  const owners = await this.contractinstance.methods.itemownersdetails(engineid).call().then(result => {console.log(result);
  return result;
});
  console.log(owners);
  this.setState({engineownerhistory: owners});
  
  // alert("Call successful");
}

batteryowners = async() => {
  const {batteryid} = this.state;
  console.log("hello");
  const owners = await this.contractinstance.methods.batteryownersdetails(batteryid).call().then(result => {console.log(result);
  return result;
});
  console.log(owners);
  this.setState({batteryownerhistory: owners});
  
  // alert("Call successful");
}

registercar = async() => {
  const {carname, carmodel, carprice, carid, engineid, batteryid} = this.state;
  const accounts = await this.web3.eth.getAccounts();
  console.log(accounts[0]);
  var balance = this.web3.eth.getBalance(accounts[0]);
  console.log("balance is", balance);
  console.log(this.contractinstance.methods.registercar(carname, carmodel, carprice, carid, engineid, batteryid));
  let carobject = await this.contractinstance.methods.registercar(carname, carmodel, carprice, carid, engineid, batteryid).send({from:accounts[0], gas:3000000});
  console.log("engine object is", carobject);
  // document.getElementById("enginecreated").innerHTML(engineobject.events.statusevent.returnValues.itemname);
  alert("send" + carprice + "wei");
}

buycar = async() => {
  const {carid, carprice} = this.state;
  const accounts = await this.web3.eth.getAccounts();
  let buycarobject = await this.contractinstance.methods.buyandpaycar(carid).send({from:accounts[0], gas:3000000, value: carprice})
  console.log("buy engine object is", buycarobject);
  alert("Thanks for the payment!");
  // console.log("buy engine object is", buyengineobject);
}

carowners = async() => {
  const {carid} = this.state;
  console.log("hello");
  const owners = await this.contractinstance.methods.carownershistory(carid).call().then(result => {console.log(result);
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
    if (!this.state.gotaccounts) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Car parts verification and tracing Project CMPE 295B</h1>
        <ul><h2>Manufacturer Dashboard</h2></ul>
        <strong><h3>Create Engine</h3></strong>
        Engine Name : <input type="text" name="enginename" value={this.state.enginename} onChange={this.typinginput} />
        Engine Price (Wei) : <input type="text" name="engineprice" value={this.state.engineprice} onChange={this.typinginput} />
        Engine Quantity: <input type="text" name="enginequantity" value={this.state.enginequantity} onChange={this.typinginput} />
        Engine id: <input type="text" name="engineid" value={this.state.engineid} onChange={this.typinginput} />
        <button type="button" onClick ={this.manufactureengine}>Manufacture Engine</button>

        <strong><h3>Deliver Engine</h3></strong>
        Engine id: <input type="text" name="engineid" value={this.state.engineid} onChange={this.typinginput} />
        <button type="button" onClick ={this.deliverengine}>Deliver Engine</button>

        <strong><h3>Create Battery</h3></strong>
        Battery Name : <input type="text" name="batteryname" value={this.state.batteryname} onChange={this.typinginput} />
        Battery Price (Wei) : <input type="text" name="batteryprice" value={this.state.batteryprice} onChange={this.typinginput} />
        Battery Quantity: <input type="text" name="batteryquantity" value={this.state.batteryquantity} onChange={this.typinginput} />
        Battery id: <input type="text" name="batteryid" value={this.state.batteryid} onChange={this.typinginput} />
        <button type="button" onClick ={this.manufacturebattery}>Manufacture Battery</button>

        <strong><h3>Deliver Battery</h3></strong>
        Battery id: <input type="text" name="batteryid" value={this.state.batteryid} onChange={this.typinginput} />
        <button type="button" onClick ={this.deliverbattery}>Deliver Battery</button>

        <br></br>

        <ul><h2>Assembler Dashboard</h2></ul>
        <strong><h3>Buy Engine</h3></strong>
        Enter Engine Id: <input type="text" name="engineid" value={this.state.engineid} onChange={this.typinginput} />
        Enter price in wei: <input type="text" name="engineprice" value={this.state.engineprice} onChange={this.typinginput} />
        <button type="button" onClick ={this.buyengine}>Buy Engine</button>

        <strong><h3>Received Engine</h3></strong>
        Engine id: <input type="text" name="engineid" value={this.state.engineid} onChange={this.typinginput} />
        <button type="button" onClick ={this.receiveengine}>Received Engine</button>

        <strong><h3>Buy Battery</h3></strong>
        Enter Battery Id: <input type="text" name="batteryid" value={this.state.batteryid} onChange={this.typinginput} />
        Enter price in wei: <input type="text" name="batteryprice" value={this.state.batteryprice} onChange={this.typinginput} />
        <button type="button" onClick ={this.buybattery}>Buy Battery</button>

        <strong><h3>Received Battery</h3></strong>
        Battery id: <input type="text" name="batteryid" value={this.state.batteryid} onChange={this.typinginput} />
        <button type="button" onClick ={this.receivebattery}>Received Battery</button>

        <ul><h2>Engine and battery mapping with Car</h2></ul>
        <strong><h3>Register Car</h3></strong>
        car Name : <input type="text" name="carname" value={this.state.carname} onChange={this.typinginput} />
        Car Model : <input type="text" name="carmodel" value={this.state.carmodel} onChange={this.typinginput} />
        Car Price (Wei) : <input type="text" name="carprice" value={this.state.carprice} onChange={this.typinginput} />
        Car id: <input type="text" name="carid" value={this.state.carid} onChange={this.typinginput} />
        Engine id to install: <input type="text" name="engineid" value={this.state.engineid} onChange={this.typinginput} />
        Battery id to install: <input type="text" name="batteryid" value={this.state.batteryid} onChange={this.typinginput} />
        <button type="button" onClick ={this.registercar}>Register Car</button>

        <strong><h3>Buy Car</h3></strong>
        Enter Car Id: <input type="text" name="carid" value={this.state.carid} onChange={this.typinginput} />
        Enter price in wei: <input type="text" name="carprice" value={this.state.carprice} onChange={this.typinginput} />
        <button type="button" onClick ={this.buycar}>Buy Car</button>



        


        <ul><h2>Owner History Look up</h2></ul>
        <strong><h3>Car owners history</h3></strong>
        Enter Car Id: <input type="text" name="carid" value={this.state.carid} onChange={this.typinginput} />
        <button type="button" onClick ={this.carowners}>Get Car Owners history</button>
        All of the Car owners are {this.state.carownerhistory ? this.state.carownerhistory.map(eachOwner => {
          return(<div><li>{eachOwner}</li></div>)
        }):null};
        <strong><h3>Engine owners history</h3></strong>
        Enter Engine Id: <input type="text" name="engineid" value={this.state.engineid} onChange={this.typinginput} />
        <button type="button" onClick ={this.engineowners}>Get Engine Owners history</button>
        All of the engine owners are {this.state.engineownerhistory ? this.state.engineownerhistory.map(eachOwner => {
          return(<div><li>{eachOwner}</li></div>)
        }):null};

        <strong><h3>Battery owners history</h3></strong>
        Enter Battery Id: <input type="text" name="batteryid" value={this.state.batteryid} onChange={this.typinginput} />
        <button type="button" onClick ={this.batteryowners}>Get Battery Owners history</button>
        All of the battery owners are {this.state.batteryownerhistory ? this.state.batteryownerhistory.map(eachOwner => {
          return(<div><li>{eachOwner}</li></div>)
        }):null};

      </div>
    );
  }
}

export default App;
