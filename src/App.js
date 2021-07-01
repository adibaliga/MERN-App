import './App.css';
import React, { useState,useEffect } from "react";

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

  const [show1,setshow1]=useState(false); //search show

  const [show2,setshow2]=useState(false); //add show

  useEffect(() => {
    fetchItems()
  }, [])
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
     setshow(false);
    };

    const create = async () => {
      // const formData = new FormData();
      // formData.append(`text`, naw);
      // console.log(formData);
      await createTodo(naw);
     console.log(naw);
     setshow2(false);
     fetchItems();
    };
  
  return (
    <div className="App">
      <header >
        <h1>Todo</h1>
      </header>
      <button onClick={()=>setshow1(true)}>Search</button>
      <button onClick={()=>setshow2(true)}>Add</button>
      {show1 &&
        <div class="modal">
        <div class="modal-content">
          <h3>Search By text</h3>
      <input type="text" name="text" value={int} onChange={(e)=>setint(e.target.value)}/><br/><br/>
      <button onClick={search}>search by Text</button>
      <button onClick={()=>{
        setda([]);
        setshow1(false);}}>cancel</button>
      {da.map(todo => (
      <div key={todo._id}>
        <p>text: {todo.text}</p><br/>
        <p>ID: {todo._id}</p>
      </div>
      ))}
      </div></div>
      }
    {show2 &&
      <div class="modal">
      <div class="modal-content">
        <h3>Add Data</h3>
      <input type="text" name="text" value={naw} onChange={(e)=>{
        // let val=naw;
        // val.text=e.target.value;
        // setnaw(val);
        setnaw(e.target.value);
      }}/><br/><br/>
      <button onClick={create}>ADD</button>
      <button onClick={()=>setshow2(false)}>cancel</button>
      </div>
      </div>
    }
      <table id="customers">
        <thead>
          <tr>
            <th>Todos List</th>
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
            <>
              <div class="modal">
              <div class="modal-content">
                <h3>Edit</h3>
            <input type="text" name="text" value={update} onChange={(e)=>{
        setupdate(e.target.value);
      }}/><br/><br/>
            <button onClick={patch}>save</button>
            <button onClick={()=>setshow(false)}>cancel</button>
            </div>
            </div> </>
            
          }
         
    </div>
  );
}

export default App;
