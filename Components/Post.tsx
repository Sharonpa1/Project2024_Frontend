// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import axios from 'axios';
// import { getAllPostsRequest } from '../ServerCalls';

// export type Post = {
//     user: string;
//     subject: string;
//     content: string;
//   };

// const PostsList = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await getAllPostsRequest();
//         console.log(`${response[0]}`);
//         setPosts(response.data);
//       } catch (error) {
//         setError('Error fetching posts');
//         console.error('Error fetching posts', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.error}>{error}</Text>
//       </View>
//     );
//   }

//   const renderItem = ({ item }: { item: Post }) => (
//     <View style={styles.postItem}>
//       <Text style={styles.subject}>{item.subject}</Text>
//       <Text style={styles.content}>{item.content}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.user}
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   postItem: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 8,
//   },
//   subject: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   content: {
//     fontSize: 14,
//     marginTop: 5,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   error: {
//     fontSize: 18,
//     color: 'red',
//   },
// });

// export default PostsList;


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getAllPostsRequest } from '../ServerCalls';

export type Post = {
    title: string;
    content: string;
    owner: string;
  };

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
//   const [posts, setPosts] = useState<Post>({user: '', subject: '', content: ''});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPostsRequest();
        // console.log(`${response[0].owner.toString()}`);
        setPosts(response);

      } catch (error) {
        setError('Error fetching posts');
        console.error('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    };

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
    </View>
  );

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
});

export default PostsList;
