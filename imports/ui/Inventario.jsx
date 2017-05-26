import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap'
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';


// App component - represents the whole app
export default class Inventario extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {
    return (
      <Griddle data={this.props.productos} plugins={[plugins.LocalPlugin]}>
        <RowDefinition>
          <ColumnDefinition id="nombre_tipo" title="Nombre completo" />
          <ColumnDefinition id="precio_base" title="Precio de compra"/>
          <ColumnDefinition id="precio_venta" title="Precio de venta" />
          <ColumnDefinition id="cantidad" title="Cantidad" />
          <ColumnDefinition id="codigo" title="Código" />
        </RowDefinition>
      </Griddle>
    );
  }
}
