import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Pressable } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { newPostRequest } from '../ServerCalls';
import axios from 'axios';

const NewPost = ({ user, navigation }: any) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!subject || !content) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    
    try {
        const response = await newPostRequest(user, subject, content);
        Alert.alert('Success', 'Post saved successfully');
        // navigation.navigate('Home', { user: user });
        navigation.goBack();
      } 
      catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 400) {
                Alert.alert('Error', `Missing details`);
            }
            else {
                Alert.alert('Error', `Request failed with status code ${error.response.status}`);
            }
        } else {
          Alert.alert('Error', 'An error occurred during creating new post');
        }
      }
  };

  const handleCancel = () => {
    setSubject('');
    setContent('');
    // navigation.navigate('Home', { user: user });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Subject</Text>
      <RNPickerSelect
        onValueChange={value => setSubject(value)}
        items={[
          { label: 'Houses', value: 'houses' },
          { label: 'Cars', value: 'cars' },
          { label: 'Animals', value: 'animals' },
        ]}
        style={pickerSelectStyles}
        value={subject}
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonCancel} onPress={handleCancel}>
          <Text style={styles.text}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.buttonSave} onPress={handleSave}>
          <Text style={styles.text}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2b2b2b',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    height: 300,
    borderColor: '#2b2b2b',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#545454',
    color: 'white',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSave: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#ff7d03',
    marginTop: 10,
    // marginHorizontal: 40,
    height: 40,
    width: 100
  },
  buttonCancel: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#545454',
    marginTop: 10,
    // marginHorizontal: 40,
    height: 40,
    width: 100
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#545454',
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'white',
    paddingRight: 30,
    marginBottom: 20,
  },
});

export default NewPost;
