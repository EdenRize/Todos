const { useSelector, useDispatch } = ReactRedux
const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect, Fragment } = React
import { ActivityList } from '../cmps/ActivityList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/store.js'

export function UserProfile() {
  const user = useSelector((storeState) => storeState.loggedinUser)
  const dispatch = useDispatch()
  const [userToEdit, setUserToEdit] = useState(user)
  const navigate = useNavigate()
  let styles

  if (user) {
    styles = {
      color: user.prefs.color,
      backgroundColor: user.prefs.bgColor,
    }
  }
  useEffect(() => {
    if (!userToEdit) navigate('/')
  }, [])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'radio':
        value = target.id
        break

      default:
        break
    }

    setUserToEdit((prevUser) => ({ ...prevUser, [field]: value }))
    dispatch({ type: SET_USER, user: { ...userToEdit, [field]: value } })
  }

  function onChangePrefs({ target }) {
    const field = target.name
    let value = target.value

    setUserToEdit((prevUser) => ({
      ...prevUser,
      prefs: { ...prevUser.prefs, [field]: value },
    }))
    dispatch({
      type: SET_USER,
      user: { ...userToEdit, prefs: { ...userToEdit.prefs, [field]: value } },
    })
  }

  function onChangeUser(ev) {
    ev.preventDefault()
    userService
      .updateUser(userToEdit)
      .then(dispatch({ type: SET_USER, user: userToEdit }))
      .then(() => {
        showSuccessMsg('User saved successfully')
      })
      .catch((err) => {
        console.log('err', err)
        showErrorMsg('Oops try again')
      })
  }

  return (
    <section style={styles} className="user-profile">
      <h2>Profile</h2>

      {userToEdit && (
        <Fragment>
          <form onSubmit={onChangeUser}>
            <label>
              <p>Full Name:</p>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={userToEdit.fullname}
                onChange={handleChange}
              />
            </label>

            <label>
              <p>Color:</p>
              <input
                type="color"
                name="color"
                value={userToEdit.prefs.color}
                onChange={onChangePrefs}
              />
            </label>

            <label>
              <p>BgColor:</p>
              <input
                type="color"
                name="bgColor"
                value={userToEdit.prefs.bgColor}
                onChange={onChangePrefs}
              />
            </label>
            <button>Save</button>
          </form>

          <ActivityList activities={userToEdit.activities} />
        </Fragment>
      )}
    </section>
  )
}
