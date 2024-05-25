// // // import React, { useState } from 'react';
// // // import { View, Button, Image, StyleSheet, Alert } from 'react-native';
// // // import { launchImageLibrary } from 'react-native-image-picker';
// // // import axios from 'axios';

// // // const PhotoUpload = () => {
// // //   const [photo, setPhoto] = useState(null);

// // //   const selectPhoto = () => {
// // //     launchImageLibrary({
// // //         mediaType: 'photo'
// // //     }, (response) => {
// // //       if (response.didCancel) {
// // //         console.log('User cancelled image picker');
// // //       } else if (!response) {
// // //         console.log('ImagePicker Error: ', response);
// // //       } else {
// // //         const source = { uri: response.assets?[0].uri, type: response.assets?[0].type, name: response.assets?[0].fileName };
// // //         setPhoto(source);
// // //       }
// // //     });
// // //   };

// // //   const uploadPhoto = async () => {
// // //     if (!photo) {
// // //       Alert.alert('No photo selected', 'Please select a photo first');
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('photo', photo);

// // //     try {
// // //       const response = await axios.post('http://<your-server-ip>:3000/upload', formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data',
// // //         },
// // //       });
// // //       Alert.alert('Upload Successful', 'Photo uploaded successfully');
// // //     } catch (error) {
// // //       console.error(error);
// // //       Alert.alert('Upload Failed', 'Failed to upload photo');
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       {photo && <Image source={{ uri: photo.uri }} style={styles.image} />}
// // //       <Button title="Select Photo" onPress={selectPhoto} />
// // //       <Button title="Upload Photo" onPress={uploadPhoto} />
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   image: {
// // //     width: 200,
// // //     height: 200,
// // //     marginBottom: 20,
// // //   },
// // // });

// // // export default PhotoUpload;



// // import { useState } from 'react';
// // import { Button, Image, View, StyleSheet } from 'react-native';
// // import * as ImagePicker from 'expo-image-picker';

// // export default function ImagePickerExample() {
// //   const [image, setImage] = useState(null);

// //   const pickImage = async () => {
// //     // No permissions request is necessary for launching the image library
// //     let result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.All,
// //       allowsEditing: true,
// //       aspect: [4, 3],
// //       quality: 1,
// //     });

// //     console.log(result);

// //     if (!result.canceled) {
// //       setImage(result.assets[0].uri);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Button title="Pick an image from camera roll" onPress={pickImage} />
// //       {image && <Image source={{ uri: image }} style={styles.image} />}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   image: {
// //     width: 200,
// //     height: 200,
// //   },
// // });



// import { MediaTypeOptions } from 'expo-image-picker';
// import React, { useState } from 'react';
// import { Button, Image, View, Platform } from 'react-native';
// import { launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera , ImageLibraryOptions} from 'react-native-image-picker';
// let launchImageLibrary = _launchImageLibrary;
// let launchCamera = _launchCamera;
// const App = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const openImagePicker = () => {
//     const options = {
//       mediaType: '',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//     };

//     launchImageLibrary(options, handleResponse);
//   };

//   const handleCameraLaunch = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//     };

//     launchCamera(options, handleResponse);
//   };

//   const handleResponse = (response: { didCancel: any; error: any; uri: any; assets: { uri: any; }[]; }) => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('Image picker error: ', response.error);
//     } else {
//       let imageUri = response.uri || response.assets?.[0]?.uri;
//       setSelectedImage(imageUri);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center' }}>
//       {selectedImage && (
//         <Image
//           source={{ uri: selectedImage }}
//           style={{ flex: 1 }}
//           resizeMode="contain"
//         />
//       )}
//       <View style={{ marginTop: 20 }}>
//         <Button title="Choose from Device" onPress={openImagePicker} />
//       </View>
//       <View style={{ marginTop: 20, marginBottom: 50 }}>
//         <Button title="Open Camera" onPress={handleCameraLaunch} />
//       </View>
//     </View>
//   );
// };

// export default App;