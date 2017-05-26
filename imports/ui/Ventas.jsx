import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap'
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import moment from 'moment-timezone'


// App component - represents the whole app
export default class Ventas extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  ventasMapReduce(ventas, sonNetas) {
    return ventas.reduce(
      (acc, venta) => acc.concat(venta.items), []
    )
  }

  darVentasHoy (sonNetas) {
    today = moment().tz('America/Bogota').startOf('day').toDate()
    console.log(this.props.ventas)
    todaySales = this.props.ventas.filter(venta => venta.fecha >= today)
    console.log(todaySales)
    sales = this.ventasMapReduce(todaySales, sonNetas)
    console.log('resultado final:')
    console.log(sales)
    return sales
  }


  render() {

    return (
      <Griddle data={this.darVentasHoy(true)}/>
    );
  }
}
