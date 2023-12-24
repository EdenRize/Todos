const { useState, useEffect, useRef } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { TodoList } from '../cmps/TodoList.jsx'
import { userService } from '../services/user.service.js'
import { utilService } from '../services/util.service.js'
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { SET_TODOS, REMOVE_TODO, UPDATE_TODO} from '../store/reducers/todo.reducer.js'
import { ADD_USER_ACTIVITY } from '../store/reducers/user.reducer.js'
import { loadTodos, removeTodo, checkTodo } from '../store/actions/todo.actions.js'

export function TodoIndex() {
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const todos = useSelector((storeState) => storeState.todoModule.todos)
  const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))
  const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter())
  let styles

  if (user) {
    styles = {
      color: user.prefs.color,
      backgroundColor: user.prefs.bgColor,
    }
  }

  useEffect(() => {
    loadTodos(filterBy)
      .then()
      .catch(() => {
        showErrorMsg('Cannot show todos')
      })
  }, [filterBy])

  function onRemoveTodo(todoId) {
    removeTodo(todoId)
      .then(() => showSuccessMsg('Todo removed'))
      .catch((err) => {
        console.log('Cannot remove todo', err)
        showErrorMsg('Cannot remove todo')
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
    <section style={styles} className="todo-index">
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
          onCheckTodo={checkTodo}
        />
      </main>
    </section>
  )
}
