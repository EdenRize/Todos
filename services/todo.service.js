import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'

export const todoService = {
  query,
  getById,
  save,
  remove,
  getEmptyTodo,
  getDefaultFilter,
}

function query(filterBy) {
  // return axios.get(BASE_URL).then(res => res.data)
  return storageService.query(STORAGE_KEY, 500, filterBy)
}
function getById(todoId) {
  return storageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
  return storageService.remove(STORAGE_KEY, todoId)
}
function save(todo) {
  if (todo._id) {
    return storageService.put(STORAGE_KEY, todo)
  } else {
    // when switching to backend - remove the next line
    return storageService.post(STORAGE_KEY, todo)
  }
}

function getEmptyTodo() {
  return {
    txt: '',
    doneAt: null,
  }
}

function getDefaultFilter() {
  return { txt: '', status: 'all', pageIdx: 0, sort: 'txt' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
