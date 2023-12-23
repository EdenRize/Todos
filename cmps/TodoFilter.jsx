const { useState, useEffect, useRef } = React

export function TodoFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function onSetFilterBy(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'radio':
        value = target.id
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <div className="todo-filter">
      <h2>Filter Todos</h2>

      <form onSubmit={onSetFilterBy}>
        <label htmlFor="txt">Title:</label>
        <input
          value={filterByToEdit.txt}
          onChange={handleChange}
          name="txt"
          id="txt"
          type="text"
          placeholder="By Text"
        />

        <fieldset>
          <legend>Select Status:</legend>

          <div>
            <label htmlFor="all">All</label>
            <input
              type="radio"
              id="all"
              name="status"
              checked={filterByToEdit.status === 'all'}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="done">Done</label>
            <input
              type="radio"
              id="done"
              name="status"
              checked={filterByToEdit.status === 'done'}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="active">Active</label>
            <input
              type="radio"
              id="active"
              name="status"
              checked={filterByToEdit.status === 'active'}
              onChange={handleChange}
            />
          </div>
        </fieldset>
      </form>
    </div>
  )
}
