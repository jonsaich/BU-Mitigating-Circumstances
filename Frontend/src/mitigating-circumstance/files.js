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


class FileTable extends Component {
	constructor(props) {
		super(props);
		var global = this;
	}

	render() {
    console.log(this.props.files)
    var rows = this.props.files.map(function(file) {
      return (
        <FileRow file={file} />
      );
    });

		return (
			<Table dark>
      <thead>
        <FileColumn />
      </thead>
      <tbody>
       {rows}
      </tbody>
    </Table>
		);
	}
}

class FileColumn extends Component {
	constructor(props) {
		super(props);
		var global = this;
	}

	render() {
		return (
      <tr>
        <th>File</th>
        <th>View</th>
      </tr>
		);
	}
}

class FileRow extends Component {
	constructor(props) {
		super(props);
		var global = this;
	}

	render() {
		return (
      <tr>
        <td>{this.props.file.fileName}</td>
        <td>{this.props.file.file}</td>
      </tr>
		);
	}
}

class Files extends Component {
	constructor(props) {
		super(props);
		var global = this;
	}

	render() {
		return (
			<FileTable files={this.props.files} />
		);
	}
}

export default Files;