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
import Moment from 'react-moment';


class Log extends Component {
	constructor(props) {
		super(props);
		var global = this;
	}

	render() {
		return (
			<tr>
				<th scope="row">{this.props.status.name}</th>
				<td>{this.props.status.message}</td>
				<td><Moment format="DD-MM-YYYY HH:mm">{this.props.status.lastUpdated}</Moment></td>
			</tr>
		);
	}
}

class StatusLog extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var logs = this.props.status.map(function (status) {
			return (
				<Log status={status} />
			);
		})

		return (
			<Table>
				<thead>
					<tr>
						<th>Status</th>
						<th>Message</th>
						<th>Updated</th>
          </tr>
				</thead>
				<tbody>
					{logs}
				</tbody>
			</Table>
		);
	}
}

export default StatusLog;