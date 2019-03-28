import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditCar  extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, model: '', brand: '', color: '', fuel: '', year: '', price: ''};
    }

    handleClickOpen = () => {
        this.setState({ 
            open: true ,
            brand: this.props.car.brand,
            model: this.props.car.model,
            color: this.props.car.color,
            fuel: this.props.car.fuel,
            year: this.props.car.year,
            price: this.props.car.price
        });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    updateCar = () => {
        const newCar = {
            model: this.state.model,
            brand: this.state.brand,
            color: this.state.color,
            fuel: this.state.fuel,
            year: this.state.year,
            price: this.state.price
        }
        this.props.updateCar(this.props.link, newCar);
        this.handleClose();
    }
    
    render() {
        return(
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
                    <DialogContent>
                        <TextField onChange={this.handleChange} autoFocus margin="dense" value={this.state.brand} name="brand" label="Brand" fullWidth />
                        <TextField onChange={this.handleChange} margin="dense" value={this.state.model} name="model" label="Model" fullWidth />
                        <TextField onChange={this.handleChange} margin="dense" value={this.state.color} name="color" label="Color" fullWidth />
                        <TextField onChange={this.handleChange} margin="dense" value={this.state.fuel} name="fuel" label="Fuel" fullWidth />
                        <TextField onChange={this.handleChange} margin="dense" value={this.state.year} name="year" label="Year" fullWidth />
                        <TextField onChange={this.handleChange} margin="dense" value={this.state.price} name="price" label="Price" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.updateCar} color="primary">
                        Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button color="primary" onClick={this.handleClickOpen}>EDIT</Button>
            </div>
        );

    }
}

export default EditCar;