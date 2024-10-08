import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import AuthScreen from '../Screens/AuthScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Auth') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
       headerShown: false,
       tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    //   tabBarOptions={{
    //     tabBarActiveTintColor: 'tomato',
    //     tabBarInactiveTintColor: 'gray',
    //   }}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Auth" component={AuthScreen} />
    </Tab.Navigator>
    )
    
} 

export default TabNavigator