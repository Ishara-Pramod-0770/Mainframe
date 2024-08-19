import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { useNavigation } from '@react-navigation/native';
import Home from "../Component/Home";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState("todo");
  const [todoList, setTodoList] = useState([]);
  const [updateTodo, setUpdateTodo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todoList");
        if (storedTodos) {
          setTodoList(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error("Failed to load todos", error);
      }
    };

    loadTodos();
  }, []);

  const saveTodosToStorage = async (todos) => {
    try {
      await AsyncStorage.setItem("todoList", JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos", error);
    }
  };

  const handleAddTodo = () => {
    if (todo === "") {
      return;
    }

    const newTodoList = [
      ...todoList,
      { id: Date.now().toString(), title: todo, status },
    ];
    setTodoList(newTodoList);
    setTodo("");
    setStatus("todo");

    saveTodosToStorage(newTodoList);
  };

  const handleDeleteTodo = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedTodoList = todoList.filter((todo) => todo.id !== id);
            setTodoList(updatedTodoList);

            saveTodosToStorage(updatedTodoList);
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleUpdateTodo = (todo) => {
    setUpdateTodo(todo);
    setTodo(todo.title);
    setStatus(todo.status);
  };

  const handleSaveTodo = () => {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === updateTodo.id) {
        return { ...item, title: todo, status };
      }
      return item;
    });

    setTodoList(updatedTodoList);
    setUpdateTodo(null);
    setTodo("");
    setStatus("todo");

    saveTodosToStorage(updatedTodoList);
  };

  const renderTodos = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoStatus}>{item.status}</Text>
      <IconButton icon="pencil" iconColor="#000" onPress={() => handleUpdateTodo(item)} />
      <IconButton icon="trash-can" iconColor="#000" onPress={() => handleDeleteTodo(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your todo"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      <Picker
        selectedValue={status}
        style={styles.picker}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="Todo" value="todo" />
        <Picker.Item label="In Progress" value="progress" />
        <Picker.Item label="Done" value="done" />
      </Picker>
      <TouchableOpacity
        style={styles.button}
        onPress={updateTodo ? handleSaveTodo : handleAddTodo}
      >
        <Text style={styles.buttonText}>{updateTodo ? "Save" : "Add"}</Text>
      </TouchableOpacity>
      <FlatList data={todoList} renderItem={renderTodos} />
      {todoList.length <= 0 && <Home />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    marginTop: 50
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 20
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  todoItem: {
    backgroundColor: "#B7EEFF",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  todoTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
    flex: 1,
    marginLeft: 25
  },
  todoStatus: {
    color: "#000",
    fontSize: 16,
    flex: 1,
    marginLeft: 25
  },
  navButton: {
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: "center",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default TodoScreen;