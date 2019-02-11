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

class Submit extends Component {
	constructor(props) {
		super(props);
		var global = this;
		this.state = {

		};

		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	handleSubmit() {
		console.log(this.props.data)
		const formData = new FormData()
		if(this.props.data.file)
			formData.append('file', this.props.data.file, this.props.data.file.name)
		formData.append("data", JSON.stringify(this.props.data));

		Helper.postToAPI('/mitigating-circumstances', formData, true, function () {
		})
	}

	render() {
		return (
			<div>
			<h1>yo</h1>
			<Button onClick={(e) => this.handleSubmit(e)}>Submit</Button>
			</div>
		);
	}
}

class Student extends Component {
	constructor(props) {
		super(props);
		var global = this;
		this.state = {
		};


	}

	render() {
		return (
			<div>
				<Submit data={this.props.data} />
			</div>
		);
	}
}

export default Student;