import { useState, useEffect } from 'react';
import Tabs from './Tabs';

export default function ToDos() {

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos"); // to get data from local storage (no server needed)
    return saved ? JSON.parse(saved) : [];
  });

  // used to presist the todos state to the local browser's locacalStorage whenever there is a change in the todos state
  // this ensures that todos are not lost on page refresh
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [text, setText] = useState("");
  const [filter, setFilter] = useState('all');

  // to add a new todo
  function addTodo() {
    if (text.trim() === '') return;

    setTodos([...todos, { text: text, completed: false }]); // storing each todo as an object to allow tracking the state of each todo.
    setText("");
  }

  // to remove a todo
  function removeTodo(indextoRemove) {
    setTodos(todos.filter((_, index) => index !== indextoRemove)); // _ is a placeholder for the first argument which we don't use
  }

  // to toggle a todo 
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
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a text"
      />

      <button onClick={addTodo}>Add</button>
      <Tabs todos={todos} filter={filter} setFilter={setFilter} toggleTodo={toggleTodo} removeTodo={removeTodo} />

    </div>

  );
}
