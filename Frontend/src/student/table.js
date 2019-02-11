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
import MitigatingCircumstance from '../mitigating-circumstance/index';
import ModalC from '../common/modal'
import * as Helper from '../helper'
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Moment from 'react-moment';

class MitTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var global = this;
    var mitCircumsList = this.props.mitCircums.map(function (mitC) {
      return (
        <MitRow user={global.props.user} modalSettings={global.props.modalSettings} data={mitC} />
      );
    })

    return (
      <Table striped>
        <thead>
          <tr>
            <th onClick={this.props.redirectTo}>Nature of circumstance</th>
            <th>Submit date</th>
            <th>Last updated</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mitCircumsList}
        </tbody>
      </Table>
    )
  }
}

class MitRow extends Component {
  constructor(props) {
    super(props);

    this.handleViewClick = this.handleViewClick.bind(this);
  }

  handleViewClick() {
    this.props.modalSettings.changeContent(<MitigatingCircumstance modalSettings={this.props.modalSettings} user={this.props.user} formData={this.props.data} />)
    this.props.modalSettings.toggle();
  }

  render() {
    return (
      <tr>
        <td>{this.props.data.natureOfCircum}</td>
        <td><Moment format="DD-MM-YYYY HH:mm">{this.props.data.status[0].lastUpdated}</Moment></td>
        <td><Moment format="DD-MM-YYYY HH:mm">{this.props.data.status[this.props.data.status.length - 1].lastUpdated}</Moment></td>
        <td><Badge size='sm' color="warning">{this.props.data.status[this.props.data.status.length - 1].name}</Badge>{' '}</td>
        <td><Button onClick={this.handleViewClick} color="primary">View</Button>{' '}</td>
      </tr>
    )
  }
}

export default MitTable;