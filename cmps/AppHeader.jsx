import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { ProgressBar } from './ProgressBar.jsx'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { logout } from '../store/actions/user.actions.js'

const { useState } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const todos = useSelector((storeState) => storeState.todoModule.todos)

  function onLogout() {
    logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }

  function onSetUser(user) {
    dispatch({ type: SET_USER, user })
    navigate('/')
  }

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>Todos App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">Todos</NavLink>
          {user && <NavLink to="/profile">Profile</NavLink>}
        </nav>
      </section>
      {user ? (
        <section>
          <span to={`/user/${user._id}`}>
            Hello {user.fullname} <span>${user.balance.toLocaleString()}</span>
          </span>
          <button onClick={onLogout}>Logout</button>
        </section>
      ) : (
        <section>
          <LoginSignup onSetUser={onSetUser} />
        </section>
      )}
      <ProgressBar todos={todos} />
      <UserMsg />
    </header>
  )
}
