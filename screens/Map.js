import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import IconButton from "../Components/UI/IconButton";

export default function Map({navigation}) {
  const [selectedLocation, setSelectedLocaation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocaation({ lat: lat, lng: lng });
  }


  const savePickedLocationHandler= useCallback(() => {
    if(!selectedLocation){
      Alert.alert("No Location Picked.", 
      "You have to pick a location (by tapping on map) first!");
      return;
    }    
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng
    })

  },[navigation, selectedLocation])

  useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
        icon="save"
        size={24}
        color={tintColor}
        onPress={savePickedLocationHandler}
        />
      ),
    }
    );
  },[navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
