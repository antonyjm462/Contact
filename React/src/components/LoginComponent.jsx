import React, { Component } from 'react';
import bkimg from '../assets/login2.svg';
import ContactService from '../services/ContactService';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from 'react-redux';

class Login extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    state = {
        person: {
            userName: "",
            password: ""
        },
        users: [],
        notAuth: false
    }

    onChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        let person = this.state.person;
        person[id] = value;
        this.setState({ ...this.state, person: person });
    }

    componentDidMount() {
        ContactService.getUsers()
            .then(res => res.json())
            .then((data) => {
                this.setState({ ...this.state, users: data });
            }).catch(err => console.log('Request Failed', err));
    }

    auth = (user) => {
        if (user.userName == this.state.person.userName && user.passsword == this.state.person.password) {
            return true;
        }
        return false;
    }

    login = (e) => {
        e.preventDefault();
        const user = this.state.users.filter(this.auth);
        if (user.length != 0) {
            this.props.onLogin(user[0]);
            this.props.history.push('/contact');
        } else {
            this.setState({ ...this.state, notAuth: true });
        }
    }

    render() {
        return (
            <div className="App-body">
                <div className="row">
                    <div className="col-8">
                        <form className="row needs-validation" noValidate>
                            <div className="col-12">
                                <div className="mb-3 p-2">
                                    <label htmlFor="userName" className="form-label">User Name</label>
                                    <input type="text" className="form-control" id="userName" placeholder="@username" onChange={(e) => this.onChange(e)} ></input>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3 p-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="password" onChange={(e) => this.onChange(e)} ></input>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="mb-3 p-2">
                                    <button className="btn btn-primary btn-small" onClick={(e) => { this.login(e) }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                        {this.state.notAuth && <span className="badge bg-danger">username or password is wrong, please try again</span>}
                    </div>
                    <div className="col-4">
                        <img src={bkimg} alt="background" style={{ height: 400, width: 400 }} />
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

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (user) => dispatch({ type: "LOGIN", val: user }),
        onLogout: () => dispatch({ type: "LOGOUT" })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));