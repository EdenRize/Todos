import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const ADD_USER_ACTIVITY = 'ADD_USER_ACTIVITY'

const initialState = {
  loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {
  let user

  switch (action.type) {
    case SET_USER:
      return { ...state, loggedinUser: action.user }

    case SET_USER_BALANCE:
      user = { ...state.loggedinUser, balance: action.balance }
      return { ...state, loggedinUser: user }

    case ADD_USER_ACTIVITY:
      const activities = [action.activity, ...state.loggedinUser.activities]
      user = { ...state.loggedinUser, activities }
      return { ...state, loggedinUser: user }

    default:
      return state
  }
}
