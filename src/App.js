import './App.css';
import React, { useState } from "react";

import { getTodos,deleteTodo,getTodosid,createTodo,patchTodo } from "./api"

function App() {
  const [items, setItems] = useState([]);
  const [show,setshow]=useState(false);
  const [da,setda]=useState([]);                   //http search data
  // const [danew,setdanew]=useState([]);
  const [int,setint]=useState("");              //search data
  // const [naw,setnaw]=useState({text:""});            //new data
  const [naw,setnaw]=useState("");  

  const [id,setid]=useState("");  
  const [update,setupdate]=useState("");

    const fetchItems = async () => {
      const todos = await getTodos()
      console.log(todos);
      setItems(todos)
    }
    const search = async () => {
      const todo = await getTodosid(int)
      // console.log(todo);
      setda(todo);
      // console.log(da);
    }

    const patch = async () => {
      // const formData = new FormData();
      // formData.append(`text`, naw);
      // console.log(formData);
      await patchTodo(update,id);
     console.log(update+" "+id);
     fetchItems();
    //  setshow(false);
    };

    const create = async () => {
      // const formData = new FormData();
      // formData.append(`text`, naw);
      // console.log(formData);
      await createTodo(naw);
     console.log(naw);
     fetchItems();
    };
  
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <button onClick={fetchItems}>click</button><br/>
      <input type="text" name="text" value={int} onChange={(e)=>setint(e.target.value)}/>
      <button onClick={search}>search by Text</button>
      {da.map(todo => (
      <div key={todo._id}>
        <p>text: {todo.text}</p><br/>
        <p>ID: {todo._id}</p>
      </div>
      ))}
      <br/>

      <input type="text" name="text" value={naw} onChange={(e)=>{
        // let val=naw;
        // val.text=e.target.value;
        // setnaw(val);
        setnaw(e.target.value);
      }}/>
      <button onClick={create}>ADD</button><br/><br/>
      
      <table id="customers">
        <thead>
          <tr>
            <th>Todos</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
    { items &&
      items.map(todo => (
        
        <tr key={todo._id}>
                <td >
                  
                    {todo.text}
                  </td>
                  
                  <td><button 
                  onClick={ async ()=>{
                    await deleteTodo(todo._id);
                     fetchItems();
                   }}>Delete</button></td>

                   <td><button onClick={()=>{
                     setupdate(todo.text);
                     setshow(true);
                     setid(todo._id);
                     }}>Edit</button></td>
                  </tr>    
              ))
            }</tbody>
            </table>
            {show &&
            <><br/>
            <input type="text" name="text" value={update} onChange={(e)=>{
        setupdate(e.target.value);
      }}/>
            <button onClick={patch}>save</button>
            <button onClick={()=>setshow(false)}>cancel</button></>
          }
    </div>
  );
}

export default App;
