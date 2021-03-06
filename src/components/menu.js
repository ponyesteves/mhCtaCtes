import React from 'react'
import { loggedIn } from '../constants/actionTypes'

export default (props) => {
  const Common = () =>
    <div>
      <button className='btn btn-success' onClick={props.ir.bind(null, "/home")}>HOME</button>
      <button className='btn btn-success' onClick={props.ir.bind(null, "/ventas")}>VENTAS</button>
    </div>
  const Admin = () => (
    <div>
      <button className='btn btn-success' onClick={props.ir.bind(null, "/ctas_ctes")}>CUENTAS</button>
      <button className='btn btn-success' onClick={props.ir.bind(null, "/movimientos")}>MOVIMIENTOS</button>
    </div>
  )
  const Seller = () => (
    <div>
      <button className='btn btn-success' onClick={props.ir.bind(null, "/ctas_ctes")}>MIS CUENTAS</button>
      <button className='btn btn-success' onClick={props.ir.bind(null, "/movimientos")}>MIS MOVIMIENTOS</button>
    </div>
  )
  return (
    <div className="App-intro">
      <Common />
      {props.loggedIn === loggedIn.admin ? <Admin /> : <Seller />}
    </div>)
}
