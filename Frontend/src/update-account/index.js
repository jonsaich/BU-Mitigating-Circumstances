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

class TheForm extends Component {
  constructor(props) {
    super(props);
    console.log('hello')
    console.log(this.props)
    this.state = {
      form: {
        email: this.props.user.email,
        twitterId: this.props.user.twitterId,
        mobileNumber: this.props.user.mobileNumber
      },
      btnDisabled: false
    }
  }

  handleSubmit(e) {
    var global = this;

    if (this.state.btnDisabled == false) {
      Helper.putToAPI('/user/', this.state.form, function (responseJson) {
        global.state.btnDisabled = false;
        global.forceUpdate();

        if (responseJson.success) {
          global.props.updateAlert({ message: responseJson.success.message, visible: true, color: 'success' });

          // We need to get the new user data from the api
          Helper.getFromAPI('', function (responseJson, error) {
            if (responseJson && responseJson.success) {
              global.props.updateUser(responseJson.success)
            }
          });
        } else {
          global.props.updateAlert({ message: responseJson.error.message, visible: true, color: 'danger' });
        }
      })
    }
    this.state.btnDisabled = true;
    this.forceUpdate();
  }

  handleChange(e) {
    var newVal;

    if (e.target.type == "radio") {
      console.log(e.target.getAttribute('theval'));
      newVal = e.target.getAttribute('theval');
    } else if (e.target.type == "file") {
      newVal = e.target.files[0];
    } else {
      newVal = e.target.value;
    }

    this.state.form[e.target.name] = newVal;
    this.forceUpdate();
  }

  render() {

    return (
      <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <Input disabled={true} onChange={this.handleChange.bind(this)} value={this.state.form.email} type="email" name="email" id="email" placeholder="email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Twitter ID</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange.bind(this)} value={this.state.form.twitterId} name="twitterId" id="twitterId" placeholder="this is not your @username - to submit via twitter" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Mobile number</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange.bind(this)} value={this.state.form.mobileNumber} name="mobileNumber" id="mobileNumber" placeholder="please user your country code i.e. +44744.." />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button disabled={(this.state.btnDisabled)} onClick={(e) => this.handleSubmit(e)}>{(this.state.btnDisabled ? 'Please wait...' : 'Submit')}</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
            <div className="border-bottom mb-3 mt-2">
              <h2>Update details</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TheForm updateUser={this.props.updateUser} updateAlert={this.props.updateAlert} user={this.props.user} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Index;