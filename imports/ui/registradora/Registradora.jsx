import React, { Component } from 'react';
import {Row, Col, Panel, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import Select from 'react-select';
import 'react-select/dist/react-select.css'

import Item from './Item'

// App component - represents the whole app
export default class Registradora extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      items:[{nombre:'Menta', cantidad:'50', precio:'50', id:'10'}],
      selected_product:null
    }
  }

  selectProduct(selected_product) {
    console.log(selected_product.id);
    this.setState({selected_product:selected_product.id})
  }

  renderItems() {
    return this.state.items.map((item) => {
        <Item item={item}/>
      })
  }

  render() {
    var options = [
      {id:'56', nombre:'Esfero', precio:'800'},
      {id:'46', nombre:'Lápiz', precio:'500'}
    ]
    return (
      <Row>
        <Col xs={12} sm={9}>
          <ListGroup>
            <ListGroupItem>Test 1</ListGroupItem>
            <ListGroupItem>Test 2</ListGroupItem>
            {this.renderItems.bind(this)}
            <ListGroupItem>
              <Select
                name="producto"
                value={this.state.selected_product}
                options={options}
                onChange={this.selectProduct.bind(this)}
                labelKey={'nombre'}
                valueKey={'id'}
              />
            </ListGroupItem>
          </ListGroup>
          <Button
            bsStyle="primary"
            disabled={false}
            onClick={(arg) => {console.log(arg + this.state.selected_product)}}>
            {this.state.isLoading ? 'Loading...' : 'Enviar'}
          </Button>
        </Col>
      </Row>

    );
  }
}
