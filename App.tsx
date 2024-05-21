// // import React from 'react';
// // import { Button, View, Text, StyleSheet } from 'react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
// // import { RouteProp } from '@react-navigation/native';
// // import Register from './Components/RegisterPage';
// // import Home from './Components/HomePage';
// // import Login from './Components/LoginPage';

// // export type RootStackParamList = {
// //   Initial: undefined;
// //   Home: { name: string };
// //   Register: undefined;
// //   Login: undefined;
// // };

// // type InitialScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Initial'>;

// // type Props = {
// //   navigation: InitialScreenNavigationProp;
// // };

// // const Stack = createStackNavigator<RootStackParamList>();

// // function InitialScreen({ navigation }: Props) {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Welcome to the App</Text>
// //       <Button
// //         title="Go to Register"
// //         onPress={() => navigation.navigate('Register')}
// //       />
// //       <Button
// //         title="Go to Login"
// //         onPress={() => navigation.navigate('Login')}
// //       />
// //     </View>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Initial">
// //         <Stack.Screen name="Initial" component={InitialScreen} />
// //         <Stack.Screen name="Home" component={Home} options={({ route }) => ({ title: `${route.params.name}` })} />
// //         <Stack.Screen name="Register" component={Register} />
// //         <Stack.Screen name="Login" component={Login} />
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


// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, Button, Text } from 'react-native';
// import Register from './Components/RegisterPage';
// import Home from './Components/HomePage';
// import Login from './Components/LoginPage';
// import Profile from './Components/ProfilePage';
// import TopRow from './Components/TopRowComponent';

// export type RootStackParamList = {
//   Initial: undefined;
//   Register: undefined;
//   Login: undefined;
//   Home: { name: string };
//   Profile: undefined;
// };

// // type InitialScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Initial'>;

// // type Props = {
// //   navigation: InitialScreenNavigationProp;
// // };


// const Stack = createStackNavigator<RootStackParamList>();

// function InitialScreen({ navigation } : any) {
//   return (
//     <View>
//       <Button title="Register" onPress={() => navigation.navigate('Register')} />
//       <Button title="Login" onPress={() => navigation.navigate('Login')} />
//     </View>
//   );
// }

// export default function App() {
//   const [userName, setUserName] = useState('');

//   const handleLogout = () => {
//     setUserName('');
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Initial"
//           component={InitialScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="Register">
//           {props => <Register {...props} setUserName={setUserName} />}
//         </Stack.Screen>
//         <Stack.Screen name="Login">
//           {props => <Login {...props} setUserName={setUserName} />}
//         </Stack.Screen>
//         <Stack.Screen name="Home">
//           {props => (
//             <>
//               <TopRow userName={userName} onLogout={handleLogout} />
//               <Home {...props} />
//             </>
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="Profile">
//           {props => (
//             <>
//               <TopRow userName={userName} onLogout={handleLogout} />
//               <Profile {...props} setUserName={setUserName} />
//             </>
//           )}
//         </Stack.Screen>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button, Text, Pressable, StyleSheet, Image } from 'react-native';
import Register from './Components/RegisterPage';
import Home from './Components/HomePage';
import Login from './Components/LoginPage';
import Profile from './Components/ProfilePage';
import NewPost from './Components/NewPost';
import TopRow from './Components/TopRowComponent';
// import UserDetails from './Components/UserDetails';

export type RootStackParamList = {
  Initial: undefined;
  Register: undefined;
  Login: undefined;
  Home: { user: User };
  Profile: undefined;
  Post: undefined;
  TopRow: undefined;
  // UserDetails: undefined;
};

export type User = {
  name: string,
  email: string,
  password: string
};

const Stack = createStackNavigator<RootStackParamList>();

function InitialScreen({ navigation } : any) {
  return (
    <View style={styles.ViewContainer}>
      {/* <Button title="Register" onPress={() => navigation.navigate('Register')}/>
      <Button title="Login" onPress={() => navigation.navigate('Login')} /> */}

      <Image style={styles.image} source={require('./assets/yad2Logo.png')} />
      <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [userName, setUserName] = useState('');
  const [_user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
  });

  const handleLogout = () => {
    setUserName('');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register">
          {props => <Register {...props} setUserName={setUserName} setUser={setUser}/>}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => <Login {...props} setUserName={setUserName} setUser={setUser}/>}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {props => (
            <>
              <TopRow {...props} user={_user} onLogout={handleLogout}/>
              <Home {...props} />
            </>
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {props => (
            <>
              <TopRow {...props} user={_user} onLogout={handleLogout}/>
              <Profile {...props} user={_user}/>
            </>
          )}
        </Stack.Screen>
        <Stack.Screen name="Post">
          {props => (
            <>
              <NewPost {...props} user={_user}/>
            </>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  ViewContainer: {
    backgroundColor: '#d0d0d0'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'black',
    marginBottom: 30,
    marginHorizontal: 40,
    height: 50
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    marginTop: 200,
    marginBottom: 100
  },
});