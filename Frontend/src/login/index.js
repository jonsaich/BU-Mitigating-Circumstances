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
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as Helper from '../helper';
import config from '../config';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      btnDisabled: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  handleInputChange(e) {
    this.state[e.target.name] = e.target.value;
    this.forceUpdate();
  }

  handleLogin() {
    var global = this;

    if (this.state.btnDisabled == false) {
      Helper.postToAPI('/user/login/local', { username: this.state.email, password: this.state.password }, null, function (responseJson, err) {
        global.state.btnDisabled = false;
        global.forceUpdate();
        if (responseJson.success) {
          global.props.updateUser(responseJson.success.user);
          global.props.updateAlert({ message: 'Sucessfuly logged in, welcome back', visible: true, color: 'success' })
        } else {
          global.props.updateUser(responseJson);
          global.props.updateAlert({ message: responseJson.error.message, visible: true, color: 'danger' })
        }
      })
    }

    this.state.btnDisabled = true;
    this.forceUpdate();
  }

  handleFacebookLogin() {
    window.location.href = config.apiUrl + '/user/login/facebook?returnUrl=' + config.thisUrl;
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input onChange={this.handleInputChange.bind(this)} value={this.state.email} type="email" name="email" id="email" placeholder="your email address" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input onChange={this.handleInputChange.bind(this)} value={this.state.password} type="password" name="password" id="password" placeholder="your password" />
        </FormGroup>
        <Row>
          <img style={{ width: '400px', height: 55, margin: '0 auto', cursor: 'pointer' }} onClick={this.handleFacebookLogin} src='https://pngimage.net/wp-content/uploads/2018/06/login-with-facebook-button-png-transparent-4.png'></img></Row>
        <Button disabled={(this.state.btnDisabled)} onClick={this.handleLogin}>{(this.state.btnDisabled ? 'Please wait...' : 'Login')}</Button>
      </Form>
    );
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
            <div className="border-bottom mb-3 mt-2">
              <h2>Login</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <LoginForm updateUser={this.props.updateUser} updateAlert={this.props.updateAlert} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;