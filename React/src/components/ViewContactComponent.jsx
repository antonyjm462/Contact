import React, { Component } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import male from '../assets/male.png';
import female from '../assets/female.png';
import male1 from '../assets/male1.png';
import female1 from '../assets/female2.png';

class ViewContact extends Component {
    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-center">
                        <img src={this.props.contact.img} className="person-img" />
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <p className="person-name"> {this.props.contact.firstName} {this.props.contact.lastName}</p>
                    </div>
                    <div className="col-2">
                        <EmailIcon className="icon-design" />
                    </div>
                    <div className="col-10">
                        <div className="person-info"> {this.props.contact.email}</div>
                    </div>
                    <div className="col-2">
                        <PhoneIcon className="icon-design" />
                    </div>
                    <div className="col-10">
                        <div className="person-info"> {this.props.contact.phoneNumber}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewContact;