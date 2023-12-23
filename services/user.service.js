import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getById,
  getLoggedinUser,
  updateBalance,
  getEmptyCredentials,
  updateActivities,
  updateUser,
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then((users) => {
    console.log('users', users)
    const user = users.find((user) => user.username === username)
    if (user) return _setLoggedinUser(user)
    else return Promise.reject('Invalid login')
  })
}

function signup({ username, password, fullname }) {
  const user = {
    username,
    password,
    fullname,
    balance: 10000,
    activities: [],
    prefs: { color: 'black', bgColor: 'white' },
  }
  return storageService.post(STORAGE_KEY, user).then(_setLoggedinUser)
}

function updateUser(newUser) {
  return storageService.query(STORAGE_KEY).then((users) => {
    let user = users.find((user) => user._id === newUser._id)
    console.log('user before', user)
    user = { ...user, ...newUser }
    console.log('user after', user)
    return storageService.put(STORAGE_KEY, user).then(_setLoggedinUser(user))
  })
}

function updateBalance(diff) {
  const loggedInUserId = getLoggedinUser()._id
  return userService
    .getById(loggedInUserId)
    .then((user) => {
      if (user.balance + diff < 0) return Promise.reject('No credit')
      user.balance += diff
      return storageService.put(STORAGE_KEY, user)
    })
    .then((user) => {
      _setLoggedinUser(user)
      return user.balance
    })
}

function updateActivities(activity) {
  const loggedInUserId = getLoggedinUser()._id
  return userService
    .getById(loggedInUserId)
    .then((user) => {
      const activities = [...user.activities]
      activities.unshift(activity)
      const newUser = { ...user, activities }
      return storageService.put(STORAGE_KEY, newUser)
    })
    .then((user) => {
      _setLoggedinUser(user)
      return user.activities
    })
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    balance: user.balance,
    activities: user.activities,
    prefs: user.prefs,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: '',
  }
}
