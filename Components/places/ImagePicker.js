import { 
    launchCameraAsync, 
    useCameraPermissions, 
    PermissionStatus 
} from "expo-image-picker";
import { useState } from "react";
import { Text, View, Alert, Image, StyleSheet } from "react-native";
import { Colors } from '../../constants/olors';
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker(){
   const [pickedImage, setPickedImage] =useState();
const[ cameraPermissionInformation, requestPermission] = useCameraPermissions();

async function verifyPermissions(){
    if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
        const permissionResponse= await requestPermission();
        
        return permissionResponse.granted;
    }
    if(cameraPermissionInformation.status === PermissionStatus.DENIED){
        Alert.alert("Insufficeint Permissions!",
        "You need to grant camera permissions to use the app"
        );
        return false;   
    }
    return true;
}

    async function takeImageHandler(){
        const hasPermission= await verifyPermissions();
        if(!hasPermission){
            return;
        }
        
        const image= await launchCameraAsync({
            allowsEditing: true,
            aspect:[16,9],
            quality: 1
      });    
        setPickedImage(image.uri);
    }
    let previewImage = <Text>No image taken yet.</Text>

    if(pickedImage){
        previewImage = <Image source={{uri: pickedImage}} style={styles.image}/>
    }

    return (
    <View>
        <View style={styles.imagePreview}>
            {previewImage}
        </View>
        <OutlinedButton icon="camera"
        onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
    );
}
export default ImagePicker;

const styles= StyleSheet.create({
    imagePreview:{
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: "100%",
        height: '100%'
    }
});
// import { Alert, Button, View } from 'react-native';
// import {
//   launchCameraAsync,
//   useCameraPermissions,
//   PermissionStatus,
// } from 'expo-image-picker';

// function ImagePicker() {
//   const [cameraPermissionInformation, requestPermission] =
//     useCameraPermissions();

//   async function verifyPermissions() {
//     if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
//       const permissionResponse = await requestPermission();

//       return permissionResponse.granted;
//     }

//     if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
//       Alert.alert(
//         'Insufficient Permissions!',
//         'You need to grant camera permissions to use this app.'
//       );
//       return false;
//     }

//     return true;    
//   }

//   async function takeImageHandler() {
//     const hasPermission = await verifyPermissions();

//     if (!hasPermission) {
//       return;
//     }

//     const image = await launchCameraAsync({
//       allowsEditing: true,
//       aspect: [16, 9],
//       quality: 0.5,
//     });
//     console.log(image);
//   }

//   return (
//     <View>
//       <View></View>
//       <Button title="Take Image" onPress={takeImageHandler} />
//     </View>
//   );
// }

// export default ImagePicker;