import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'
import { loadTodo, saveTodo } from '../store/actions/todo.actions.js'
import { ADD_TODO, UPDATE_TODO } from '../store/reducers/todo.reducer.js'
import { ADD_USER_ACTIVITY } from '../store/reducers/user.reducer.js'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
export function TodoEdit() {
  const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
  const { todoId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  let styles

  if (user) {
    styles = {
      color: user.prefs.color,
      backgroundColor: user.prefs.bgColor,
    }
  }

  useEffect(() => {
    if (todoId) _loadTodo()
  }, [])

  function _loadTodo() {
    loadTodo(todoId)
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
    saveTodo(todoToEdit)
      .then(() => navigate('/todo'))
      .catch((err) => {
        console.log('Cannot add todo', err)
        showErrorMsg('Cannot add todo')
      })
  }

  return (
    <section style={styles} className="todo-edit">
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
