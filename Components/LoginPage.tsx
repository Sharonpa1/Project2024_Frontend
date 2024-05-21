import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, User } from '../App';
import axios from 'axios';
import { loginRequest } from '../ServerCalls';

// import SecureStorage from 'react-native-secure-storage';

// // Store tokens
// async function storeTokens(accessToken, refreshToken) {
//   await SecureStorage.setItem('accessToken', accessToken);
//   await SecureStorage.setItem('refreshToken', refreshToken);
// }

// // Retrieve tokens
// async function getAccessToken() {
//   return await SecureStorage.getItem('accessToken');
// }

// async function getRefreshToken() {
//   return await SecureStorage.getItem('refreshToken');
// }


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
  setUserName: (name: string) => void;
  setUser: (user: User) => void;
};

export default function Login({ navigation, setUserName, setUser}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    try {
      const response = await loginRequest(email, password);
      Alert.alert('Success', `Welcome, ${response.user.name}!`);
      setUserName(response.user.name);
      setUser(response.user);
      navigation.navigate('Home', { user: response.user });
    } 
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
              Alert.alert('Error', `Missing email or password`);
          }
          else if (error.response.status === 401) {
              Alert.alert('Error', `invalid email or password`);
          }
          else {
              Alert.alert('Error', `Request failed with status code ${error.response.status}`);
          }
      } else {
        Alert.alert('Error', 'An error occurred during login');
      }
      // console.error(error);
    }
  };

  const handleCancel = () => {
    navigation.navigate('Initial');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* <Button title="Login" onPress={handleLogin} />
      <Button title="Cancel" onPress={handleCancel} /> */}

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleCancel}>
        <Text style={styles.text}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#d0d0d0',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#ff7d03',
    marginTop: 20,
    marginHorizontal: 40,
    height: 40
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
