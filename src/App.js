// import './App.css';
import React, { useState, useEffect } from "react";

import { getTodos,deleteTodo,getTodosid,createTodo } from "./api"

function App() {
  const [items, setItems] = useState([]);
  const [da,setda]=useState([]);                   //http search data
  // const [danew,setdanew]=useState([]);
  const [int,setint]=useState("");              //search data
  const [naw,setnaw]=useState({text:""});            //new data

    const fetchItems = async () => {
      const todos = await getTodos()
      console.log(todos);
      setItems(todos)
    }
    const search = async () => {
      const todo = await getTodosid(int)
      console.log(todo);
      setda(todo);
      console.log(da);
    }

    const create = async () => {
      // const formData = new FormData();
      // formData.append(`text`, `${naw}`);
      // console.log(formData);
      await createTodo(naw);
     console.log(naw)
    };
  
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <button onClick={fetchItems}>click</button><br/>
      <input type="text" name="text" onChange={(e)=>setint(e.target.value)}/>
      <button onClick={search}>search by ID</button>
      {
      <>
        <p>text: {da.text}</p><br/>
        <p>ID: {da._id}</p>
      </>
      }
      <br/>

      <input type="text" onChange={(e)=>{
        let val=naw;
        val.text=e.target.value;
        setnaw(val);
      }}/>
      <button onClick={create}>ADD</button>
      
      <table>
    { items &&
      items.map(todo => (
        <tr>
                <td key={todo._id}>
                  
                    {todo.text}
                  </td>
                  {/* <td><input/></td> */}
                  {/* <td><button>change</button></td> */}
                  <td><button 
                  onClick={ async ()=>{
                    await deleteTodo(todo._id);
                     fetchItems();

                  //  await fetch(`http://localhost:4000/delete/${todo._id}`, {
                  //   method: "DELETE",
                  //   //mode: 'no-cors',
                  //   headers: {
                  //         "Accept": "application/json",
                  //         "Content-Type": "application/json"
                  //   }
  
                  //   })
                   }}>Delete</button></td>
                  </tr>    
              ))
            }
            </table>
    </div>
  );
}

export default App;
