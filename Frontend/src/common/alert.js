import React from 'react';
import { Alert } from 'reactstrap';

class AlertExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
      }
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.state.alert.visible = false;
    this.forceUpdate();
  }

  componentDidMount() {
    this.setState({alert: this.props.settings});  
    console.log(this.props.settings)  
  }

  componentDidUpdate(prevProps) {
    if(prevProps != this.props){
      this.setState({alert: this.props.settings});    
    }
  }

  render() {
    return (
      <Alert color={this.state.alert.color} isOpen={this.state.alert.visible} toggle={this.onDismiss}>
        {this.state.alert.message}
      </Alert>
    );
  }
}

export default AlertExample;