import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable, TouchableHighlight, Image } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, User } from '../App';
import { registerRequest, loginRequest } from '../ServerCalls';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import PhotoUpload from './PhotoUpload';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
  setUserName: (name: string) => void;
  setUser: (user: User) => void;
};

export default function Register({ navigation, setUserName, setUser }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState(false);
  const [imageURI, setImageURI] = useState('');



  const requestPermission = async () =>{
    const res = await ImagePicker.requestCameraPermissionsAsync();
    if(!res.granted){
      alert("You need to accept camera pemissions");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  
const selectImage = async () => {
  try {
  const result = await ImagePicker.launchCameraAsync()
  if (!result.canceled) {
    console.log("uri:" + result);
    // setImageURI(result.assets.);
  } 
} catch (error) {
  console.log("error:" + error)
  }
}

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }


    try {
        setRegisterError(false);
        const response = await registerRequest(name, email, password);
        // //const responseLogin = await loginRequest(response.email, response.password);
        // // Alert.alert('Success', `Welcome, ${responseLogin.user.name}!`);
        // // setUserName(responseLogin.user.name);
        // // navigation.navigate('Home', { name: responseLogin.user.name });
        // Alert.alert('Success', `Welcome, ${response.name}!`);
        // setUserName(response.name);
        // navigation.navigate('Home', { name: response.name });
      } 
      catch (error) {
        setRegisterError(true);
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 400) {
                Alert.alert('Error', `Missing email or password`);
            }
            else if (error.response.status === 401) {
                Alert.alert('Error', `User with the same email is already exists`);
            }
            else {
                Alert.alert('Error', `Request failed with status code ${error.response.status}`);
            }
        } else {
          Alert.alert('Error', 'An error occurred during registration');
        }
        // console.error(error);
      }

      try {
        if(!registerError){
          const response = await loginRequest(email, password);
          Alert.alert('Success', `Welcome, ${response.user.name}!`);
          setUserName(response.user.name);
          setUser(response.user);
          navigation.navigate('Home', { user: response.user });
        }
        
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
      {/* <PhotoUpload/> */}
      {/* <View style={styles.image_picker}>
        {imageURI != "" && <Image style={styles.image} source={{ uri: imageURI }}/>} 
        {imageURI == "" && <Image style={styles.image} source={ require('../assets/avatar.jpeg')}/>}
        {/* <TouchableHighlight style={styles.image_picker_button} onPress={takePicture} underlayColor={colors.table_selected}>
          <Ionicons name={"camera"} size={50} color={colors.icon_normal} /> </TouchableHighlight> */}
        {/* <TouchableHighlight style={styles.gallery_picker_button} */}
        {/* <TouchableHighlight style={styles.image_picker_button} onPress={selectImage}> */}
        {/* underlayColor={colors.table_selected}> */}
        {/* <Ionicons name={"images"} size={40} color={colors.icon_normal} /> */}
        {/* </TouchableHighlight> */}
      {/* </View> */}

      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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

      {/* <Button title="Register" onPress={handleRegister} />
      <Button title="Cancel" onPress={handleCancel} /> */}

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.text}>Register</Text>
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
  
image_picker: { 
  height: 250,
  width: "100%",
  justifyContent: "center", 
  alignItems: "center"
},
image: {
  flex: 1,
  height: 250,
  width: "100%",
  resizeMode: "contain"
},
image_picker_button: {
  position: "absolute",
  bottom: -10,
  left: 5
}
});
