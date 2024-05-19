import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function Home({ navigation, route }: Props) {
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {name}!</Text>
      <Button title="Button 1" onPress={() => {}} />
      <Button title="Button 2" onPress={() => {}} />
      <Button title="Button 3" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
