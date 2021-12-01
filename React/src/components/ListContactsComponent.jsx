import React, { Component } from 'react';
import Contact from './ContactComponent';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ContactService from '../services/ContactService';
import ViewContact from './ViewContactComponent';
import Navbar from './NavbarComponent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import male from '../assets/male.png';
import female from '../assets/female.png';
import male1 from '../assets/male1.png';
import female1 from '../assets/female2.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

class ListContacts extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    state = {
        contacts: [],
        person: {},
        search: "",
        img: [
            male, female, male1, female1
        ]
    }

    componentDidMount() {
        this.checkUser();
        ContactService.getContacts()
            .then(res => res.json())
            .then((data) => {
                let personData = data.map((person) => {
                    person.img = this.getIcon()
                    return person;
                });
                this.setState({ ...this.state, contacts: personData, person: personData[0] });
            }).catch(err => console.log('Request Failed', err));
    }

    checkUser = () => {
        if (!this.props.isLoggedIn) {
            console.log("redux user", this.props.user);
            this.props.history.push('/');
        }
    }


    addContact = () => {
        this.props.history.push("/add/_new");
    }

    handleClick = (contact) => {
        this.setState({ ...this.state, person: contact })
    }

    onChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        let state = { ...this.state }
        state[id] = value
        this.setState(state);
    }

    deleteContact = (id) => {
        console.log("delete", id);
        ContactService.deleteContact(id)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                let { contacts } = this.state;
                contacts = contacts.filter(contacts => contacts.id !== id);
                this.setState({ ...this.state, contacts: contacts });
            })
            .catch(err => console.log(err));
    }

    getIcon = () => {
        const randomElement = this.state.img[Math.floor(Math.random() * this.state.img.length)];
        return randomElement;
    }

    logout = () => {
        this.props.onLogout();
        this.props.history.push('/');
    }

    render() {
        return (
            <React.Fragment>
                <Navbar user={this.props.user} onLogout={this.logout} />
                <div className="container">
                    <div className="row d-flex-justify-content-center app-content">
                        <div className="col-5 contact-view">
                            {this.state.person !== {} ? <ViewContact contact={this.state.person} /> : <CircularProgress color="secondary" />}
                        </div>
                        <div className="col-2">
                            <div className="vl"></div>
                        </div>
                        <div className="col-5 contact-view">
                            <div className="row mb-3">
                                <input type="text" className="form-control" id="search" placeholder="Search Contact" onChange={(e) => this.onChange(e)}></input>
                            </div>
                            <div className="row">
                                {this.state.contacts.length != 0 ? this.ListContact() : <CircularProgress color="secondary" />}
                            </div>
                        </div>
                    </div>
                    <Fab color="secondary" aria-label="add" onClick={this.addContact} className="fab-container">
                        <AddIcon />
                    </Fab>
                </div>
            </React.Fragment>
        );
    }

    ListContact() {
        return this.state.contacts.map((contact) => {
            let name = contact.firstName + contact.lastName;
            if (name.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1) {
                return <Contact key={contact.id} contact={contact} onClick={this.handleClick} onDelete={this.deleteContact} />;
            } else {
                return null;
            }
        });
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        user: state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (user) => dispatch({ type: "LOGIN", val: user }),
        onLogout: () => dispatch({ type: "LOGOUT" })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListContacts));