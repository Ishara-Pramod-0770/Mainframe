import React, { useState, useContext } from 'react'; 
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'; 
import { IconButton } from 'react-native-paper'; 
import { Picker } from '@react-native-picker/picker'; 
import { TodoContext } from '../Contexts/TodoContext'; 
import DateTimePicker from "@react-native-community/datetimepicker"; 

const DoneScreen = () => {
  const [todo, setTodo] = useState(""); // State for todo text
  const [status, setStatus] = useState("done"); 
  const [updateTodo, setUpdateTodo] = useState(null); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState(new Date()); 
  const { todoList, addTodo, updateTodo: updateTodoInContext, deleteTodo } = useContext(TodoContext);

  // Add a done task
  const handleAddTodo = () => {
    if (todo === "") return;

    addTodo({
      id: Date.now().toString(), // Generate unique ID
      title: todo, 
      status, 
      dueDate: dueDate.toISOString().split("T")[0], 
    });
    setTodo(""); // Clear todo input
    setStatus("done"); // Reset status
    setDueDate(new Date()); // Reset due date
  };

  // Delete a done task
  const handleDeleteTodo = (id) => {
    Alert.alert(
      "Confirm Delete", 
      "Are you sure you want to delete this todo?", 
      [
        { text: "Cancel", style: "cancel" }, 
        {
          text: "Delete",
          onPress: () => deleteTodo(id), // Delete the task
          style: "destructive",
        },
      ]
    );
  };

  // Update a done task
  const handleUpdateTodo = () => {
    updateTodoInContext({
      ...updateTodo, 
      title: todo,
      status, 
      dueDate: dueDate.toISOString().split("T")[0], 
    });
    setUpdateTodo(null); // Clear update state
    setTodo(""); 
    setStatus("done"); 
    setDueDate(new Date()); 
  };

  // Filter todos by status 'done'
  const doneTodos = todoList.filter((item) => item.status === "done");

  // Render each todo item
  const renderTodos = ({ item }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoDetails}>
        <Text style={styles.todoTitle}>{item.title}</Text> {/*Show todo title*/}
        <Text style={styles.todoStatus}>Status: {item.status}</Text>
        <Text style={styles.todoDueDate}>Due Date: {item.dueDate}</Text> 
      </View>
      <View style={styles.todoActions}>
        <IconButton
          icon="pencil" 
          iconColor="#000" 
          onPress={() => {
            setUpdateTodo(item); // Set the selected todo for editing
            setTodo(item.title); // Set the todo title in input
            setStatus(item.status); 
            setDueDate(new Date(item.dueDate)); 
          }}
        />
        <IconButton
          icon="trash-can" 
          iconColor="#000" 
          onPress={() => handleDeleteTodo(item.id)} // Delete the selected todo
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder="Enter your todo" 
        value={todo} // Current input value
        onChangeText={(userText) => setTodo(userText)} // Update input value
      />
      
      {showDatePicker && ( // Show date picker if true
        <DateTimePicker
          value={dueDate} // Current selected date
          mode="date" 
          display="default" // Date picker display style
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || dueDate; // Update selected date
            setShowDatePicker(false); // Hide date picker
            setDueDate(currentDate); // Set new due date
          }}
        />
      )}
      <TouchableOpacity
        style={styles.datePickerButton} 
        onPress={() => setShowDatePicker(true)} // Show date picker on press
      >
        <Text style={styles.datePickerText}>
          {dueDate ? `Due Date: ${dueDate.toDateString()}` : "Select Due Date"} 
        </Text>
      </TouchableOpacity>
      <Picker
        selectedValue={status} // Current selected status
        style={styles.picker} 
        onValueChange={(itemValue) => setStatus(itemValue)} // Update selected status
      >
        <Picker.Item label="Todo" value="todo" />
        <Picker.Item label="In Progress" value="progress" /> 
        <Picker.Item label="Done" value="done" /> 
      </Picker>
      <TouchableOpacity
        style={styles.button} 
        onPress={updateTodo ? handleUpdateTodo : handleAddTodo} // Save or add todo on press
      >
        <Text style={styles.buttonText}>{updateTodo ? "Save" : "Add"}</Text> // Show Save or Add text
      </TouchableOpacity>

      {doneTodos.length === 0 ? ( // If no todos are done
        <Text style={styles.noTodoText}>No Available Done Todo Task</Text>
      ) : (
        <FlatList
          data={doneTodos} // List of done todos
          renderItem={renderTodos} // Render each todo
          keyExtractor={(item) => item.id} // Unique key for each todo
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
    width: '100%', 
    marginTop: 20, 
  },
  datePickerText: {
    color: "#000", 
    fontSize: 16, 
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
    paddingHorizontal: 12, 
    paddingVertical: 12,
    marginBottom: 12, 
    flexDirection: "row", 
    alignItems: "center", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 3, 
  },
  todoDetails: {
    flex: 1, 
  },
  todoActions: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  todoTitle: {
    color: "#000", 
    fontSize: 20, 
    fontWeight: "800",
  },
  todoStatus: {
    color: "#000",
    fontSize: 16, 
    marginTop: 4, 
  },
  todoDueDate: {
    color: "#000", 
    fontSize: 14, 
    marginTop: 4, 
  },
  noTodoText: {
    color: "#888", 
    fontSize: 18, 
    textAlign: 'center', 
    marginTop: 20,
  },
});

export default DoneScreen;
