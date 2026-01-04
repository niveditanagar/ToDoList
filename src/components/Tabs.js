

export default function Tabs({todos, filter, setFilter, toggleTodo, removeTodo}) {

    const allCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;
    const incompleteCount = allCount - completedCount;

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
    });

    return (
        <>
            <div style={{ display: 'center', margin: '10px 0' }}>
                <button
                    onClick={() => setFilter('all')}
                    style={{
                        padding: '10px',
                        marginRight: '5px',
                        backgroundColor: filter === 'all' ? '#ddd' : '#fff',
                        border: '1px solid #ccc'
                    }}
                >
                    All ({allCount})
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    style={{
                        padding: '10px',
                        marginRight: '5px',
                        backgroundColor: filter === 'completed' ? '#ddd' : '#fff',
                        border: '1px solid #ccc'
                    }}
                >
                    Completed ({completedCount})
                </button>
                <button
                    onClick={() => setFilter('incomplete')}
                    style={{
                        padding: '10px',
                        backgroundColor: filter === 'incomplete' ? '#ddd' : '#fff',
                        border: '1px solid #ccc'
                    }}
                >
                    Incomplete ({incompleteCount})
                </button>
            </div>

            <ul>
                {filteredTodos.map((todo, index) => (
                    <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none', backgroundColor: todo.completed ? 'lightgreen' : 'initial' }}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(index)}
                        />
                        {todo.text} 
                        <button onClick={() => removeTodo(index)}>X</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

