import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap'


// App component - represents the whole app
export default class SidebarContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_nav: 'dashboard'
    }
  }



  render() {
    return (
      <Nav bsStyle="pills" stacked activeKey={this.props.selected_view}
        style={{backgroundColor:'#333333', height:'100vh'}}
        onSelect={this.props.setSelectedView}>
        <NavItem eventKey={'dashboard'}><i className="fa fa-line-chart" aria-hidden="true"></i> Dashboard</NavItem>
        <NavItem eventKey={'caja_registradora'}><i className="fa fa-shopping-cart" aria-hidden="true"></i> Caja registradora</NavItem>
        <NavItem eventKey={'inventario'}><i className="fa fa-archive" aria-hidden="true"></i> Inventario</NavItem>
      </Nav>

    );
  }
}
