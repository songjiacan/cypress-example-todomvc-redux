import * as types from '../constants/ActionTypes'
// import {getTodoApi} from './GetTodo'
import {fetchTodos} from './GetTodo'



export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})
// export const getDBTodo = () => ( {type: types.LOAD_DB_TODO,  payload: "abc"})
// export const getDBTodo = () => ({getDBTodo1})
export const getDBTodo = () => ( {type: types.LOAD_DB_TODO,  payload: fetchTodos()})