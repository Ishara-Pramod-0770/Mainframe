import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import Home from "../Component/Home";
import { ImageBackground } from "react-native";

const dumyData = [
  {
    id: "01",
    title: "Buy Milk",
  },
  {
    id: "02",
    title: "Wash Car",
  },
];

console.log(Date.now().toString());
const TodoScreen = () => {
  //Init local status
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState("");
  const[updateTodo, setUpdateTodo] = useState(null);

  //Handel Add Todo
  const handleAddTodo = () => {
    //Sturture of a single todo item
    // {
    //     id:
    //     title:
    // }
    if(todo===""){
        return; //early return
    }

    //Loop for my todoz
    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo("");
  };

  //Handel Delete Todo
  const handleDeleteTodo = (id) => {
    const deleteTodoList = todoList.filter((todo) => todo.id !== id);

    setTodoList(deleteTodoList);
  };

  //Handel Update Todo
  const handleUpdateTodo = (todo) => {
    setUpdateTodo(todo);
    setTodo(todo.title);
  };

  //Handel Save Todo
  const handleSaveTodo = () => {
    const saveTodo = todoList.map((item)=>{
        if(item.id === updateTodo.id){
            return {...item, title: todo}
        }
        return item;


    });
    setTodoList(saveTodo);
    setUpdateTodo(null);
    setTodo("");
  }

  //Render todo
  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#1e90ff",
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
        }}
      >
        <Text
          style={{ color: "#fff", fontSize: 20, fontWeight: "800", flex: 1 }}
        >
          {item.title}
        </Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleUpdateTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    //     <ImageBackground
    //     source={{ uri: "https://example.com/your-background-image.jpg" }} // Replace with your image URL or local path
    //     style={{ flex: 1, resizeMode: "cover" }}
    //   >

    <ImageBackground
      source={{ uri: "https://example.com/your-background-image.jpg" }}
      // Replace with your image URL or local path
      style={{ flex: 1, resizeMode: "cover" }}
    >
      <View style={{ marginHorizontal: 16, paddingTop: 15 }}>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: "#1e90ff",
            borderRadius: 6,
            paddingVertical: 8,
            paddingHorizontal: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
          }}
          placeholder="Enter your todo"
          value={todo}
          onChangeText={(userText) => setTodo(userText)}
        />


          {
            updateTodo ?         <TouchableOpacity
            style={{
              backgroundColor: "#000",
              borderRadius: 6,
              paddingVertical: 12,
              marginVertical: 34,
              alignItems: "center",
            }}
            onPress={() => handleSaveTodo()}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
              Save
            </Text>
          </TouchableOpacity>:         <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 34,
            alignItems: "center",
          }}
          onPress={() => handleAddTodo()}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Add
          </Text>
        </TouchableOpacity>
          }


        {/* Render todo list */}
        <FlatList data={todoList} renderItem={renderTodos} />

        {todoList.length <= 0 && <Home />}
      </View>
    </ImageBackground>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
