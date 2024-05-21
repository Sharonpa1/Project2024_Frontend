import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { newPostRequest } from '../ServerCalls';
import axios from 'axios';

const Post = ({ user, navigation }: any) => {
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
        navigation.navigate('Home', { user: user });
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
        // console.error(error);
      }
  };

  const handleCancel = () => {
    setSubject('');
    setContent('');
    navigation.navigate('Home', { user: user });
    // navigation.goBack();
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
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top', // for Android to align text at the top of the TextInput
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
  },
});

export default Post;
