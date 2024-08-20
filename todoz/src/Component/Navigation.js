import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { NavigationContainer } from '@react-navigation/native'; 
import TodoScreen from '../Screen/TodoScreen'; 
import ProgressScreen from '../Screen/ProgressScreen'; 
import DoneScreen from '../Screen/DoneScreen'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator(); // Creating a Tab navigator instance

const Navigation = () => { // Defining the main navigation component
  return (
    <NavigationContainer> 
      <Tab.Navigator
        screenOptions={({ route }) => ({ // Defining screen options based on the current route
          tabBarIcon: ({ color, size }) => { // Setting up tab icons based on route name
            let iconName;
            // Icon for DoneScreen, ProgressScreen, TodoScreen
            if (route.name === 'Todo') {
              iconName = 'clipboard-list'; 
            } else if (route.name === 'Progress') {
              iconName = 'progress-clock'; 
            } else if (route.name === 'Done') {
              iconName = 'check-circle'; 
            }

            // Returning the appropriate icon
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />; 
          },
          tabBarLabelStyle: {
            fontSize: 12, 
          },
          tabBarActiveTintColor: '#000', 
          tabBarInactiveTintColor: 'gray', 
          tabBarStyle: {
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            elevation: 0, 
            backgroundColor: '#ffffff', 
            borderTopWidth: 0, 
            height: 60, 
          },
        })}
      >
        <Tab.Screen name="Todo" component={TodoScreen} /> {/* Registering the TodoScreen with the tab navigator */}
        <Tab.Screen name="Progress" component={ProgressScreen} /> {/* Registering the ProgressScreen with the tab navigator */}
        <Tab.Screen name="Done" component={DoneScreen} /> {/* Registering the DoneScreen with the tab navigator */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 
