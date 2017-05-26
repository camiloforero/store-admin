import React, { Component } from 'react';
import {Row, Col, Panel, Clearfix} from 'react-bootstrap';
import { Doughnut } from "react-chartjs";
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
    return Math.round(sales)
  }

  getWeekSales (sonNetas) {
    weekStart = moment().tz('America/Bogota').startOf('isoWeek').toDate()
    weekSales = this.props.compras.filter(venta => venta.fecha >= weekStart)
    sales = this.comprasMapReduce(weekSales, sonNetas)
    return Math.round(sales)
  }

  getMonthSales (sonNetas) {
    monthStart = moment().tz('America/Bogota').startOf('month').toDate()
    monthSales = this.props.compras.filter(venta => venta.fecha >= monthStart)
    sales = this.comprasMapReduce(monthSales, sonNetas)
    return Math.round(sales)
  }



  render() {
    pie_data = {
      labels: ['1aaa', '2sss', '3ddd'],
      datasets: [{
        label: 'Ventas brutas',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          ],
        }],
      }
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

        </Col>
        <Clearfix></Clearfix>
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
