import React, { Component } from 'react';
import {Row, Col, Panel} from 'react-bootstrap'

// App component - represents the whole app
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Row>
        <Panel>
          <Col xs={12} sm={9}><h1>Registradora</h1></Col>
          <Col xsHidden={true} sm={3}><i className="fa fa-5x fa-shopping-cart" aria-hidden="true"></i></Col>
        </Panel>
      </Row>

    );
  }
}
