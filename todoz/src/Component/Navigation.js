import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TodoScreen from '../Screen/TodoScreen';
import ProgressScreen from '../Screen/ProgressScreen';
import DoneScreen from '../Screen/DoneScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            //Navigation Bar and Icon
            if (route.name === 'Todo') {
              iconName = 'clipboard-list';
            } else if (route.name === 'Progress') {
              iconName = 'progress-clock';
            } else if (route.name === 'Done') {
              iconName = 'check-circle';
            }

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
        <Tab.Screen name="Todo" component={TodoScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Done" component={DoneScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;