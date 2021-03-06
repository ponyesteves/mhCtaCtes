import { loggedIn } from '../constants/actionTypes'

export default (state = '', action) => {
  return [loggedIn.admin, loggedIn.seller].includes(action.type) ? action.type : state
}
