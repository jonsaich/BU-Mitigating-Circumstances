import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	Badge,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Container,
	Row,
	Col,
	Button, Form, FormGroup, Label, Input, FormText, Table
} from 'reactstrap';
import * as Helper from '../helper'


class Status extends Component {
	constructor(props) {
		super(props);
		var global = this;
		this.state = {
			status: '',
			updateMessage: '',
			id: '',
		};

		this.handleChangeStatus = this.handleChangeStatus.bind(this);
		this.handleChangeMessage = this.handleChangeMessage.bind(this);
	}

	handleSubmit() {
		var global = this;

		Helper.postToAPI('/mitigating-circumstances/update', this.state, null, function (responseJson) {
			if (responseJson.success) {
				global.props.getMitigatingCircumstancesFromAPI();
				global.props.modalSettings.toggle();
				global.props.updateAlert({ message: responseJson.success.message, visible: true, color: 'success' });
			} else {
				global.props.modalSettings.toggle();
				global.props.updateAlert({ message: responseJson.error.message, visible: true, color: 'danger' });
			}
		})
	}

	handleChangeStatus(event) {
		this.setState({
			status: event.target.value
		});
	}

	handleChangeMessage(event) {
		this.setState({
			updateMessage: event.target.value
		});
	}

	componentDidMount() {
		this.setState({
			status: this.props.data.status[this.props.data.status.length - 1].name,
			id: this.props.data.id
		});
	}

	render() {
		return (
			<div>
				<FormGroup>
					<Label for="exampleSelect">Update status</Label>
					<Input type="select" name="select" onChange={this.handleChangeStatus} id="exampleSelect">
						<option selected={this.state.status == 'APPROVE' ? true : false}>APPROVE</option>
						<option selected={this.state.status == 'PENDING' ? true : false}>PENDING</option>
						<option selected={this.state.status == 'REJECTED' ? true : false}>REJECTED</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label for="exampleText">Leave a message</Label>
					<Input onChange={this.handleChangeMessage} type="textarea" name="text" id="exampleText" />
				</FormGroup>
				<Button onClick={(e) => this.handleSubmit(e)} color="primary">Update status</Button>{' '}
			</div>
		);
	}
}

class Tutor extends Component {
	constructor(props) {
		super(props);
		var global = this;
		this.state = {
		};

		console.log('yo');
		console.log(this.props)

	}

	render() {
		return (
			<div>
				<Status getMitigatingCircumstancesFromAPI={this.props.getMitigatingCircumstancesFromAPI} updateAlert={this.props.updateAlert} modalSettings={this.props.modalSettings} data={this.props.data} />
			</div>
		);
	}
}

export default Tutor;