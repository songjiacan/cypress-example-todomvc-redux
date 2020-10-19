import axios from 'axios'


export const addTodoToDB = (body)=> {
  const apiUrl = 'http://jsonplaceholder123.typicode.com/todos';
  return (dispatch) => {

    axios.post(apiUrl, {body})
    
    .catch(err => `${err.message}`);
  }

}

// axios.delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
//       .then(res => {
//         console.log(res);
//         console.log(res.data);
//       })

// const user = {
//   name: this.state.name
// };

// axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
//   .then(res => {
//     console.log(res);
//     console.log(res.data);
//   })