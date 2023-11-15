import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ChevronLeftIcon from "../assets/icons/ChevronLeftIcon";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
        >
            <ChevronLeftIcon />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    back: {
        width: 20,
        height: 20,
    },
});

export default BackButton;
