// src/contexts/TodoContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todoList');
        if (storedTodos) {
          setTodoList(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error('Failed to load todos', error);
      }
    };

    loadTodos();
  }, []);

  const saveTodosToStorage = async (todos) => {
    try {
      await AsyncStorage.setItem('todoList', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos', error);
    }
  };

  const addTodo = (todo) => {
    const newTodoList = [...todoList, todo];
    setTodoList(newTodoList);
    saveTodosToStorage(newTodoList);
  };

  const updateTodo = (updatedTodo) => {
    const updatedTodoList = todoList.map((item) =>
      item.id === updatedTodo.id ? updatedTodo : item
    );
    setTodoList(updatedTodoList);
    saveTodosToStorage(updatedTodoList);
  };

  const deleteTodo = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
    saveTodosToStorage(updatedTodoList);
  };

  return (
    <TodoContext.Provider value={{ todoList, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};