import React, { Component } from 'react';

class Form extends Component {
    state = {
        submitted: false,
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.props.person.phoneNumber != "" || this.props.person.email != "") {
            this.props.onClick(e);
        }
    }

    render() {
        return (
            <form className="row needs-validation" noValidate>
                <div className="col-6">
                    <div className="mb-3 p-2">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Jhon" onChange={(e) => this.props.onChange(e)} required></input>
                        {this.props.person.firstName &&
                            <p className="card-text p-2">{this.props.person.firstName}</p>
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3 p-2">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Doe" onChange={(e) => this.props.onChange(e)} required></input>
                        {this.props.person.lastName &&
                            <p className="card-text p-2">{this.props.person.lastName}</p>
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3 p-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => this.props.onChange(e)} required></input>
                        {this.props.person.email &&
                            <p className="card-text p-2">{this.props.person.email}</p>
                        }
                        {this.state.submitted && this.props.person.email == "" && <span className="badge bg-danger"> Enter a Email </span>}
                    </div>
                </div>

                <div className="col-6">
                    <div className="mb-3 p-2">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" placeholder="XXXXXXXXXX" onChange={(e) => this.props.onChange(e)} required></input>
                        {this.props.person.phoneNumber &&
                            <p className="card-text p-2">{this.props.person.phoneNumber}</p>
                        }
                        {this.state.submitted && this.props.person.phoneNumber == "" && <span className="badge bg-danger"> Enter a Phone Number </span>}
                    </div>
                </div>

                <div className="col-4">
                    <div className="p-2">
                        <button className="btn btn-primary btn-small" onClick={(e) => { this.onSubmit(e) }}>
                            Submit
                        </button>
                        <button className="btn btn-primary btn-small ms-2" onClick={this.props.onCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;