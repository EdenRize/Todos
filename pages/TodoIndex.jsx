const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
  ADD_TODO,
  ADD_TODO_TO_TODOT,
  REMOVE_TODO,
  SET_TODOS,
  UPDATE_TODO,
  ADD_USER_ACTIVITY,
} from '../store/store.js'
import { TodoList } from '../cmps/TodoList.jsx'
import { userService } from '../services/user.service.js'

export function TodoIndex() {
  const dispatch = useDispatch()
  const todos = useSelector((storeState) => storeState.todos)

  useEffect(() => {
    todoService.query().then((todos) => {
      dispatch({ type: SET_TODOS, todos })
    })
  }, [])

  function onRemoveTodo(todoId) {
    todoService
      .remove(todoId)
      .then(() => {
        showSuccessMsg('Todo removed')
        dispatch({ type: REMOVE_TODO, todoId })

        const activity = { txt: 'Removed a todo', at: Date.now() }
        userService.updateActivities(activity).then(
          dispatch({
            type: ADD_USER_ACTIVITY,
            activity,
          })
        )
      })
      .catch((err) => {
        console.log('Cannot remove todo', err)
        showErrorMsg('Cannot remove todo')
      })
  }

  return (
    <section className="todo-index">
      <h3>Todo App</h3>
      <Link to="/todo/edit">Add Todo</Link>
      <main>
        <TodoList todos={todos} onDeleteTodo={onRemoveTodo} />
      </main>
    </section>
  )
}
