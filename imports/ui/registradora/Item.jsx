import React, { Component } from 'react';
import {ListGroupItem} from 'react-bootstrap'

// App component - represents the whole app
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <ListGroupItem>{this.props.item.nombre}</ListGroupItem>
    );
  }
}
