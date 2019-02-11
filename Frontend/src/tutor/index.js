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
  Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import MitigatingCircumstance from '../mitigating-circumstance/index';
import ModalC from '../common/modal'
import * as Helper from '../helper'
import MitTable from './table'

class List extends Component {
  constructor(props) {
    super(props);
    var global = this;    
		this.state = {
      mitCircums: [],
      modalContent: <MitigatingCircumstance />
    };
    
    this.getMitigatingCircumstancesFromAPI = this.getMitigatingCircumstancesFromAPI.bind(this);        
  }

  componentDidMount() {
    this.getMitigatingCircumstancesFromAPI();
  }

  getMitigatingCircumstancesFromAPI() {
    var global = this;
    Helper.getFromAPI('/mitigating-circumstances', function (responseJson) {
			global.setState({
				mitCircums: responseJson
      });
      console.log(responseJson)
    });
  }
 
    render() {
      var toShow;

      if(this.state.mitCircums.length == 0) {
        toShow = <h3>Your students don't appear to have submitted any mitigating circumstance requests. </h3>
      } else {
        toShow = <MitTable getMitigatingCircumstancesFromAPI={this.getMitigatingCircumstancesFromAPI} updateAlert={this.props.updateAlert} user={this.props.user} modalSettings={this.props.modalSettings} mitCircums={this.state.mitCircums} />
      }

      return (
        <div>
          <Row>
            <Col>
              <div className="border-bottom mb-3 mt-2">
                <h2>Mitigating Circumstances</h2>
              </div>
              <p>Listed below are your students submitted mitigating circumstance requests.</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {toShow}
          </Col>
        </Row>
      </div>
      );
    }
  }
  
export default List;