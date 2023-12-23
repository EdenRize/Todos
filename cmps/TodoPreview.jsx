export function TodoPreview({ todo, onTodoChange }) {
  return (
    <div className="todo-preview">
      <label>
        <input
          type="checkbox"
          checked={!!todo.doneAt}
          onChange={() => onTodoChange(todo)}
        />
        <p className={todo.doneAt && 'checked'}>{todo.txt}</p>
      </label>
    </div>
  )
}
