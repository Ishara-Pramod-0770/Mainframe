import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importing AsyncStorage for persistent storage

// Creating a context to provide todo data and actions to the component tree
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  // Creating the TodoProvider component
  const [todoList, setTodoList] = useState([]); // Initializing the todoList with an empty array

  useEffect(() => {
    // Using useEffect to load todos from storage
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todoList"); // Retrieving the todo list from AsyncStorage
        if (storedTodos) {
          setTodoList(JSON.parse(storedTodos)); // Updating the todoList  if there are stored todos
        }
      } catch (error) {
        console.error("Failed to load todos", error); //errors occur during the loading process
      }
    };

    loadTodos();
  }, []);

  const saveTodosToStorage = async (todos) => {
    //save the current todo list
    try {
      await AsyncStorage.setItem("todoList", JSON.stringify(todos)); // Saving the todo list as a JSON string => Convert todos to a string and save
    } catch (error) {
      console.error("Failed to save todos", error);
    }
  };

  const addTodo = (todo) => {
    // Function to add a new todo item to the list
    const newTodoList = [...todoList, todo]; // Creating a new array
    setTodoList(newTodoList); // Updating with the new todo list
    saveTodosToStorage(newTodoList);
  };

  const updateTodo = (updatedTodo) => {
    // Function to update an existing todo item
    const updatedTodoList = todoList.map(
      (item) => (item.id === updatedTodo.id ? updatedTodo : item) // Replacing the old todo with the updated one
    );
    setTodoList(updatedTodoList);
    saveTodosToStorage(updatedTodoList);
  };

  const deleteTodo = (id) => {
    // Function to delete a todo item by its ID
    const updatedTodoList = todoList.filter((item) => item.id !== id); // Filtering out the todo to be deleted
    setTodoList(updatedTodoList);
    saveTodosToStorage(updatedTodoList);
  };

  return (
    // Providing the todoList and action functions (addTodo, updateTodo, deleteTodo) to the component tree
    <TodoContext.Provider value={{ todoList, addTodo, updateTodo, deleteTodo }}>
      {children} {/* Rendering any child components passed to TodoProvider */}
    </TodoContext.Provider>
  );
};
