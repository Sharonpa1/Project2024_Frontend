import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Pressable, FlatList } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from '../App';
import { deletePostRequest, editPostRequest, editUserNameRequest, editUserPasswordRequest, getPostsByUserIdRequest } from '../ServerCalls';
import RNPickerSelect from 'react-native-picker-select';


type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type Props = {
    navigation: ProfileNavigationProp;
    user: User;
    setUser: (user: User) => void;
};

type Post = {
  _id: string;
  title: string;
  content: string;
  owner: string;
  isEditMode : boolean;
  // setIsEditMode: (value: boolean) => void;
};

const Tab = createBottomTabNavigator();

const Profile = ({ user, navigation, setUser }: Props) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  // const [isEditDetailsMode, setEditDetailsMode] = useState(false);
  const [isEditNameMode, setEditNameMode] = useState(false);
  const [isEditPasswordMode, setEditPasswordMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');

  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key state

 useEffect(() => {
    // You can add logic here to fetch fresh user details if needed
  }, [refreshKey]); // Depend on refreshKey to trigger refresh
  
  const fetchPosts = async () => {
    try {
          const response = await getPostsByUserIdRequest(user.email);
          setPosts(response);

    } catch (error) {
      setError('Error fetching posts');
      //console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  useEffect(() => {
    // You can add logic here to fetch fresh user details if needed
  }, [refreshKey]); // Depend on refreshKey to trigger refresh

  const handleEditNameSave = async () => {
    if (!newName) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    try { 
      const response = await editUserNameRequest(user._id, newName);
      Alert.alert('Success', 'User name updated successfully');
      setName(newName);
      setEditNameMode(false);
      setNewName('');
      setUser(response);
      setRefreshKey(oldKey => oldKey + 1); // Trigger refresh

    } 
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
              Alert.alert('Error', `Missing name`);
          }
          else if (error.response.status === 401) {
            Alert.alert('Error', `Invalid name`);
        }
          else {
              Alert.alert('Error', `Request failed with status code ${error.response.status}`);
          }
      } else {
        Alert.alert('Error', 'An error occurred during edit user name');
      }
    }
  };

  const handleEditPasswordSave = async () => {
    if (!newPassword) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    try { 
      const response = await editUserPasswordRequest(user._id, newPassword);
      Alert.alert('Success', 'User password updated successfully');
      setEditPasswordMode(false);
      setNewPassword('');
      setUser(response);
    } 
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
              Alert.alert('Error', `Missing password`);
          }
          else if (error.response.status === 401) {
            Alert.alert('Error', `Invalid password`);
        }
          else {
              Alert.alert('Error', `Request failed with status code ${error.response.status}`);
          }
      } else {
        Alert.alert('Error', 'An error occurred during edit user password');
      }
    }
  };

  const handleEditDetailsCancel = () => {
    setEditNameMode(false);
    setEditPasswordMode(false);
    // setEditDetailsMode(false);
    // navigation.navigate('Profile');
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <Text style={styles.subject}>{item.title}</Text>
      <Text style={styles.user}>{item.owner}</Text>
      {!item.isEditMode && <Text style={styles.content}>{item.content}</Text>}
      {item.owner == user.email && !item.isEditMode && <Pressable style={styles.button1} onPress={() => setPostEditMode(item)}>
        <Text style={styles.text}>Edit</Text>
      </Pressable>}
      {item.owner == user.email && !item.isEditMode && <Pressable style={styles.button1} onPress={() => handleDeletePost(item)}>
        <Text style={styles.text}>Delete</Text>
      </Pressable>}
      {item.isEditMode && <Pressable style={styles.button1} onPress={() => handleSaveEdit(item)}>
        <Text style={styles.text}>Save</Text>
      </Pressable>}
      {item.isEditMode && <Pressable style={styles.button1} onPress={() => handleCancelEdit(item)}>
        <Text style={styles.text}>Cancel</Text>
      </Pressable>}


      {item.isEditMode && <Text style={styles.label2}>Subject</Text>}
      {item.isEditMode && <RNPickerSelect
        onValueChange={value => setNewSubject(value)}
        items={[
          { label: 'Houses', value: 'houses' },
          { label: 'Cars', value: 'cars' },
          { label: 'Animals', value: 'animals' },
        ]}
        style={pickerSelectStyles}
        value={newSubject}
      />}

      {item.isEditMode && <Text style={styles.label2}>Content</Text>}
      {item.isEditMode && <TextInput
        style={styles.input2}
        value={newContent}
        onChangeText={setNewContent}
        multiline
        numberOfLines={4}
      />}
    </View>
  );

  const setPostEditMode =  (post : any) =>{
    
    setNewSubject(post.title);  
    setNewContent(post.content);  
    post.isEditMode = true;
  };

  const handleDeletePost = async (post : any) =>{
    try {
      const response = await deletePostRequest(post._id);
      Alert.alert('Success', `The post was deleted successfully!`);    
      fetchPosts();
    } 
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
              Alert.alert('Error', `Missing subject or content`);
          }
          else if (error.response.status === 404) {
            Alert.alert('Error', `Post not found`);
        }
          else {
              Alert.alert('Error', `Request failed with status code ${error.response.status}`);
          }
      } else {
        Alert.alert('Error', 'An error occurred during edit post');
      }
    }
  };

  const handleCancelEdit = (post : any) =>{
    setNewSubject('');  
    setNewContent('');  
    post.isEditMode = false;
  };

  const handleSaveEdit = async (post : any) =>{
    try { 
      const response = await editPostRequest(post._id, post.owner, newSubject, newContent);
      fetchPosts();
      handleCancelEdit(post);
    } 
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
              Alert.alert('Error', `Missing subject or content`);
          }
          else if (error.response.status === 404) {
            Alert.alert('Error', `Post not found`);
        }
          else {
              Alert.alert('Error', `Request failed with status code ${error.response.status}`);
          }
      } else {
        Alert.alert('Error', 'An error occurred during edit post');
      }
    }
  };



  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal Details">
        {/* {props => <UserDetails {...props} userName={userName} />} */}
        {props => 
          <View style={styles.container2}>
            <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
            {!isEditNameMode && !isEditPasswordMode && <Text style={styles.label}>Name: {name}</Text>}
            {!isEditNameMode && !isEditPasswordMode && <Text style={styles.label}>Email: {email}</Text>}
            {/* <Text style={styles.label}>Password: {password}</Text> */}
            {/* <Button title="Edit" onPress={() => setEditMode=(true)} /> */}

            {!isEditNameMode && !isEditPasswordMode && <Pressable style={styles.button2} onPress={() => setEditNameMode(true)}>
              <Text style={styles.text2}>Edit Name</Text>
            </Pressable>}
            {!isEditNameMode && !isEditPasswordMode && <Pressable style={styles.button2} onPress={() => setEditPasswordMode(true)}>
              <Text style={styles.text2}>Edit Password</Text>
            </Pressable>}
            {isEditNameMode && <View>
              <Text style={styles.label}>New Name</Text>
              <TextInput style={styles.input} value={newName} onChangeText={setNewName} />
              <Pressable style={styles.button2} onPress={handleEditNameSave}>
              <Text style={styles.text2}>Save</Text>
              </Pressable>
              <Pressable style={styles.button2} onPress={handleEditDetailsCancel}>
                <Text style={styles.text2}>Cancel</Text>
              </Pressable>
            </View>
            }
             {isEditPasswordMode && <View>
              <Text style={styles.label}>New Password</Text>
              <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} secureTextEntry />
              <Pressable style={styles.button2} onPress={handleEditPasswordSave}>
              <Text style={styles.text2}>Save</Text>
              </Pressable>
              <Pressable style={styles.button2} onPress={handleEditDetailsCancel}>
                <Text style={styles.text2}>Cancel</Text>
              </Pressable>
            </View>
            }
          </View>

          
        }
      </Tab.Screen>
        
      <Tab.Screen name="Posts" options={{ title: 'My Posts' }} >
      {props => <View style={styles.container2}>
          <View style={styles.container2}>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.owner}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
          </View>
            <Button title="Create New Post" onPress={() => navigation.navigate('NewPost')} color='#ff7d03'/>
          </View>}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2b2b2b',
  },
  container2: {
    flex: 1,
    padding: 15,
    backgroundColor: '#2b2b2b',
  },
  tabView: {
    // backgroundColor: '#2b2b2b',
  },
  avatar: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    marginTop: 50
  },
  label: {
    fontSize: 20,
    marginVertical: 10,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  list: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  postItem: {
    backgroundColor: '#545454',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    width: 350,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  subject: {
    fontSize: 18,
    marginTop: 1,
    color: 'white',
    fontWeight: 'bold', 
    backgroundColor: '#2b2b2b',
    borderColor: '#ff7d03',
    borderWidth: 1,
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 1,
    borderRadius: 20
  },
  content: {
    fontSize: 14,
    marginTop: 10,
    color: 'white',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
  button1: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // // paddingVertical: 12,
    // // paddingHorizontal: 32,
    // borderRadius: 20,
    // elevation: 3,
    // backgroundColor: '#ff7d03',
    // marginTop: 20,
    // marginHorizontal: 50,
    // height: 30,
    // // width: 130,

    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#ff7d03',
    marginTop: 2,
    marginLeft: 270,
    height: 20,
    width: 55,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#ff7d03',
    marginVertical: 5,
    marginHorizontal: 50,
    height: 40,
    // width: 200,
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  label2: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  input2: {
    height: 100,
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
    marginBottom: 5,
  },
});


export default Profile;
