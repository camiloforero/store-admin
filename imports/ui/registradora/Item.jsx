import React, { Component } from 'react';
import {ListGroupItem, Col, Button, Clearfix, Row} from 'react-bootstrap'

// App component - represents the whole app
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    console.log('item props')
    console.log(this.props)
    return (
      <ListGroupItem className='registradora-list'>
        <Row>
          <Col xs={6}>
            {this.props.item.nombre_tipo}
          </Col>
          <Col xs={2}>
            ${this.props.item.precio_venta}
          </Col>
          <Col xs={3}>
            {this.props.item.cantidad}
          </Col>
          <Col xs={1}>
            <Button bsClass="btn-sq-xs" bsSize= "xs" onClick={() => this.props.handleRemove(this.props.item.id)}>
              <i className="fa fa-times"></i>
            </Button>
          </Col>
          <Clearfix></Clearfix>
        </Row>
      </ListGroupItem>
    );
  }
}
