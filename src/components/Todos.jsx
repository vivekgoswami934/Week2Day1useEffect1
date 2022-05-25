import React, { useEffect, useState } from "react";

const Todos = () => {
    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState([]);

    const saveInfo = () => {
        fetch("http://localhost:8080/todos", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                text: newTodo,
                isCompleted: false,
            })
        }).then(r => r.json()).then(d => {
            setTodos([...todos, d]);
            setNewTodo("");
        })

    }




useEffect(() => {
    fetch("http://localhost:8080/todos")
        .then((r) => r.json())
        .then((d) => setTodos(d));
}, []);

return (
    <div>
        <h1>Todos</h1>
        <div>
            <input type="text" value={newTodo}
                onChange={({target}) => setNewTodo(target.value)} />
            <button onClick={saveInfo}>+</button>
        </div>
        {todos.map((el) => (
            <div key={el.id}> {el.text} </div>
        ))}
    </div>
);
};

export default Todos;
