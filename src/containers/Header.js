import { connect } from 'react-redux'
import Header from '../components/Header'
import { addTodo  } from '../actions'
import { fetchTodos,addTodoToDB } from '../actions/GetTodo'
import { getMaxId } from '../selectors'

const mapStateToProps = state => ({
    maxId: getMaxId(state)
  })

export default connect(mapStateToProps, { addTodo, fetchTodos, addTodoToDB })(Header)
