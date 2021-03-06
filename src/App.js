import React, { Component } from 'react';
import logo from './animatedHorse.gif';
import './App.css';
import ProductosContainer from './containers/productosContainer'
import VentasContainer from './containers/ventasContainer'
import CuentasCorrientes from './containers/cuentasCorrientes'
import Movimientos from './containers/movimientosContainer'
import { connect } from 'react-redux'
import { loggedIn } from './constants/actionTypes'
//Components

import Menu from './components/menu'
//Helpers
import { hotkeys } from './helpers/hotkeys'

import { ConnectedRouter, push } from 'react-router-redux'
import { Route, Redirect } from 'react-router'
import { store, history } from './store'
import { tryLogIn } from './actions/loggedIn'

//Fonts
import './vendor/font-awesome-4.7.0/css/font-awesome.min.css'

class App extends Component {
  componentWillMount() {
    hotkeys()
  }
  ir(target) {
    console.log("rput")
    store.dispatch(push(target))
  }
  handleLogIn(e) {
    tryLogIn(e.target.value)
  }
  constructBody(rol) {
    const sharedRoutes = [<Redirect from="/" to="/home" />, <Route path='/home' component={ProductosContainer} />, <Route path="/ventas" component={VentasContainer} />]
    let routes = []

    switch (rol) {
      // eslint-disable-next-line
      case loggedIn.admin:
        routes = [<Route path="/ctas_ctes" component={CuentasCorrientes} />, <Route path="/movimientos" component={Movimientos} />]
        .concat(sharedRoutes)
        break
      // eslint-disable-next-line
      case loggedIn.seller:
        routes = sharedRoutes.concat([<Route path="/ctas_ctes"  component={() => <CuentasCorrientes filter={["Comisiones a Pagar", "Efectivo Carcamo"]} />} />, <Route path="/movimientos" component={() => <Movimientos filter="Comisiones a Pagar" />} />])
        break
      // eslint-disable-next-line
    }

    return (routes.length > 0) ? (
      <ConnectedRouter history={history}>
        <div>
          {routes.map((r, i) => ({ ...r, key: i }))}
        </div>
      </ConnectedRouter>) : (
        <div className="filter">
          <span><i className="fa fa-key" aria-hidden="true"></i></span>
          <input className="filter" type="password" onChange={this.handleLogIn} />
        </div>
      )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>MHG</h2>
        </div>
        <Menu loggedIn={this.props.loggedIn} ir={this.ir} />


        {this.constructBody(this.props.loggedIn)}

      </div>
    )
  }
}
const mapStateToProps = state => ({
  loggedIn: state.loggedIn
})

export default connect(
  mapStateToProps, null
)(App)
