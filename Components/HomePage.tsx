import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import Post from './Post';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button, Pressable, RefreshControl, TextInput } from 'react-native';
import { editPostRequest, getAllPostsRequest, deletePostRequest, getPostsByUserIdRequest } from '../ServerCalls';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { LogBox } from 'react-native';

// Ignore all log notifications
LogBox.ignoreAllLogs(true);
// LogBox.ignoreLogs([
//   'Warning: ...', 
// ]);


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export type Post = {
  _id: string;
  title: string;
  content: string;
  owner: string;
  isEditMode : boolean;
  setIsEditMode: (value: boolean) => void;
};

export default function Home({ navigation, route }: Props) {
  const { user } = route.params;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key state

  const fetchPosts = async () => {
      try {
        const response = await getAllPostsRequest();
        setPosts(response);

      } catch (error) {
        setError('Error fetching posts');
        //console.error('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    };

    useFocusEffect(
      React.useCallback(() => {
        fetchPosts();
      }, [])
    );
    
    useEffect(() => {
      fetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <Text style={styles.subject}>{item.title}</Text>
      <Text style={styles.user}>{item.owner}</Text>
      {!item.isEditMode && <Text style={styles.content}>{item.content}</Text>}
      {item.owner == user.email && !item.isEditMode && <Pressable style={styles.button} onPress={() => setPostEditMode(item)}>
        <Text style={styles.text}>Edit</Text>
      </Pressable>}
      {item.owner == user.email && !item.isEditMode && <Pressable style={styles.button} onPress={() => handleDeletePost(item)}>
        <Text style={styles.text}>Delete</Text>
      </Pressable>}
      {item.isEditMode && <Pressable style={styles.button} onPress={() => handleSaveEdit(item)}>
        <Text style={styles.text}>Save</Text>
      </Pressable>}
      {item.isEditMode && <Pressable style={styles.button} onPress={() => handleCancelEdit(item)}>
        <Text style={styles.text}>Cancel</Text>
      </Pressable>}


      {item.isEditMode && <Text style={styles.label}>Subject</Text>}
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

      {item.isEditMode && <Text style={styles.label}>Content</Text>}
      {item.isEditMode && <TextInput
        style={styles.input}
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
      const response = await editPostRequest(post._id, newSubject, newContent);
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
    <View style={styles.container}>
      {/* <Post/> */}
      <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.owner}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
      <Button title="Create New Post" onPress={() => navigation.navigate('NewPost')} color='#ff7d03'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b2b2b',
    paddingBottom: 10
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
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
  button: {
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
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
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
