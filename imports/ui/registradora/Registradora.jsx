import React, { Component } from 'react';
import {Row, Col, Panel, Button, ListGroup, ListGroupItem, FormControl} from 'react-bootstrap'
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options'
import 'react-select/dist/react-select.css'
import moment from 'moment-timezone'

import Item from './Item'

import {Compras} from '../../api/Compras'

// App component - represents the whole app
export default class Registradora extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      items:[],
      selected_product:null
    }
  }

  addProduct(ev) {
    ev.preventDefault();
    if(this.state.selected_product) {
      new_product = this.state.selected_product
      new_product['cantidad'] = this.state.cantidad_producto
      console.log(new_product)
      this.setState((state) => ({items : state.items.concat(new_product), selected_product:null}))
    }
    else {
      alert('Por favor seleccione un producto')
    }

  }

  selectProduct(selected_product) {
    this.setState({selected_product:selected_product})
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value })
    console.log(event.target)
  }

  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.items.filter((item) => {
      if(item.id !== id) return item;
    });
    // Update state with filter
    this.setState({items: remainder});
  }

  renderItems() {
    return this.state.items.map((item) => {
        return <Item key={item.id} item={item} handleRemove={this.handleRemove.bind(this)}/>
      })
  }

  agregarCompra() {
    Compras.insert({
      items: this.state.items,
      fecha: moment().tz('America/Bogota').toDate()
    })
    this.setState({items:[], selected_product:null})
  }

  darTotal() {
    //filterOptions={createFilterOptions({options: {this.props.productos}, indexes: ['nombre_tipo', 'codigo']})}
    return this.state.items.reduce((acc, val) => acc + val.precio_venta*val.cantidad, 0)
  }

  render() {

    const STRINGS = ['foo', 'bar', 'baz', 'qux']
    const options2 = Array
      .from(Array(1000))
      .map((_, index) => ({
        nombre_tipo: `${index}: ${STRINGS[Math.floor(Math.random() * STRINGS.length)]}`,
        codigo: index,
        _id: index
      }))
    const indexes = ['nombre_tipo', 'codigo']
    const labelKey = 'nombre_tipo'
    const valueKey = '_id'
    const options = this.props.productos
    const filterOptions = createFilterOptions({options, indexes, labelKey, valueKey})
    return (
      <Row>
        <Col xs={12} sm={9}>
          <ListGroup>
            {this.renderItems()}
            <ListGroupItem className='registradora-list'>
              <Row>
                <form onSubmit={this.addProduct.bind(this)}>
                  <Col xs={6}>
                    <Select
                      name="producto"
                      value={this.state.selected_product}
                      options={options}
                      onChange={this.selectProduct.bind(this)}
                      valueKey={'_id'}
                      labelKey={labelKey}
                      filterOptions={filterOptions}

                    />
                  </Col>
                  <Col xs={2}>
                    ${this.state.selected_product? this.state.selected_product.precio_venta: '-'}
                  </Col>
                  <Col xs={3}>
                    <FormControl
                      type="number"
                      id="cantidad_producto"
                      placeholder="Cantidad"
                      value={this.state.cantidad}
                      onChange={this.handleChange.bind(this)}
                    />
                  </Col>
                  <Col xs={1}>
                    <Button bsClass="btn-sq-xs" bsSize= "xs" type="submit">
                      <i className="fa fa-plus"></i>
                    </Button>
                  </Col>
                </form>
              </Row>
            </ListGroupItem>
          </ListGroup>
          <div className="text-right">
            <Button
              bsStyle="primary"
              disabled={false}
              bsClass="paper-button"
              onClick={this.agregarCompra.bind(this)}>
              {this.state.isLoading ? 'Loading...' : 'Realizar compra'}
            </Button>
          </div>

        </Col>
        <Col sm={3}>
          <Panel className="registradora-results">
            <strong>Total: </strong>{this.darTotal()}
          </Panel>
        </Col>
      </Row>

    );
  }
}
