import React from "react";

function TodoList(props) {
    const todos = props.todoss;

    function renderItems() {
        return todos.map((todo) => (
            <li key={todo.id}>
                {todo.text}
            </li>
        ));
    }

    return (
        <ul>
            {renderItems()}
        </ul>
    );
}

export default TodoList;
