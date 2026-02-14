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
  async function addTodo() {
    if (text.trim() === '') return;

    const newTodo = { text: text, completed: false };
    console.log("hello look here");
    // send to backend via proxy using a relative path; fall back to local update if request fails
    try {     
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const saved = await res.json();
      setTodos([...todos, saved]);
    } catch (err) {
      setTodos([...todos, newTodo]);
    }

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
