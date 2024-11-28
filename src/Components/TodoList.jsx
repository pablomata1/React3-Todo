import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {

    //todos: To represent an array of todo items. Initialize it with an empty array [], indicating that there are no todo items initially.
    //headingInput: To represent the value entered by user into an input field for adding a new heading for a todo item. Initialize it as an empty string ''.
    //listInputs: Initialize listInputs as an empty object {}. This state will hold the value of input fields for each todo item individually.    
    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});

    //Function to adding Todos
    const handleAddTodo = () => {
        //Checks if headingInput is empty after trimming any whitespace from beginging to end
        //Makes sure user has entered some input before proceeding
        if(headingInput.trim() !==''){
            //Updating Todo, spreads existing todos, and appends new object to it. 
            setTodos([...todos, {heading: headingInput, lists: [] }]);
            //Resets headingInput
            setHeadingInput('');
        }
    }

    //Function to Add Todo Items
    const handleAddList = (index) => {
        //Checks if the listInputs[index] variable, which is a piece of text input from the user for adding a new list item, is not empty after trimming any leading or trailing whitespace. 
        //This condition ensures that the user has entered some content before proceeding.
        if(listInputs[index] && listInputs[index].trim() !== ''){
            //Creates a shallow copy of the todos array using the spread syntax (``…todos`). 
            //The copy is made to avoid directly mutating the state, which is a best practice in React.
            const newTodos = [...todos];
            //Accesses the todo item at the specified index in the newTodos array and pushes the value of listInputs[index] into its lists array. 
            //This push assumes that each todo item has a lists property, an array containing the items within that todo.
            newTodos[index].lists.push(listInputs[index]);
            //sets Todos with newTodos content, erasing previous contene in todos array.
            setTodos(newTodos);
            //this function resets the listInput state variable, clearing the text input field for adding new list items.
            setListInputs({...listInputs, [index]: ''});
        }

        console.log(todos);
        console.log(listInputs);
    }

    const handleListInputChange = (index, value) => {
        //Updates the listInputs state object with the new value for the input at the specified index, ensuring that each todo item's list input is tracked individually.
        //Will just overwite property value, bc property will always be the same either [0]:value or [1]:value
        setListInputs({...listInputs, [index]:value});
    }

    //Function for removing item from todos
    const handleDeleteTodo = (index) => {
        //Creates a shallow copy of the todos array using the spread syntax (…todos). 
        //This step is crucial to avoid directly mutating the original state.
        const newTodos = [...todos];
        //The splice method is called on the newTodos array to remove one element at the specified index.
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    //Mapping over todos array
    const list = todos.map((todo, index) => 
        <div key={index} className='todo-card'>
            <div className='heading_todo'>
                <h3>{todo.heading}</h3>
                <button className='delete-button-heading' onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
            </div>
            <ul>
                {todo.lists.map((list, listIndex) => 
                    <li key={listIndex} className='todo_inside_list'>
                        <p>{list}</p>
                    </li>
                )}
            </ul>
            <div className='add_list'>
                <input 
                    type="text" 
                    className='list-input'
                    placeholder='Add List'
                    value={listInputs[index] || ''}
                    onChange={(e) => handleListInputChange(index, e.target.value)}
                />
                <button className='add-list-button' onClick={() => handleAddList(index)}>Add List</button>
            </div>

        </div>
    );
    
    return (
        <>
        <div className="todo-container">
            <h1 className="title">My Todo List</h1>
            <div className="input-container">
            <input
                type="text"
                className="heading-input"
                placeholder="Enter heading"
                value={headingInput}
                //(e) => {…}: This is an arrow function, which is a concise way to define a function in JavaScript. It takes an event (e) as an argument, which represents the event that triggered the handler.
                onChange={(e) => {setHeadingInput(e.target.value);}} //Add onchange event handler to update headingInput state
            />
            <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
            </div>
        </div>
        <div className="todo_main">
            {list}
        </div>
        </>
    );
};

export default TodoList;
