import { userService } from "../../services/user.service.js"

export function login(credentials) {
    return userService
        .login(credentials)
        .then(user => user)
        .catch((err) => {
            console.log('err', err)
            throw err
        })
}

export function signUp(credentials) {
    return userService
        .signup(credentials)
        .then(user => user)
        .catch((err) => {
            console.log('err', err)
            throw err
        })
}

export function logout() {
    return userService
        .logout()
        .catch((err) => {
            console.log('err', err)
            throw err
        })
}