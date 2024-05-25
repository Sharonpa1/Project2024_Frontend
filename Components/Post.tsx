import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button, Pressable, RefreshControl } from 'react-native';
import { editPostRequest, getAllPostsRequest } from '../ServerCalls';
import axios from 'axios';

export type Post = {
    _id: string;
    title: string;
    content: string;
    owner: string;
  };


const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
      try {
        const response = await getAllPostsRequest();
        setPosts(response);

      } catch (error) {
        setError('Error fetching posts');
        console.error('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    };

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
      <Text style={styles.content}>{item.content}</Text>
      <Pressable style={styles.button} onPress={() => handleSaveEdit(item)}>
        <Text style={styles.text}>Save</Text>
      </Pressable>
    </View>
  );

  const handleSaveEdit = async (post : any) =>{
    try {
      // const response = await editPostRequest(post._id, post.subject, post.content);
      // Alert.alert('Success', `${post.owner}`);      
      const response = await editPostRequest(post._id, post.owner, 'cars', 'Sharon123456789');
      Alert.alert('Success', `${response}`);    
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

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.owner}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      {/* <Text>{posts.content}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10,
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
    width: 40,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});

export default PostsList;
