// export const getTodos = () => fetch("http://localhost:4000/", {
//     method: 'GET',
//     mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/json',
//     },
    
//   });


let url="https://mern-rest-api-test.herokuapp.com"

export const getTodos = () => fetch(url).then(res => res.json());

export const getTodosid = (id) => fetch(`${url}/${id}`).then(res => res.json());

export const deleteTodo = (id) => fetch(`${url}/delete/${id}`, {
  method: "POST",
  mode: 'no-cors',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  
})

export const createTodo = (todo) => {
  // console.log(todo);

   fetch(`${url}/${todo}`, {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  // body:{"text":todo}
  body: JSON.stringify({
    text: todo
  })
})
.then(res => console.log(res.data));


    // let options={
    //     method: "POST",
    //     mode: 'no-cors',
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json"
          
    //     },
    //     body: JSON.stringify(todo)
        
    //   }
    // return(
    
    //   fetch("http://localhost:4000/", options) 

    // )
}



export const patchTodo = (todo,id) => 
  // console.log(todo);

   fetch(`${url}/update/${id}/${todo}`, {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  // body:{"text":todo}
  body: JSON.stringify({
    text: todo
  })
})
.then(res => console.log(res.data));