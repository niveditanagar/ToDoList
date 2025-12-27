import { useState, useEffect } from 'react';

function ToDos() {

const [todos, setTodos] = useState( () => {
const saved = localStorage.getItem("todos"); //to save it to local storage (no server needed)
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

 const [text, setText] = useState("");

 //to add a new todo
 function addTodo() { 
   if(text.trim() === '') return;

   setTodos([...todos, {  text: text, completed: false }]);
   setText("");
 }

 //to remove a todo
 //storing each todo as an object to allow tracking the state of each todo.
 function removeTodo(indextoRemove) { 
   setTodos(todos.filter((_, index) => index !== indextoRemove)); // _ is a placeholder for the first argument which we don't use
 }

 //to toggle a todo 
 function toggleTodo(index) {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    ));
  }

    return (

        <div className="App">

            <h1>My to-do App</h1>

            <input 
                value={text}
                onChange={ (e) => setText(e.target.value)}
                placeholder="Add a text"
            />

            <button onClick={addTodo}>Add</button>

            <ul>
                {todos.map( (todo, index) => (
                <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                     <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(index)}
                    />
                {todo.text}

                <button onClick={ () => removeTodo(index)}>X</button>

                </li>
                ))}
            </ul>

        </div>

    );
}

export default ToDos;