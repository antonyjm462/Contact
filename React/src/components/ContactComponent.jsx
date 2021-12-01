import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import male from '../assets/male.png';
import female from '../assets/female.png';
import male1 from '../assets/male1.png';
import female1 from '../assets/female2.png';
import { withRouter } from "react-router";

class Contact extends Component {
    constructor(props) {
        super(props)
    }

    editContact(id) {
        this.props.history.push(`/add/${id}`);
    }

    render() {
        return (
            <div className="row mb-2">
                <div className="col-2 d-flex justify-content-center">
                    <img src={this.props.contact.img} className="profile-pic" alt="profile photo"></img>
                </div>
                <div className="col-8 d-flex justify-content-center" >
                    <p className="person-info" onClick={() => this.props.onClick(this.props.contact)}>
                        {this.props.contact.firstName} {this.props.contact.lastName}
                    </p>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <IconButton aria-label="delete" onClick={() => this.props.onDelete(this.props.contact.id)}>
                        <DeleteIcon className="icon-design" />
                    </IconButton>
                    <IconButton aria-label="update" onClick={() => this.editContact(this.props.contact.id)}>
                        <EditIcon className="icon-design" />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default withRouter(Contact);