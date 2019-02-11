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

class PreviousMessage extends Component {
	constructor(props) {
		super(props);
		var global = this;
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<FormGroup>
          <Label for="exampleText">Message</Label>
          <Input readOnly type="textarea" name="text" id="exampleText" />
        </FormGroup>
			</div>
		);
	}
}

class NewMessage extends Component {
	constructor(props) {
		super(props);
		var global = this;
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<hr />
				<h1>Communication</h1>
				<FormGroup>
          <Label for="exampleText">Leave a message</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
			</div>
		);
	}
}

class Communication extends Component {
	constructor(props) {
		super(props);
		var global = this;
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<NewMessage />
			</div>
		);
	}
}

export default Communication;