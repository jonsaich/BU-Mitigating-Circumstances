import React, { Component } from 'react';
import {Navbar} from 'reactstrap';
import { Link } from "react-router-dom";

import GuestNavigation from './common/navigation/guest';
import StudentNavigation from './common/navigation/student';
import TutorNavigation from './common/navigation/tutor';

class Navigation extends React.Component {
	render() {
		if (this.props.user.role == 'tutor') {
			return <TutorNavigation updateUser={this.props.updateUser} user={this.props.user} />
		} else if (this.props.user.role == 'student') {
			return <StudentNavigation updateUser={this.props.updateUser} user={this.props.user} />
		} else {
			return <GuestNavigation />
		}
	}
}

class Header extends React.Component {
	constructor(props) {
		super(props);
  }
  
	render() {
		return (
			<div>
				<Navbar color="light" light expand="md">
					<Link className="navbar-brand" to="/">BU Mitigating Circumstances</Link>
					<Navigation user={this.props.user} updateUser={this.props.updateUser} />
				</Navbar>
			</div>
		);
	}
}

export default Header;