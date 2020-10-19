import * as types from '../constants/ActionTypes'
import axios from 'axios'
import {APIURL} from '../constants/EndPoint'

// get data from rest service
export const getTodoApi = () => {
  // const apiUrl = 'http://jsonplaceholder.typicode.com/todos';
     return  fetch(APIURL)
     .then(response => response.json())
     .then(data => {
       console.log(data)
       return data
     })
     .catch(err => `${err.message}`);
     
}

export const fetUserSucess = todos => {
  return {
    type: types.LOAD_DB_TODO,
    payload: todos
  }
}



export const addTodoToDB = (body)=> {
  return (dispatch) => {
    axios.post(APIURL, body)
    .catch(err => `${err.message}`);
  }
}

export const deleteTodoToDB = (id)=> {
  axios.delete(APIURL + `/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
}

export const updateTodoToDB = (id, body)=> {
  axios.put(APIURL + `/${id}`, body)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
}
// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });

export const fetchTodos = ()=> {
  // const apiUrl = 'http://jsonplaceholder.typicode.com/todos';
  return (dispatch) => {
    //  fetch(APIURL)
    //     .then(res => res.json())
    //     .then(json => {
    //       console.log(json)
    //       dispatch(fetUserSucess(json))
    //     });

    axios.get(APIURL)  
    .then( response => {
      const todoBody = response.data
      console.log("data " + todoBody)
      dispatch(fetUserSucess(todoBody))

    })
    .catch(err => `${err.message}`);
  }

}


// fetch(`/api/titles/${titleNo}`)
//         .then(res => res.json())
//         .then(json => {
//           console.log(json)
//           this.setState({
//             data: json,
//           })
//         });

// get getDBTodo action
// export function getDBTodo() {
//   return (dispatch) => {
//     dispatch({
//       type: types.LOAD_DB_TODO,
//       payload: getTodoApi(),
//     });
//   };
// }

export default function getDBTodo() {
  return {
      type: types.LOAD_DB_TODO,
      payload: getTodoApi(),
    }
  }