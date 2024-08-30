import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LetsStartScreen from './Screens/LetsStartScreen';
import TabNavigator from './navigation/TabNavigator';
import TabNav from './navigation/TabNav';

// Screens
import Search from "./Screens/Search"
import Find from "./Screens/Find"
import Login from './Screens/Login';
import AuthScreen from './Screens/AuthScreen';
import UpdateProfile from './Screens/UpdateProfile';
import ForgotPassword from './Screens/ForgotPassword';
import ConfirmUser from './Screens/ConfirmUser';
import DetailScreen from './Screens/DetailScreen';

const Stack = createNativeStackNavigator();

const Main = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="LetsStart">
          <Stack.Screen options={{ headerShown: false }} name="LetsStart" component={LetsStartScreen} />

          <Stack.Screen options={{
            headerStyle: { backgroundColor: '#14b85d' },
            headerTitle: "SEARCH",
            headerTitleStyle: { 
              color: 'white',
              fontWeight: "bold",
              fontSize: 25, 
            },
            headerTintColor: 'white',

          }}  name="search" component={Search} />

          <Stack.Screen options={{
            headerStyle: { backgroundColor: '#14b85d' },
            headerTitle: "FIND",
            headerTitleStyle: { 
              color: 'white',
              fontWeight: "bold",
              fontSize: 25,
            },
            headerTintColor: 'white',

          }} name="find" component={Find} />

          <Stack.Screen options={{ headerStyle: { backgroundColor: '#14b85d' }, headerTitle: "CONNEXION", headerTitleStyle: { 
              color: 'white',
              fontWeight: "bold",
              fontSize: 25,
            },
            headerTintColor: 'white',

          }} name="login" component={Login} />

          <Stack.Screen options={{ headerStyle: { backgroundColor: '#14b85d' }, headerTitle: "INSCRIPTION", headerTitleStyle: { 
              color: 'white',
              fontWeight: "bold",
              fontSize: 25,
            },
            headerTintColor: 'white',

          }} name="authScreen" component={AuthScreen} />

          <Stack.Screen options={{ headerShown: false }} name="confirmUser" component={ConfirmUser} />

          <Stack.Screen options={{ headerStyle: { backgroundColor: '#14b85d' }, headerTitle: "MIS A JOUR PROFIL", headerTitleStyle: { 
              color: 'white',
              fontWeight: "bold",
              fontSize: 25,
            },
            headerTintColor: 'white',

          }} name="updateProfile" component={UpdateProfile} />

          <Stack.Screen options={{ headerStyle: { backgroundColor: '#14b85d' }, headerTitle: "MOT DE PASSE OUBLIER", headerTitleStyle: { 
              color: 'white',
              fontWeight: "bold",
              fontSize: 25,
            },
            headerTintColor: 'white',

          }} name="forgotPass" component={ForgotPassword} />

          <Stack.Screen options={{
            headerStyle: { backgroundColor: '#14b85d' },
            headerTitle: "DETAIL",
            headerTitleStyle: { 
              color: 'white',
              fontWeight: "bold",
              fontSize: 25,
            },
            headerTintColor: 'white',

          }}  name="DetailScreen" component={DetailScreen} 
            
            />

          <Stack.Screen options={{ headerShown: false }} name="MainTabs" component={TabNavigator} />

          <Stack.Screen 
            options={{ 
              headerTitle: '',
              headerBackTitleVisible: false,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#14b85d' },
              headerShown: false,
              }} 
              name="TabsAuth" 
              component={TabNav} 
            />
        </Stack.Navigator>
    </NavigationContainer>
    )
} 

export default Main