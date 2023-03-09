import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/olors";

function OutlinedButton({ onPress, icon, children}){
    return <Pressable style={({pressed})=> [styles.button, pressed && styles.pressed]}  onPress={onPress}>
        <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500}/>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

export default OutlinedButton;

const styles= StyleSheet.create({
    button:{
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent:'center',
        alignItems: "center",
        borderColor: Colors.primary500,
    },
    pressed:{
        opacity: 0.7
    },
    icon:{
        marginLeft: 6
    },
    text:{
        color: Colors.primary500
    }
});