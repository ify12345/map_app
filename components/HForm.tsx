import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import HText from "./HText";
import { RFValue } from "react-native-responsive-fontsize";

interface _iProps {
    placeholder?: string;
    value?: string;
    onChangeText?: any;
    label?: string;
    type?: 2;
    error?: any;
}

const HSearchInput = (props: _iProps) => {
    const { placeholder } = props;
    return (
        <View
            style={[
                styles.inputContainer,
                {
                    backgroundColor: props.type === 2 ? "#f0f0f0" : "#ffffff",
                },
            ]}
        >
            <MagnifyingGlassIcon color="#667185" width={20} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                {...props}
            />
        </View>
    );
};

const HInput = (props: _iProps) => {
    const { placeholder, label, type, error } = props;
    return (
        <View>
            {label && (
                <HText
                    fontSize="14"
                    fontWeight="semibold"
                    textStyle={styles.label}
                >
                    {label}
                </HText>
            )}
            <TextInput
                style={type === 2 ? styles.textInput2 : styles.textInput}
                placeholder={placeholder}
                {...props}
            />
            {error && (
                <HText
                    fontSize="14"
                    color="#667185"
                    textStyle={{ marginTop: 8 }}
                >
                    {error}
                </HText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#D0D5DD",
        height: 48,
        borderRadius: 16,
        alignItems: "center",
        paddingLeft: 10,
        marginBottom: 14,
        backgroundColor: "#fff",
        shadowColor: "#f0f0f0",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 5,
    },
    input: {
        height: 48,
        flexGrow: 1,
        paddingHorizontal: 10,
        fontSize: RFValue(14),
        lineHeight: RFValue(20.03),
    },
    textInput: {
        height: 56,
        flexGrow: 1,
        padding: 16,
        fontSize: RFValue(14),
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#F0F0F0",
    },
    textInput2: {
        backgroundColor: "#F0F0F0",
        height: 56,
        flexGrow: 1,
        padding: 16,
        fontSize: RFValue(14),
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#F0F0F0",
    },
    label: {
        lineHeight: 20,
        marginBottom: 5,
    },
});

export { HSearchInput, HInput };
