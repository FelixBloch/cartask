import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import EditCar from './EditCar';
import AddCar from './AddCar';import Snackbar from '@material-ui/core/Snackbar';


class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {cars: [], open: false, message: ''};
    }

    // Fetch cars
    componentDidMount (){
        this.loadCars();
    }

    loadCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(jsondata => this.setState({cars: jsondata._embedded.cars}))
        .catch(err => console.error(err));
    }
    
    // Delete car
    deleteCar = (carLink) => {
        if (window.confirm("Are you sure?")) {
            fetch(carLink, {method: 'DELETE'})
            .then(res => this.loadCars())
            .then(res => this.setState({open: true, message: 'Car deleted'}))
            .catch(err => console.error(err))
        }
    };

    saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => this.loadCars())
        .then(res => this.setState({open: true, message: 'New car added'}))
        .catch(err => console.error(err));
    }

    updateCar = (link, updatedCar) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCar)
        })
        .then(res => this.loadCars())
        .then(res => this.setState({open: true, message: 'Car updated'}))
        .catch(err => console.error(err));
    }

    handleClose = () => {
        this.setState({open: false})
    }
    
    render() {
        const columns = [
            {
                Header: "Brands",
                accessor: "brand"
            },{
                Header: "Models",
                accessor: "model"
            },{
                Header: "Years",
                accessor: "year"
            },{
                Header: "Price",
                accessor: "price"
            },{
                Header: "Color",
                accessor: "color"
            },{
                Header: "Fuel",
                accessor: "fuel"
            },{
                Header: "",
                filterable: false,
                sortable: false,
                width: 100,
                accessor: "_links.self.href",
                Cell: ({value, row}) => (
                    <EditCar updateCar={this.updateCar} link={value} car={row} />
                )
            },{
                Header: "",
                filterable: false,
                sortable: false,
                width: 100,
                accessor: "_links.self.href",
                Cell: ({value}) => (
                    <Button color="secondary" onClick={() => this.deleteCar(value)}>Delete</Button>
                )
            }]        
        return (
            <div>
                <AddCar saveCar={this.saveCar} />
                <ReactTable data={this.state.cars} columns={columns} filterable={true} />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={this.state.message}
                />
            </div>
        );
    }
}

export default CarList;