import React, { Component } from 'react';
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router.js";
import * as Helper from './helper';

import Header from './header'
import Footer from './footer'
import Alert from './common/alert'
import ModalC from './common/modal'

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alertSettings: {message: '', visible: false}
		};

		this.updateAlert = this.updateAlert.bind(this);
  }
	updateAlert(settings) {
    this.setState({ alertSettings: settings })
  }
	render() {
		
		return (
			
			<Container>
				<Alert settings={this.state.alertSettings} />
				<Routes modalSettings={this.props.modalSettings} updateAlert={this.updateAlert} user={this.props.user} updateUser={this.props.updateUser}  />
			</Container>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
		var global = this;
		
		Helper.getFromAPI('', function (responseJson, error) {
			if(responseJson && responseJson.success) {
				global.setState({
					user: responseJson.success,
					modalContent: ''
				});
			}
		});

		this.updateUser = this.updateUser.bind(this);
		this.changeModalContent = this.changeModalContent.bind(this);
		this.toggleModal = this.toggleModal.bind(this);		
	}

	updateUser(theUser) {
		this.setState({
			user: theUser
		});
	}

	toggleModal() {
    this.child.toggle();
	}
	
	changeModalContent(content) {
    this.setState({
      modalContent: content
    });
  }

	render() {
		var modalSettings = {
      toggle: this.toggleModal,
      changeContent: this.changeModalContent
		}
		
		return (
			<div>
				<Router>
					<div>
						<Header user={this.state.user} updateUser={this.updateUser} />
						<Body modalSettings={modalSettings} user={this.state.user} updateUser={this.updateUser} />
						{//<Footer />}
						}
					</div>
				</Router>
				<ModalC modalTitle='New mitigating circumstance request' size='lg' comp={this.state.modalContent} onRef={ref => (this.child = ref)} />
			</div>
		);
	}
}

export default App;
