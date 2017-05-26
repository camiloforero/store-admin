import React, { Component } from 'react';
import {Row, Col, Panel} from 'react-bootstrap';
import moment from 'moment-timezone'
import DashboardPane from './dashboard/DashboardPane'

// App component - represents the whole app
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  comprasMapReduce(compras, sonNetas) {
    return compras.map(
      compra => ({ganancias: compra.items.reduce(
        (total, item) => total + (item.precio_venta-item.precio_base*(sonNetas?1:0))*item.cantidad, 0)})
    ).reduce((total, compra) => total + compra.ganancias, 0)
  }

  getTodaySales (sonNetas) {
    today = moment().tz('America/Bogota').startOf('day').toDate()
    console.log(this.props.compras)
    todaySales = this.props.compras.filter(venta => venta.fecha >= today)
    console.log(todaySales)
    sales = this.comprasMapReduce(todaySales, sonNetas)
    return sales
  }

  getWeekSales (sonNetas) {
    weekStart = moment().tz('America/Bogota').startOf('isoWeek').toDate()
    weekSales = this.props.compras.filter(venta => venta.fecha >= weekStart)
    sales = this.comprasMapReduce(weekSales, sonNetas)
    return sales
  }

  getMonthSales (sonNetas) {
    monthStart = moment().tz('America/Bogota').startOf('month').toDate()
    monthSales = this.props.compras.filter(venta => venta.fecha >= monthStart)
    sales = this.comprasMapReduce(monthSales, sonNetas)
    return sales
  }



  render() {
    return (
      <Row>
        <Col xs={12}>
          <Panel className={'panel-button'} onClick={() => this.props.setSelectedView('caja_registradora')}>
            <Col xs={12} sm={9}><h1>Registradora</h1></Col>
            <Col xsHidden={true} sm={3}><i className="fa fa-5x fa-shopping-cart" aria-hidden="true"></i></Col>
          </Panel>
        </Col>
        <Col xs={12} sm={3}>
          <DashboardPane
            title="Ingresos brutos del día"
            value={"$" + this.getTodaySales(false)}
            className={'panel-button'}
            id='ingresos-brutos-dia'
            onClick={() => this.props.setSelectedView('ventas')}
          />
        </Col>
        <Col xs={12} sm={3}>
          <DashboardPane
            title="Ingresos brutos de la semana"
            value={"$" + this.getWeekSales(false)}
            className={'panel-button'}
            id='ingresos-brutos-semana'
          />
        </Col>
        <Col xs={12} sm={3}>
          <DashboardPane
            title="Ingresos brutos del mes"
            value={"$" + this.getMonthSales(false)}
            className={'panel-button'}
            id='ingresos-brutos-mes'
          />
        </Col>
        <Col xs={12} sm={3}>
          <DashboardPane
            title="Ingresos netos del día"
            value={"$" + this.getTodaySales(true)}
            className={'panel-button'}
          />
        </Col>
        <Col xs={12} sm={3}>
          <DashboardPane
            title="Ingresos netos de la semana"
            value={"$" + this.getWeekSales(true)}
            className={'panel-button'}
          />
        </Col>
        <Col xs={12} sm={3}>
          <DashboardPane
            title="Ingresos netos del mes"
            value={"$" + this.getMonthSales(true)}
            className={'panel-button'}
          />
        </Col>
      </Row>

    );
  }
}
