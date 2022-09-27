import { Dimensions, StyleSheet } from "react-native";

const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({

    title: {
        padding: 10,
        borderBottomColor: "red",
        borderBottomWidth: 2,
    },
    linear: {
        flex:1
    }
    
});