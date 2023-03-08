import PlaceItem from "./PlaceItem";

const { FlatList, View, Text, StyleSheet } = require("react-native");

function PlaceList({places}){
    if(!places || places.length ===0){
        return <View style={styles.fallBackComtainer}>
            <Text style={styles.fallBackText}>No place added yet - Start adding some.</Text>
        </View>
    }

    return(
        <FlatList data={places}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=> <PlaceItem place={item}/>}
        />
    );
}

export default PlaceList;

const styles= StyleSheet.create({
    fallBackComtainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fallBackText:{
        fontSize: 18
    }
})