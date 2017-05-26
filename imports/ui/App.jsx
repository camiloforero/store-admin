import React, { Component, PropTypes } from 'react';
import Sidebar from 'react-sidebar';
import {Grid, Navbar, Glyphicon} from 'react-bootstrap'

import Dashboard from './Dashboard'
import SidebarContent from './SidebarContent'
import Registradora from './registradora/Registradora'
import Inventario from './Inventario'
import Ventas from './Ventas'

import {Compras} from '../api/Compras'
import {Productos} from '../api/Productos'

import { createContainer } from 'meteor/react-meteor-data';
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_view:'dashboard',
      sidebarOpen: false,
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
    console.log('Sidebar open')
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetSidebarOpen(!this.state.open);
  }


  renderScene() {
    console.log('render scene called')
    if(this.state.selected_view == 'dashboard') {
      return (<Dashboard compras={this.props.compras} setSelectedView={(selected_view) => {this.setState({selected_view: selected_view})}}/>)
    }
    else if(this.state.selected_view == 'caja_registradora') {
      return (<Registradora productos={this.props.productos} />)
    }
    else if(this.state.selected_view == 'inventario') {
      return (<Inventario productos={this.props.productos} />)
    }
    else if(this.state.selected_view == 'ventas') {
      return (<Ventas ventas={this.props.compras} />)
    }
    else {
      return (<b>Invalid scene</b>)
    }
  }

  render() {
    const sidebarContent = <SidebarContent setSelectedView={(selected_view) => {this.setState({selected_view: selected_view})}}/>
    return (
      <div>
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          >
          <Navbar inverse fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <a onClick={this.menuButtonClick} href="#">Mi tienda  <i className="fa fa-chevron-right"/></a>
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
          <Grid fluid={true}>
            {this.renderScene()}
          </Grid>
        </Sidebar>

      </div>

    );
  }
}

App.propTypes = {
  compras: PropTypes.array.isRequired,
}

export default createContainer(() => {
  return {
    compras: Compras.find({}).fetch(),
    productos: Productos.find({}).fetch(),
  };
}, App)
