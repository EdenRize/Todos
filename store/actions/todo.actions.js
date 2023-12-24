import { todoService } from "../../services/todo.service.js"
import { userService } from "../../services/user.service.js"
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js"
import { ADD_USER_ACTIVITY } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export function loadTodos(filterBy) {
  return todoService.query(filterBy).then((todos) => {
    store.dispatch({ type: SET_TODOS, todos })
  })
    .catch(err => {
      console.log('err', err)
      throw err
    })
}

export function loadTodo(todoId) {
  return todoService
    .getById(todoId)
    .then(todo => todo)
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}

export function removeTodo(todoId) {
  return todoService
    .remove(todoId)
    .then(() => {
      store.dispatch({ type: REMOVE_TODO, todoId })

      const activity = { txt: 'Removed a todo', at: Date.now() }
      userService.updateActivities(activity).then(
        store.dispatch({
          type: ADD_USER_ACTIVITY,
          activity,
        })
      )
    })
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}

export function checkTodo(todo) {
  const isCheck = todo.doneAt ? null : Date.now()
  const newTodo = { ...todo, doneAt: isCheck }

  return todoService.save(newTodo).then(() => {
    store.dispatch({ type: UPDATE_TODO, todo: newTodo })
    const activity = {
      txt: isCheck ? 'Cheked a todo' : 'Uncheked a todo',
      at: Date.now(),
    }
    userService.updateActivities(activity).then(
      store.dispatch({
        type: ADD_USER_ACTIVITY,
        activity,
      })
    )
  })
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}

export function saveTodo(todo) {
  return todoService
    .save(todo)
    .then((savedTodo) => {
      let activityTitle

      if (todo._id) {
        store.dispatch({ type: UPDATE_TODO, todo: savedTodo })
        activityTitle = 'Updated a todo'
      } else {
        store.dispatch({ type: ADD_TODO, todo: savedTodo })
        activityTitle = 'Added a todo'
      }

      const activity = { txt: activityTitle, at: Date.now() }
      userService.updateActivities(activity).then(
        store.dispatch({
          type: ADD_USER_ACTIVITY,
          activity,
        })
      )

    })
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}