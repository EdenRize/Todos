import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
import {
  ADD_TODO,
  REMOVE_TODO,
  SET_TODOS,
  UPDATE_TODO,
  ADD_USER_ACTIVITY,
} from '../store/store.js'

export function TodoEdit() {
  const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
  const { todoId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (todoId) loadTodo()
  }, [])

  function loadTodo() {
    todoService
      .getById(todoId)
      .then(setTodoToEdit)
      .catch((err) => {
        console.log('Had issued in todo edit:', err)
        navigate('/todo')
        showErrorMsg('Todo not found!')
      })
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setTodoToEdit((prevTodo) => ({ ...prevTodo, [field]: value }))
  }

  function onSaveTodo(ev) {
    ev.preventDefault()
    todoService
      .save(todoToEdit)
      .then((savedTodo) => {
        let activityTitle

        if (todoToEdit._id) {
          dispatch({ type: UPDATE_TODO, todo: savedTodo })
          activityTitle = 'Updated a todo'
        } else {
          dispatch({ type: ADD_TODO, todo: savedTodo })
          activityTitle = 'Added a todo'
        }

        const activity = { txt: activityTitle, at: Date.now() }
        userService.updateActivities(activity).then(
          dispatch({
            type: ADD_USER_ACTIVITY,
            activity,
          })
        )

        navigate('/todo')
      })
      .catch((err) => {
        console.log('Cannot add todo', err)
        showErrorMsg('Cannot add todo')
      })
  }

  return (
    <section className="todo-edit">
      <h2>{todoToEdit._id ? 'Edit' : 'Add'} Todo</h2>

      <form onSubmit={onSaveTodo}>
        <label htmlFor="txt">Todo Text:</label>
        <input
          onChange={handleChange}
          value={todoToEdit.txt}
          type="text"
          name="txt"
          id="txt"
        />

        <button>{todoToEdit._id ? 'Edit' : 'Add'} Todo</button>
      </form>
    </section>
  )
}