const { useState, useEffect, useRef } = React
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
import { utilService } from '../services/util.service.js'
import { TodoFilter } from '../cmps/TodoFilter.jsx'

export function TodoIndex() {
  const dispatch = useDispatch()
  const todos = useSelector((storeState) => storeState.todos)
  const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))
  const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter())

  useEffect(() => {
    loadTodos()
  }, [filterBy])

  function loadTodos() {
    todoService.query(filterBy).then((todos) => {
      dispatch({ type: SET_TODOS, todos })
    })
  }

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

  function onTodoChange(todo) {
    const isCheck = todo.doneAt ? null : Date.now()
    const newTodo = { ...todo, doneAt: isCheck }

    dispatch({ type: UPDATE_TODO, todo: newTodo })

    todoService.save(newTodo).then(() => {
      const activity = {
        txt: isCheck ? 'Cheked a todo' : 'Uncheked a todo',
        at: Date.now(),
      }
      userService.updateActivities(activity).then(
        dispatch({
          type: ADD_USER_ACTIVITY,
          activity,
        })
      )

      loadTodos()
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      ...filterBy,
      pageIdx: isUndefined(prevFilter.pageIdx) ? undefined : 0,
    }))
  }

  function isUndefined(value) {
    return value === undefined
  }

  const { txt, status } = filterBy
  return (
    <section className="todo-index">
      <h3>Todo App</h3>
      <TodoFilter
        filterBy={{ txt, status }}
        onSetFilter={debounceOnSetFilter.current}
      />
      <Link to="/todo/edit">Add Todo</Link>
      <main>
        <TodoList
          todos={todos}
          onDeleteTodo={onRemoveTodo}
          onTodoChange={onTodoChange}
        />
      </main>
    </section>
  )
}
