// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// //import Profile from './Components/ProfilePage';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../App';

// type UserDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetails'>;

// type Props = {
//     navigation: UserDetailsNavigationProp;
//     userName: string;
// };

// export default function UserDetails({navigation, userName }: Props) {
//   const [name, setName] = useState(userName);
//   const [password, setPassword] = useState('');

//   const handleSave = async () => {
//     try {
//       const response = await axios.put('http://<your-server-ip>:<port>/api/user', { name, password });
//       Alert.alert('Success', 'User details updated successfully');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update user details');
//       console.error(error);
//     }
//   };

//   const handleCancel = () => {
//     navigation.navigate('Profile');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Name</Text>
//       <TextInput style={styles.input} value={name} onChangeText={setName} />
//       <Text style={styles.label}>Password</Text>
//       <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
//       <Button title="Save" onPress={handleSave} />
//       <Button title="Cancel" onPress={handleCancel} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   label: {
//     fontSize: 18,
//     marginVertical: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });
