import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Label from '../common/Label';
import CardHeader from '../common/CardHeader';
import Textbox from '../common/Textbox';
import Button from '../common/Button';

class ManageUsers extends Component {    
    state= {
        headerData : "Manage Users",
        FirstName : "",
        MiddleName  : "",
        LastName : "",
        PhoneNumber : "",
        EmailId : "",
        UserName : "",
        Password : "",
        ConfirmPassword : ""
    }

    phoneNumberChanged = (event)=>{
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({PhoneNumber : event.target.value});
        }
        else{
            toast("Only numbers are to be entered");
        }
    }

    submitHandler = (event) =>{
        event.preventDefault();    
    }
render(){
    return (
        <section className="content">
                <ToastContainer />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <CardHeader headerValue= {this.state.headerData} />
                                <form role="form">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <Label forValue="FirstName"
                                                           value="First Name" style="text-align:left;" />
                                                    <Textbox typeName="text"
                                                             classValue="form-control"
                                                             placeholderName="First Name"
                                                             value={this.state.FirstName}
                                                             changed = {(event) => {
                                                                this.setState({FirstName : event.target.value})}}
                                                            value={this.state.FirstName} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <Label forValue="MiddleName"
                                                           value="Middle Name" />
                                                    <Textbox typeName="text"
                                                             classValue="form-control"
                                                             placeholderName="Middle Name"
                                                             value={this.state.MiddleName}
                                                             changed = {(event) => {
                                                                this.setState({MiddleName: event.target.value})}} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <Label forValue="LastName"
                                                           value="Last Name" />
                                                    <Textbox typeName="text"
                                                             classValue="form-control"
                                                             placeholderName="Last Name"
                                                             value={this.state.LastName}
                                                             changed = {(event) => {
                                                                this.setState({LastName: event.target.value})}} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <Label forValue="PhoneNumber"
                                                           value="Phone Number" />
                                                    <Textbox typeName="text"
                                                             classValue="form-control"
                                                             placeholderName="Phone Number"
                                                             changed = {this.phoneNumberChanged}
                                                             value={this.state.PhoneNumber} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <Label forValue="EmailId"
                                                           value="Email Id" />
                                                    <Textbox typeName="text"
                                                             classValue="form-control"
                                                             placeholderName="Email Id"
                                                             changed = {(event) => {
                                                                this.setState({EmailId : event.target.value})}}
                                                             value={this.state.EmailId} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <Label forValue="UserName"
                                                           value="User Name" />
                                                    <Textbox typeName="text"
                                                             classValue="form-control"
                                                             placeholderName="User Name"
                                                             changed = {(event) => {
                                                                this.setState({UserName: event.target.value})}}
                                                             value={this.state.UserName} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <Label forValue="Password"
                                                           value="Password" />
                                                    <Textbox typeName="password"
                                                             classValue="form-control"
                                                             placeholderName="Password"
                                                             changed = {(event) => {
                                                                this.setState({Password: event.target.value})}}
                                                             value={this.state.Password} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <Label forValue="ConfirmPassword"
                                                           value="Confirm Password" />
                                                    <Textbox typeName="password"
                                                             classValue="form-control"
                                                             placeholderName="Confirm Password"
                                                             changed = {(event) => {
                                                                this.setState({ConfirmPassword : event.target.value})}}
                                                             value={this.state.ConfirmPassword} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Button typeName="submit"
                                                classValue="btn btn-primary"
                                                value="Submit"
                                                click={this.submitHandler} /> 
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}
}
export default ManageUsers;