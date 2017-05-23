import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import {Grid, Navbar, Glyphicon} from 'react-bootstrap'

import Dashboard from './Dashboard'
import SidebarContent from './SidebarContent'
import Registradora from './Registradora/Registradora'
// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_view:'dashboard',
      sidebarOpen: false
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
      return (<Dashboard/>)
    }
    else if(this.state.selected_view == 'caja_registradora') {
      return (<Registradora/>)
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
