import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeAuth from '../Screens/HomeAuth';
import Profile from '../Screens/Profile';

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'LinkProfile') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
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
        <Tab.Screen name="LinkProfile" component={HomeAuth} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    )
    
} 

export default TabNav