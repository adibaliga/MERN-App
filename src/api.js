// export const getTodos = () => fetch("http://localhost:4000/", {
//     method: 'GET',
//     mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/json',
//     },
    
//   });

export const getTodos = () => fetch("http://localhost:4000/").then(res => res.json());

export const getTodosid = (id) => fetch(`http://localhost:4000/${id}`).then(res => res.json());

export const deleteTodo = (id) => fetch(`http://localhost:4000/delete/${id}`, {
  method: "POST",
  mode: 'no-cors',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  
})

export const createTodo = (todo) => {
    let options={
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify(todo)
        
      }
    return(
    
      fetch("http://localhost:4000/", options) 

    )
}