import React, { Component } from 'react';
import { Bar, Line, Pie, Radar, Doughnut, Polar, HorizontalBar } from 'react-chartjs-2';
import { faGreaterThanEqual } from '@fortawesome/free-solid-svg-icons';
import './dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CarDetailsApi: {
                labels: [],
                datasets: [
                    {
                        label: 'Car Details',
                        data: [

                        ],
                        backgroundColor: [
                            'rgba(255,99,132,0.6)',
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,159,64,0.6)',
                            'rgba(255,99,132,0.6)'
                        ]

                    }
                ]
            },
            MilesApi: {
                labels: [],
                datasets: [
                    {
                        label: 'Miles usage since last service',
                        data: [

                        ],
                        backgroundColor: [
                            'rgba(255,99,132,0.6)',
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,159,64,0.6)',
                            'rgba(255,99,132,0.6)',
                            'rgba(155,90,102,0.6)',
                            'rgba(180,77,122,0.6)',
                            'rgba(255,69,112,0.6)',
                            'rgba(255,59,100,0.6)'
                        ]

                    }
                ]
            },
            DaysApi: {
                labels: [],
                datasets: [
                    {
                        label: 'Days since last service',
                        data: [

                        ],
                        backgroundColor: [
                            'rgba(255,99,132,0.6)',
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,159,64,0.6)',
                            'rgba(255,99,132,0.6)',
                            'rgba(155,90,102,0.6)',
                            'rgba(180,77,122,0.6)',
                            'rgba(255,69,112,0.6)',
                            'rgba(255,59,100,0.6)'
                        ]

                    }
                ]
            },
            show: false, message: ""

        }
        this.retrivepartsinfo = this.retrivepartsinfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
    }
    handleChange(num) {
        this.setState({
            Vin: num.target.value
        });
    }
    retrivepartsinfo(val) {
        fetch('/calculatecarhealth', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ id: this.state.Vin })
        })
            .then(resp => {
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.status < 500) {
                        return resp.json().then(data => {
                            let err = { errorMessage: data.message }
                            throw err;
                        })
                    } else {
                        let err = { errorMessage: 'Server errror!' };
                        throw err;
                    }
                }
                return resp.json();
            })
            .then(receivedobject => {
                if (receivedobject.message) {
                    this.setState({ message: receivedobject.message, show: false });
                } else {
                    // this.setState({partsneedservice: [], partsdontneedservice: []})
                    const updatedCarDetailsApi = { ...this.state.CarDetailsApi }
                    updatedCarDetailsApi.labels = receivedobject.singleData.carDetailsLabels
                    updatedCarDetailsApi.datasets[0].data = receivedobject.singleData.CarDetailsValues
                    const updatedMilesApi = { ...this.state.MilesApi }
                    updatedMilesApi.labels = receivedobject.singleData.MilesLabels
                    updatedMilesApi.datasets[0].data = receivedobject.singleData.MilesValues
                    const updatedDaysApi = { ...this.state.DaysApi }
                    updatedDaysApi.labels = receivedobject.singleData.DaysLabels
                    updatedDaysApi.datasets[0].data = receivedobject.singleData.DaysValues
                    this.setState({ CarDetailsApi: updatedCarDetailsApi, MilesApi: updatedMilesApi, DaysApi: updatedDaysApi, show: true })

                    // this.setState({carDetails: receivedobject.carDetails, show: true}) 
                }
            })
    }
    clear() {
        this.setState({ show: false, message: "" })
    }
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
    }
    render() {
        const displaymessage = this.state.message;
        return (
            <div>
                Enter Car VIN: <input type="text" id="id" value={this.state.Vin} onChange={this.handleChange} />
                <button onClick={this.retrivepartsinfo}>Show Analytics</button>
                {/* <button onClick={this.clear}>Clear</button> */}
                {this.state.message == "" ? (<div class="flex-container1">

                    <div className="MilesGraph">

                        <Pie
                            data={this.state.MilesApi}
                            options={{
                                title: {
                                    display: this.props.displayTitle,
                                    text: 'Miles Usage Since Last Service',
                                    fontSize: 20
                                },
                                legend: {
                                    display: this.props.displayLegend,
                                    position: this.props.legendPosition
                                },
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                    <div className="DaysGraph">
                        <HorizontalBar
                            data={this.state.DaysApi}
                            options={{
                                title: {
                                    display: this.props.displayTitle,
                                    text: 'Days Since Last service',
                                    fontSize: 20
                                },
                                legend: {
                                    display: this.props.displayLegend,
                                    position: this.props.legendPosition
                                },
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    </div>

                    <div className="CarDetailsGraph">
                        <Radar
                            data={this.state.CarDetailsApi}
                            options={{
                                title: {
                                    display: this.props.displayTitle,
                                    text: 'Car Details',
                                    fontSize: 20
                                },
                                legend: {
                                    display: this.props.displayLegend,
                                    position: this.props.legendPosition
                                },
                                layout: {
                                    padding: {
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                ) : (<div>
                    <br>
                    </br>
                    <h3 style={{ color: "chartreuse" }}>{displaymessage}</h3>
                </div>)}

            </div>
        );
    }
}

export default Dashboard;