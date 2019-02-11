import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button, Form, FormGroup, Label, Input, FormText, Table
} from 'reactstrap';

import MitigatingCircumstance from '../mitigating-circumstance/index';
import ModalC from '../common/modal'
import * as Helper from '../helper'
import MitTable from './table'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);
    var global = this;
    this.state = {
      mitCircums: []
    };

    this.openNewMitigatingCircumstanceModal = this.openNewMitigatingCircumstanceModal.bind(this);
    this.getMitigatingCircumstancesFromAPI = this.getMitigatingCircumstancesFromAPI.bind(this);    
  }

  getMitigatingCircumstancesFromAPI() {
    var global = this;
 
    Helper.getFromAPI('/mitigating-circumstances', function (responseJson) {
      global.setState({
        mitCircums: responseJson
      });
    });
  }

  componentDidMount() {
    this.getMitigatingCircumstancesFromAPI();
  }

  openNewMitigatingCircumstanceModal() {
    this.props.modalSettings.changeContent(<MitigatingCircumstance getMitigatingCircumstancesFromAPI={this.getMitigatingCircumstancesFromAPI} updateAlert={this.props.updateAlert} modalSettings={this.props.modalSettings} user={this.props.user} />)
    this.props.modalSettings.toggle();
  }

  render() {
    var toShow;

    if (this.state.mitCircums.length == 0) {
      toShow = <h1>Nothing to show!</h1>
    } else {
      toShow = <MitTable user={this.props.user} modalSettings={this.props.modalSettings} mitCircums={this.state.mitCircums} />
    }

    return (
      <div>
        <Row>
          <Col>
            <div className="border-bottom mb-3 mt-2">
              <h2>Mitigating Circumstances</h2>
            </div>
            <p>Below are your mitigating circumstances submitted to date. <Button onClick={this.openNewMitigatingCircumstanceModal} color="success" size="sm">Submit a new request</Button>{' '}</p>
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

export default Index;