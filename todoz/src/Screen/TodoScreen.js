import React, { useState, useContext } from "react";
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
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TodoContext } from "../Contexts/TodoContext"; // Adjust path if needed

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(null);
  const {
    todoList,
    addTodo,
    updateTodo: updateTodoInContext,
    deleteTodo,
  } = useContext(TodoContext);

  // Add Todo Task
  const handleAddTodo = () => {
    if (todo === "") return;

    addTodo({
      id: Date.now().toString(),
      title: todo,
      status,
      dueDate: dueDate.toISOString().split("T")[0], // format date to yyyy-mm-dd
    });
    setTodo("");
    setStatus("todo");
    setDueDate(new Date());
  };

  // Delete Todo Task
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

  // Update Todo Task
  const handleUpdateTodo = () => {
    updateTodoInContext({
      ...updateTodo,
      title: todo,
      status,
      dueDate: dueDate.toISOString().split("T")[0],
    });
    setUpdateTodo(null);
    setTodo("");
    setStatus("todo");
    setDueDate(new Date());
  };

  const todoItems = todoList.filter((item) => item.status === "todo");

  const renderTodos = ({ item }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoTextContainer}>
        <Text style={styles.todoTitle}>{item.title}</Text>
        <Text style={styles.todoStatus}>{item.status}</Text>
        <Text style={styles.todoDueDate}>Due: {item.dueDate}</Text>
      </View>
      <IconButton
        icon="pencil"
        iconColor="#000"
        onPress={() => {
          setUpdateTodo(item);
          setTodo(item.title);
          setStatus(item.status);
          setDueDate(new Date(item.dueDate));
        }}
      />
      <IconButton
        icon="trash-can"
        iconColor="#000"
        onPress={() => handleDeleteTodo(item.id)}
      />
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

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerText}>
          {dueDate ? `Due Date: ${dueDate.toDateString()}` : "Select Due Date"}
        </Text>
      </TouchableOpacity>
      <Picker
        selectedValue={status}
        style={styles.picker}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="Todo" value="todo" />
        <Picker.Item label="In Progress" value="progress" />
        <Picker.Item label="Done" value="done" />
      </Picker>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || dueDate;
            setShowDatePicker(false);
            setDueDate(currentDate);
          }}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={updateTodo ? handleUpdateTodo : handleAddTodo}
      >
        <Text style={styles.buttonText}>{updateTodo ? "Save" : "Add"}</Text>
      </TouchableOpacity>

      {todoItems.length === 0 ? (
        <Text style={styles.noTodoText}>No Available Todo Tasks</Text>
      ) : (
        <FlatList
          data={todoItems}
          renderItem={renderTodos}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 50,
  },
  picker: {
    height: 50,
    width: "100%",
    marginTop: 20,
  },
  datePickerButton: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 20,
    alignItems: "center",
    borderColor: "#1e90ff",
    borderWidth: 2,
  },
  datePickerText: {
    color: "#000",
    fontSize: 16,
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
  todoTextContainer: {
    flex: 1,
    marginLeft: 25,
  },
  todoTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "800",
  },
  todoStatus: {
    color: "#000",
    fontSize: 16,
  },
  todoDueDate: {
    color: "#000",
    fontSize: 14,
    marginTop: 4,
  },
  noTodoText: {
    color: "#888",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default TodoScreen;
