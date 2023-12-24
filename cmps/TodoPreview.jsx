export function TodoPreview({ todo, onCheckTodo }) {
  return (
    <div className="todo-preview">
      <label>
        <input
          type="checkbox"
          checked={!!todo.doneAt}
          onChange={() => onCheckTodo(todo)}
        />
        <p className={todo.doneAt && 'checked'}>{todo.txt}</p>
      </label>
    </div>
  )
}
