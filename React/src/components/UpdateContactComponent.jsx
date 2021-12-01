import React, { Component } from 'react';
import ViewData from './ViewDataComponent';
import Form from './FormComponent';
import ContactService from '../services/ContactService';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from 'react-redux';

class UpdateContact extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
        }
    }

    checkUser = () => {
        if (!this.props.isLoggedIn) {
            console.log("redux user", this.props.user);
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.checkUser();
        if (this.state.id === '_new') {
            return
        } else {
            console.log(this.state.id)
            ContactService.getContactById(this.state.id)
                .then(res => res.json())
                .then((data) => {
                    this.setState(data);
                    console.log(this.state);
                })
                .catch(err => console.log('Request Failed', err));
        }
    }

    handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        let state = { ...this.state }
        state[id] = value
        this.setState(state);
    }

    handleClick = (e) => {
        //save or update
        e.preventDefault();
        let contact = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        }
        console.log('contact => ' + JSON.stringify(contact));
        if (this.state.id === '_new') {
            ContactService.createContact(contact)
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    this.props.history.push('/contact');
                })
                .catch(err => console.log('Request Failed', err));
        } else {
            ContactService.updateContact(contact, this.state.id)
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    this.props.history.push('/contact');
                })
                .catch(err => console.log('Request Failed', err));
        }
    }

    cancel = () => {
        this.props.history.push('/contact');
    }

    render() {
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: 700, width: 900 }}>
                <div className="row">
                    <div className="col-4">
                        <ViewData person={this.state} />
                    </div>
                    <div className="col-8">
                        <Form onChange={this.handleChange} onClick={this.handleClick} person={this.state} onCancel={this.cancel} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        user: state.user
    };
}

export default connect(mapStateToProps)(withRouter(UpdateContact));