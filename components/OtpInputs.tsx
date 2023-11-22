import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface _props {
    otp?: any;
    handleChange?: any;
    inputs?: any;
}

const OtpInput = (props: _props) => {
    const { otp, handleChange, inputs } = props;

    return (
        <View style={styles.container}>
            {otp.map((digit: any, index: any) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    maxLength={1}
                    onChangeText={(value) => handleChange(value, index)}
                    value={digit}
                    ref={(input) => {
                        inputs[index] = input;
                    }}
                    keyboardType="numeric"
                />
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#5DB400",
        shadowColor: "#f0f0f0",
        shadowOpacity: 10,
        width: 54,
        height: 60,
        textAlign: "center",
        fontSize: 24,
        backgroundColor: "#EDFFDA",
        borderRadius: 6,
    },
});
export default OtpInput;
