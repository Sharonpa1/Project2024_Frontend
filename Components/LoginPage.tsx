import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import axios from 'axios';
import { loginRequest } from '../ServerCalls';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

export default function Login({ navigation }: Props) {
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
      Alert.alert('Success', `Welcome, ${response.email}!`);
      navigation.navigate('Home', { name: response.name });
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
