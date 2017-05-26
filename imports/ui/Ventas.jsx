import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap'
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { BootstrapPager } from 'griddle-react-bootstrap';
import moment from 'moment-timezone'


// App component - represents the whole app
export default class Ventas extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  ventasMapReduce(ventas, sonNetas) {
    var o = {}
    return ventas.reduce(
      (acc, venta) => acc.concat(venta.items), []
    ).reduce((acc, item) => {
      var key = item['_id'];
      item['cantidad'] = parseInt(item['cantidad']) //TODO: quitar esto cuando se resetee la base de datos
      if(!o[key]) {
        o[key] = item;
        acc.push(o[key]);
      } else {
        o[key].cantidad += item.cantidad
      }
      return acc;
    }, [])
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

    const styleConfig = {
      classNames: {
        Table: 'table table-bordered table-striped table-hover'
      },
    }

    return (
      <Griddle
        data={this.darVentasHoy(true)}
        plugins={[plugins.LocalPlugin]}
        tableClassName={'table table-bordered table-striped table-hover'}
        useGriddleStyles={false}
        showSettings={false}
        useCustomPagerComponent={true}
        customPagerComponent={ BootstrapPager }
        styleConfig={styleConfig}
        >
        <RowDefinition>
          <ColumnDefinition id="nombre_tipo" title="Nombre completo" />
          <ColumnDefinition id="precio_base" title="Precio de compra"/>
          <ColumnDefinition id="precio_venta" title="Precio de venta" />
          <ColumnDefinition id="cantidad" title="Cantidad vendida" />
        </RowDefinition>
      </Griddle>
    );
  }
}
