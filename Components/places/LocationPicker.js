import { StyleSheet, View, Alert } from "react-native";
import { Colors } from "../../constants/olors";
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from "expo-location";
import OutlinedButton from "../UI/OutlinedButton";
import { useNavigation } from "@react-navigation/native";


function LocationPicker(){
const navigation=useNavigation();
const [locationPermissionInformation, requestPermission]= useForegroundPermissions();
  async function verifyPermissions(){
    if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
        const permissionResponse= await requestPermission();
        
        return permissionResponse.granted;
    }
    if(locationPermissionInformation.status === PermissionStatus.DENIED){
        Alert.alert("Insufficeint Permissions!",
        "You need to grant location permissions to use the app"
        );
        return false;   
    }
    return true;
  }  
  async  function getLocationHandler(){
  const hasPermission=  await verifyPermissions();  
    if(!hasPermission){
        return;
    }
    const location= await getCurrentPositionAsync();
      console.log(location);
    }

    function pickOnMapHandler(){
        navigation.navigate("Map")
    }

    return <View>
        <View style={styles.imagePreview}></View>
        <View style={styles.actions}>
            <OutlinedButton onPress={getLocationHandler} icon="location">Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
        </View>
    </View>
}

export default LocationPicker;

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
    actions:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
})