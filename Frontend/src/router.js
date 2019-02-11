import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './login/index';
import StudentDashboard from './student/index';
import TutorDashboard from './tutor/index';
import UpdateAccount from './update-account/index';

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thiss = this;

    if(Object.keys(this.props.user).length == 0) {
      return (<Login updateAlert={thiss.props.updateAlert} updateUser={thiss.props.updateUser} />)
    } else {
      return (
        <div>
          <Route path="/" exact render={function() {
            if(thiss.props.user.role == 'student') {
              return <StudentDashboard modalSettings={thiss.props.modalSettings} updateAlert={thiss.props.updateAlert} user={thiss.props.user} />;            
            } else if(thiss.props.user.role == 'tutor') {
              return <TutorDashboard modalSettings={thiss.props.modalSettings} updateAlert={thiss.props.updateAlert} user={thiss.props.user} />;
            } else {
              return <Login updateAlert={thiss.props.updateAlert} updateUser={thiss.props.updateUser} />;    
            }
          }} />
          <Route path="/users/" render={() => <h3>Please select a topic.</h3>} />
          <Route path="/update-account" render={function() { return <UpdateAccount updateUser={thiss.props.updateUser} updateAlert={thiss.props.updateAlert} user={thiss.props.user} />}} />
      </div>
      );
    }
   
  }
};

export default AppRouter;