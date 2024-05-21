// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import UserDetails from './UserDetails';
// import { Button } from 'react-native';
// // import UserList from './UserList';

// const Tab = createBottomTabNavigator();

// export default function Profile() {
//   return (
//     // <Button title="Button 1" onPress={() => {}} />
//     <Tab.Navigator>
//       <Tab.Screen name="Personal details" component={UserDetails} options={{ title: 'Details' }} />
//       {/* <Tab.Screen name="My posts" component={UserList} options={{ title: 'List' }} /> */}
//     </Tab.Navigator>
//   );
// }



import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import UserDetails from './UserDetails';
// import UserList from './UserList';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
//import Profile from './Components/ProfilePage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from '../App';


type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type Props = {
    navigation: ProfileNavigationProp;
    user: User;
};


const Tab = createBottomTabNavigator();

const Profile = ({ user, navigation }: Props) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [isEditMode, setEditMode] = useState(false);

  const handleSave = async () => {
    try {
      const response = await axios.put('http://<your-server-ip>:<port>/api/user', { name, password });
      Alert.alert('Success', 'User details updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update user details');
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigation.navigate('Profile');
  };



  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal Details">
        {/* {props => <UserDetails {...props} userName={userName} />} */}
        {props => 
          <View>
            <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
            <Text style={styles.label}>Name: {name}</Text>
            <Text style={styles.label}>Email: {email}</Text>
            {/* <Text style={styles.label}>Password: {password}</Text> */}
            {/* <Button title="Edit" onPress={() => setEditMode=(true)} /> */}

            
            {isEditMode && <View>
              <Text style={styles.label}>New Name</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} />
              <Text style={styles.label}>New Password</Text>
              <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={handleCancel} />
            </View>
            }
          </View>

          
        }
      </Tab.Screen>
      {/* <Tab.Screen name="UserList" component={UserList} options={{ title: 'List' }} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    alignSelf: 'center',
    height: 100,
    width: 100,
  },
  label: {
    fontSize: 20,
    marginVertical: 10,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Profile;
