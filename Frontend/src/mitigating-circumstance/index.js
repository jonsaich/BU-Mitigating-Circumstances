import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter
  ,Form
  ,Row
  ,Col
  ,FormGroup
  ,Label
  ,Input,
  FormText } from 'reactstrap';
import ModalC from '../common/modal'
import * as Helper from '../helper';
import Tutor from './tutor'
import Student from './student'
import Communication from './communication'
import StatusLog from './status-log';
import MCForm from './form';

class CustomUserAction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var userOptions;

    if(this.props.user.role == 'tutor') {
      console.log('yo');
      console.log(this.props)
      userOptions = <Col><Tutor getMitigatingCircumstancesFromAPI={this.props.getMitigatingCircumstancesFromAPI} updateAlert={this.props.updateAlert} modalSettings={this.props.modalSettings} data={this.props.formData} /></Col>
    }
    return (
      <div style={{borderRadius: '25px', border: '2px solid #000', margin: '5px', padding: '5px'}}>
      <Row>
        <Col>
        <h3>Request Updates</h3>
        </Col>
        </Row>
        <Row>
          <Col>
            <StatusLog status={this.props.formData.status} />
          </Col>
            {userOptions}
        </Row>
      </div>
    );
  }
}

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var showEventLog = function(global) {
      if(global.props.formData != undefined) {
        return <CustomUserAction getMitigatingCircumstancesFromAPI={global.props.getMitigatingCircumstancesFromAPI} modalSettings={global.props.modalSettings} updateAlert={global.props.updateAlert} formData={global.props.formData} user={global.props.user} />
      } 
    }

    return (
      <div>
        <MCForm modalSettings={this.props.modalSettings} getMitigatingCircumstancesFromAPI={this.props.getMitigatingCircumstancesFromAPI} updateAlert={this.props.updateAlert} formData={this.props.formData} user={this.props.user} />
        {showEventLog(this)}
      </div>
    );
  }
}

export default Index;