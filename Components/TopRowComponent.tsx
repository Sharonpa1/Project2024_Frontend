import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Profile from './Components/ProfilePage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from '../App';

type TopRowNavigationProp = StackNavigationProp<RootStackParamList, 'TopRow'>;

type Props = {
  navigation: TopRowNavigationProp;
  user: User;
  onLogout: () => void;
};

export default function TopRow({ navigation, user, onLogout }: Props) {

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.user} onPress={() => navigation.navigate('Profile')}>
        <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
        <Text style={styles.userName}>{user.name}</Text>
      </TouchableOpacity>
      <Button title="Logout" onPress={onLogout} color='#ff7d03'/>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#757575',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  user: {
    flexDirection: 'row',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  avatar: {
    alignSelf: 'center',
    height: 30,
    width: 30,
    marginRight: 10
  },
  button: {

  }
});
