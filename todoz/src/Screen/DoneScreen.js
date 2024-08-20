import React, { useState, useContext } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { TodoContext } from '../Contexts/TodoContext'; // Adjust path if needed
import { Picker } from '@react-native-picker/picker';
import { IconButton } from 'react-native-paper';

const DoneScreen = () => {
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState("done");
  const [updateTodo, setUpdateTodo] = useState(null);
  const { todoList, addTodo, updateTodo: updateTodoInContext, deleteTodo } = useContext(TodoContext);

  //Add Done Task
  const handleAddTodo = () => {
    if (todo === "") return;

    addTodo({
      id: Date.now().toString(),
      title: todo,
      status,
    });
    setTodo("");
    setStatus("done");
  };

  //Delete Done Task
  const handleDeleteTodo = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this todo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteTodo(id),
          style: "destructive",
        },
      ]
    );
  };

  //Update Done Task
  const handleUpdateTodo = () => {
    updateTodoInContext({ ...updateTodo, title: todo, status });
    setUpdateTodo(null);
    setTodo("");
    setStatus("done");
  };

  const doneTodos = todoList.filter((item) => item.status === "done");

  const renderTodos = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoStatus}>{item.status}</Text>
      <IconButton icon="pencil" iconColor="#000" onPress={() => {
        setUpdateTodo(item);
        setTodo(item.title);
        setStatus(item.status);
      }} />
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
        onPress={updateTodo ? handleUpdateTodo : handleAddTodo}
      >
        <Text style={styles.buttonText}>{updateTodo ? "Save" : "Add"}</Text>
      </TouchableOpacity>

      {doneTodos.length === 0 ? (
        <Text style={styles.noTodoText}>No Available Done Task</Text>
      ) : (
        <FlatList 
          data={doneTodos} 
          renderItem={renderTodos} 
          keyExtractor={(item) => item.id} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'flex-start',
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
    marginTop: 50,
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 20,
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
    fontWeight: "bold",
  },
  todoItem: {
    backgroundColor: "#B7FFDC",
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
    marginLeft: 25,
  },
  todoStatus: {
    color: "#000",
    fontSize: 16,
    flex: 1,
    marginLeft: 25,
  },
  noTodoText: {
    color: "#888",
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DoneScreen;
