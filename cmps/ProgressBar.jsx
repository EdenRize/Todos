export function ProgressBar({ todos }) {
  console.log('todos', todos)
  const completedTodos = todos.filter((todo) => todo.doneAt)
  const percentCompleted = (completedTodos.length / todos.length) * 100
  console.log('percentCompleted', percentCompleted)
  const progressBarStyle = {
    width: `${percentCompleted}%`,
  }
  return (
    <div className="progress-bar">
      <div style={progressBarStyle} className="progress"></div>
    </div>
  )
}
