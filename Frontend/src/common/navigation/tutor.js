import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var helper = require('../../helper');

class TutorNavigation extends React.Component {
  constructor(props) {
    super(props);
    var global = this;
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout() {
    var global = this;
    helper.getFromAPI('/user/logout', function (res) {
      console.log(res);
      global.props.updateUser({});
    });
  }

  render() {
    return (
      <span style={{ width: '100%' }}>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {this.props.user.firstName} {this.props.user.lastName}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className="nav-link" to="/update-account">Update details</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.handleLogout}>
                  Logout
                    </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </span>
    );
  }
}

export default TutorNavigation;