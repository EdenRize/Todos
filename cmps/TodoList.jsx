import { TodoPreview } from './TodoPreview.jsx'
const { Link } = ReactRouterDOM

export function TodoList({ todos, onCheckTodo, onDeleteTodo }) {
  if (!todos) return <p>Loading...</p>
  if (!todos.length) return <p>No Todos</p>
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        return (
          <li key={todo._id} className="todo">
            <TodoPreview todo={todo} />
            <button onClick={() => onDeleteTodo(todo._id)}>Delete</button>
            <Link to={`/todo/edit/${todo._id}`}>
              <button>Edit</button>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
