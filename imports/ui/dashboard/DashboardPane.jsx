import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';

// App component - represents the whole app
export default class DashboardPane extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
        <Panel className ={"dashboard-pane " + this.props.className} id={this.props.id} onClick={this.props.onClick}>
          <div className="dashboard-pane-title">{this.props.title}</div>
          <div className="dashboard-pane-value">{this.props.value}</div>
        </Panel>
    );
  }
}
