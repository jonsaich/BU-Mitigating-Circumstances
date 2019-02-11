import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
  , Form
  , Row
  , Col
  , FormGroup
  , Label
  , Input,
  FormText
} from 'reactstrap';
import * as Helper from '../helper';
import Files from './files';

class MCForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        personallyAffected: '',
        circumstanceDetails: '',
        natureOfCircum: '',
        file: undefined
      },
      btnDisabled: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.formData) {
      this.setState({
        form: this.props.formData,
        readOnly: true,
      });
    }
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

  handleSubmit() {
    var global = this;
    const formData = new FormData();

    if (this.state.form.file != undefined) {
      formData.append('file', this.state.form.file, this.state.form.file.name)
    }

    formData.append("data", JSON.stringify(this.state.form));
    if (this.state.btnDisabled == false) {
      Helper.postToAPI('/mitigating-circumstances', formData, true, function (responseJson) {
        global.state.btnDisabled = false;
        global.forceUpdate();

        if (responseJson.success) {
          global.props.getMitigatingCircumstancesFromAPI();
          global.props.modalSettings.toggle();
          global.props.updateAlert({ message: responseJson.success.message, visible: true, color: 'success' })
        } else {
          global.props.modalSettings.toggle();
          global.props.updateAlert({ message: responseJson.error.message, visible: true, color: 'danger' })
        }
      })

      this.state.btnDisabled = true;
      this.forceUpdate();
    }
  }


  render() {
    var global = this;
    var submitButton = (!this.state.readOnly ? <Button disabled={(this.state.btnDisabled)} onClick={(e) => this.handleSubmit(e)}>{(this.state.btnDisabled ? 'Please wait...' : 'Submit')}</Button> : '')
    var showUploadedFiles = function () {
      if (global.state.form.files && global.state.form.files.length != 0) {
        return <Files files={global.state.form.files} />
      }
    }

    return (
      <Form>
        <Row>
          <Col>
            <h3>Exceptional Circumstances Details</h3>
            <p>For illness of up to 5 calendar days you can use the Self-Certification form provided to you to evidence your illness.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Nature of circumstances (please tick)</p>
            <FormGroup check>
              <Label check>
                <Input disabled={this.state.readOnly} theval="Illness" checked={(this.state.form.natureOfCircum == "Illness" ? true : false)} onChange={this.handleChange.bind(this)} type="radio" value="Illness" name="natureOfCircum" />{' '}
                Illness
          </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input disabled={this.state.readOnly} theval="Family Illness" checked={(this.state.form.natureOfCircum == "Family Illness" ? true : false)} onChange={this.handleChange.bind(this)} type="radio" name="natureOfCircum" />{' '}
                Family Illness
          </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input disabled={this.state.readOnly} theval="Pregnancy related illness" checked={(this.state.form.natureOfCircum == "Pregnancy related illness" ? true : false)} onChange={this.handleChange.bind(this)} type="radio" name="natureOfCircum" />{' '}
                Pregnancy related illness
          </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input disabled={this.state.readOnly} theval="Bereavement" checked={(this.state.form.natureOfCircum == "Bereavement" ? true : false)} onChange={this.handleChange.bind(this)} type="radio" name="natureOfCircum" />{' '}
                Bereavement
          </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input disabled={this.state.readOnly} theval="Unforeseen travel disruption" checked={(this.state.form.natureOfCircum == "Unforeseen travel disruption" ? true : false)} onChange={this.handleChange.bind(this)} type="radio" name="natureOfCircum" />{' '}
                Unforeseen travel disruption
          </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input disabled={this.state.readOnly} theval="Acute Personal difficulties" checked={(this.state.form.natureOfCircum == "Acute Personal difficulties" ? true : false)} onChange={this.handleChange.bind(this)} type="radio" name="natureOfCircum" />{' '}
                Acute Personal difficulties
          </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup style={{ marginTop: '10px' }}>
              <Label for="impact">Please provide as much details as possible regarding your circumstance</Label>
              <Input readOnly={this.state.readOnly} onChange={this.handleChange.bind(this)} value={this.state.form.circumstanceDetails} type="textarea" name="circumstanceDetails" id="circumstanceDetails" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input disabled={this.state.readOnly} onChange={this.handleChange.bind(this)} type="file" name="file" id="exampleFile" />
              <FormText color="muted">
               Please only max 5mb
        </FormText>
            </FormGroup>
            {showUploadedFiles()}
          </Col>
        </Row>
        {submitButton}
      </Form>
    );
  }
}

export default MCForm;