// // // import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
// // // import React, { useState, FC } from 'react';
// // // import { NavigationContainer } from '@react-navigation/native';
// // // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // // import StudentAddPage from './Components/StudentAddPage';
// // // import StudentDetailsPage from './Components/StudentDetailsPage';
// // // import StudentListPage from './Components/StudentListPage';
// // // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// // // // const Stack = createNativeStackNavigator();
// // // const Tab = createBottomTabNavigator();
// // // const StudentsListStack = createNativeStackNavigator();

// // // const StudentsListScreen: FC = () => {
// // //   return (
// // //     <StudentsListStack.Navigator>
// // //       <StudentsListStack.Screen name="StudentListPage" component={StudentListPage} options={{ title: 'Students List' }} />
// // //       <StudentsListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{ title: 'Student Details' }} />
// // //       <StudentsListStack.Screen name="StudentAddPage" component={StudentAddPage} options={{ title: 'Add New Student' }} />
// // //     </StudentsListStack.Navigator>
// // //   );
// // // }

// // // export default function App() {
// // //   return (
// // //     <NavigationContainer>
// // //       <Tab.Navigator>
// // //         <Tab.Screen name="StudentsListScreen" component={StudentsListScreen} options={{ headerShown: false }} />
// // //         <Tab.Screen name="StudentAddPage" component={StudentAddPage} options={{ title: 'Add New Student' }} />
// // //       </Tab.Navigator>
// // //     </NavigationContainer >
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     marginTop: StatusBar.currentHeight,
// // //     flex: 1,
// // //     flexDirection: 'column',
// // //   },

// // // });









// // import React from 'react';
// // import { Button, View, Text, StyleSheet } from 'react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
// // import { RouteProp } from '@react-navigation/native';
// // import Register from './Components/RegisterPage';

// // type RootStackParamList = {
// //   Home: undefined;
// //   Register: undefined;
// // };

// // type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
// // type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

// // type Props = {
// //   navigation: HomeScreenNavigationProp;
// //   route: HomeScreenRouteProp;
// // };

// // const Stack = createStackNavigator<RootStackParamList>();

// // function HomeScreen({ navigation }: Props) {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Home Screen</Text>
// //       <Button
// //         title="Go to Register"
// //         onPress={() => navigation.navigate('Register')}
// //       />
// //     </View>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Home">
// //         <Stack.Screen name="Home" component={HomeScreen} />
// //         <Stack.Screen name="Register" component={Register} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //   },
// //   header: {
// //     fontSize: 24,
// //     marginBottom: 20,
// //   },
// // });





// import React from 'react';
// import { Button, View, Text, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';
// import Register from './Components/RegisterPage';
// import Home from './Components/HomePage';

// export type RootStackParamList = {
//   Home: { name: string };
//   Register: undefined;
// };

// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

// type Props = {
//   navigation: HomeScreenNavigationProp;
//   route: HomeScreenRouteProp;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Register">
//         <Stack.Screen name="Home" component={Home} options={({ route }) => ({ title: `Welcome, ${route.params.name}` })} />
//         <Stack.Screen name="Register" component={Register} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });






import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Register from './Components/RegisterPage';
import Home from './Components/HomePage';
import Login from './Components/LoginPage';

export type RootStackParamList = {
  Initial: undefined;
  Home: { name: string };
  Register: undefined;
  Login: undefined;
};

type InitialScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Initial'>;

type Props = {
  navigation: InitialScreenNavigationProp;
};

const Stack = createStackNavigator<RootStackParamList>();

function InitialScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the App</Text>
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen name="Initial" component={InitialScreen} />
        <Stack.Screen name="Home" component={Home} options={({ route }) => ({ title: `${route.params.name}` })} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
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
  },
});