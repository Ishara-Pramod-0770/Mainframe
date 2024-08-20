import { Text, View, ImageBackground, Image } from "react-native";
import React from "react";

const Home = () => {
  return (
    <ImageBackground 
      // source={require("../../assets/image_01.jpeg")} 
      style={{
        flex: 1,
        resizeMode: "cover", // Ensure the image covers the entire screen
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
      }}
    >
      <View 
        style={{
          flex: 1,
          justifyContent: "center", // Center content vertically within the container
          alignItems: "center", // Center content horizontally within the container
        }}
      >
        <Text 
          style={{
            fontSize: 30, // Set the font size of the text
            fontWeight: "100", // Set the font weight of the text
            color: "white", // Set the text color to white for better contrast
          }}
        >
          Welcome to Todo....
        </Text> 
      </View>
    </ImageBackground>
  );
};

export default Home;