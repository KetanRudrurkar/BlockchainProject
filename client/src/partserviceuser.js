import React, { Component } from 'react';
import UserServiceDisplay from './userservicedisplay';
// import { GiCrossMark } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class PartServiceUser extends Component {
    constructor(props) {
        super(props);
        this.state = { Vin: 123, partsneedservice: [], partsdontneedservice: [], show: false, message: "" }
        this.retrivepartsinfo = this.retrivepartsinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
    }
    handleChange(num){
        this.setState({
            Vin: num.target.value
        });
    }
    retrivepartsinfo(val){
        fetch('/calculatecarhealth', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({id: this.state.Vin})
        })
        .then(resp => {
            if(!resp.ok){
                if(resp.status >= 400 && resp.status <500){
                    return resp.json().then(data =>{
                        let err = {errorMessage : data.message}
                        throw err;
                    })
                } else{
                    let err = {errorMessage: 'Server errror!'};
                    throw err;
                }
            }
            return resp.json();
        })
        .then(receivedobject =>{
            if(receivedobject.message){
            this.setState({message: receivedobject.message, show: false});
            }else{

                this.setState({partsneedservice: [], partsdontneedservice: []})
                this.setState({partsneedservice: receivedobject.singleData.PartsThatNeedService, partsdontneedservice:receivedobject.singleData.PartsThatDontNeedService, show: true})
            }
        })
    }
    clear(){
        this.setState({show: false, message: ""})
    }
    render() {
        const displayuser = this.state.partsneedservice.map((part) => (
                
                    <Col md="3" sm="6">                            
                        <h3>{part} <FontAwesomeIcon className="cross" icon={faTimes} /></h3>
                      
                    </Col>
        )); 
        const displayservicenotneeded = this.state.partsdontneedservice.map((part) => (
                
            <Col md="3" sm="6">                            
                <h3>{part} <FontAwesomeIcon className="check" icon={faCheck} /></h3>
              
            </Col>
               
));
        const displaymessage = this.state.message;
        return (
            <div>
            <input type="text"  id="id" value={this.state.Vin} onChange={this.handleChange}/>
            <button onClick={this.retrivepartsinfo}>Search Vin</button>
            <button onClick={this.clear}>Clear</button>
            {this.state.show ? (
                
                <div>
                    {this.state.partsneedservice.length>0 ?(
                        <div>
                            <h2>Service is recommended for your car in the next 15 days.</h2>
                    <h3>Your car needs service for the following parts:</h3>
                    <Container>
            <br>
            </br>
            <Row>
            {displayuser}
            </Row>
            </Container>
            </div>
                    ) : null }
        
            {this.state.partsdontneedservice.length>0 ? (
            <div>
              <h3>Parts below are healthy and do not need service:</h3>
            <br></br>        
            <Row>
            {displayservicenotneeded}
            </Row>   
            </div>
           ) : null}
                    
            
                </div>
            ) : (
                <div>
                    <br>
                    </br>
                    <h3 style={{color: "chartreuse"}}>{displaymessage}</h3>
                </div>
            ) }
            
            
            </div>
          );
    }
}
 
export default PartServiceUser;