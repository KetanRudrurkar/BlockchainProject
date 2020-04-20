import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Markup } from 'interweave';

class PartServiceServicePoint extends Component {
    constructor(props) {
        super(props);
        this.state = { Vin: 123, partsdontneedservice: [] ,show: false, message: ""}
        this.serviceparts = this.serviceparts.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
    }
    handleChange(num){
        this.setState({
            Vin: num.target.value
        });
    }
    serviceparts(val){
        fetch('/servicecompleted', {
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

                this.setState({partsdontneedservice: []})
                this.setState({partsdontneedservice:receivedobject.singleData.PartsThatDontNeedService, show: true})
                this.setState({carDetails: receivedobject.carDetails, show: true})
            }
        })
    }
    clear(){
        this.setState({show: false, message: ""})
    }
    render() { 
        let displayCarDetails = '<table class="table table-bordered table-striped">';
        const CarDetails = this.state.carDetails
        displayCarDetails+='<tr>';
        for (var key in CarDetails) {
            if (CarDetails.hasOwnProperty(key)) {
                displayCarDetails+= '<th>'+key+'</th>';
            }
        }
        displayCarDetails+='</tr><tbody><tr>';
        for (var key in CarDetails) {
            if (CarDetails.hasOwnProperty(key)) {
                displayCarDetails+= '<td>'+CarDetails[key]+'</td>';
            }
        }
        displayCarDetails+= '</tr></tbody></table>';

        const displayservicecompleted = this.state.partsdontneedservice.map((part) => (
                
            <Col md="3" sm="6">                            
                <h3>{part} <FontAwesomeIcon className="check" icon={faUserShield} /></h3>
              
            </Col>
               
));
        const displaymessage = this.state.message;
        return (
            <div>
            <input type="text"  id="id" value={this.state.Vin} onChange={this.handleChange}/>
            <button onClick={this.serviceparts}>Service this car</button>
            <button onClick={this.clear}>Clear</button>
            { this.state.show? (<div>
              <h3>Parts below are Manually checked, serviced and are healthy now!</h3>
            <br></br>        
            <Row style={{marginTop: '-1%', marginBottom: "34px"}}>
            {displayservicecompleted}
            </Row> 
            <h2>Car Details</h2>
                            <div style={{ margin: '15px 85px 31px 82px', fontFamily:'initial', fontSize:'14px',  overflowX: 'scroll', overflowY: 'hidden'}} >
                             <Markup content={displayCarDetails} /> 
                             </div>     
            </div>) :(
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
 
export default PartServiceServicePoint;
