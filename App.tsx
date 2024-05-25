import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button, Text, Pressable, StyleSheet, Image } from 'react-native';
import Register from './Components/RegisterPage';
import Home from './Components/HomePage';
import Login from './Components/LoginPage';
import Profile from './Components/ProfilePage';
import NewPost from './Components/NewPost';
import TopRow from './Components/TopRowComponent';

export type RootStackParamList = {
  Initial: undefined;
  Register: undefined;
  Login: undefined;
  Home: { user: User };
  Profile: undefined;
  NewPost: undefined;
  TopRow: undefined;
};

export type User = {
  _id: string,
  name: string,
  email: string,
  password: string
};

const Stack = createStackNavigator<RootStackParamList>();

function InitialScreen({ navigation } : any) {
  return (
    <View style={styles.ViewContainer}>
      <Image style={styles.image} source={require('./assets/yad2Logo.png')} />
      <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [userName, setUserName] = useState('');
  const [_user, setUser] = useState<User>({
    _id: '',
    name: '',
    email: '',
    password: '',
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register">
          {props => <Register {...props} setUserName={setUserName} setUser={setUser}/>}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => <Login {...props} setUserName={setUserName} setUser={setUser}/>}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {props => (
            <>
              <TopRow {...props} user={_user} setUser={setUser}/>
              <Home {...props} />
            </>
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {props => (
            <>
              <TopRow {...props} user={_user} setUser={setUser}/>
              <Profile {...props} user={_user} setUser={setUser}/>
            </>
          )}
        </Stack.Screen>
        <Stack.Screen name="NewPost">
          {props => (
            <>
              <NewPost {...props} user={_user}/>
            </>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  ViewContainer: {
    backgroundColor: '#d0d0d0'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'black',
    marginBottom: 30,
    marginHorizontal: 40,
    height: 50
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    alignSelf: 'center',
    height: 200,
    width: 300,
    marginTop: 200,
    marginBottom: 100
  },
});