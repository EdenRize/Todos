export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

const initialState = {
  todos: [],
}

export function todoReducer(state = initialState, action = {}) {
  let todos

  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.todos }

    case REMOVE_TODO:
      todos = state.todos.filter((todo) => todo._id !== action.todoId)
      return { ...state, todos }

    case ADD_TODO:
      todos = [action.todo, ...state.todos]
      return { ...state, todos }

    case UPDATE_TODO:
      todos = state.todos.map((todo) => {
        return todo._id === action.todo._id ? action.todo : todo
      })
      return { ...state, todos }

    default:
      return state
  }
}
