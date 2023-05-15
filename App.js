import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './Components/UI/IconButton';
import { Colors } from './constants/olors';
import Map from './screens/Map';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<>
     <StatusBar style="auto" />
    <NavigationContainer>
      <Stack.Navigator     screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: {color: Colors.gray700},
        contentStyle: {backgroundColor: Colors.gray700}
      }}>
      <Stack.Screen name='allPlaces' component={AllPlaces} options={
        ({navigation})=> 
        ({
        title:"Your Favourite Places",
        headerRight: ({tintColor})=> (<IconButton icon="add" size={24} color={tintColor}
        onPress={() => navigation.navigate("addPlace")} />)
        
      })}/>
      <Stack.Screen name='AddPlace' component={AddPlace} options={{
        title: "Add a new Place"
      }}/>
      <Stack.Screen name="Map" component={Map}/>
      </Stack.Navigator>
    </NavigationContainer>
    
      </>    
    
  );
}


