import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type _props = {
    width?: number;
    backgroundColor?: string;
    style?: any;
    children?: any;
    gap?: number;
    onPress?: any;
};

const HTouchableOpacity = (props: _props) => {
    const { width, backgroundColor, style, children, gap } = props;
    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.7}
            style={[
                {
                    width: width || undefined,
                    backgroundColor,
                    borderRadius: 16,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: gap || 16,
                    shadowColor: "#f0f0f0",
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 5,
                },
                style,
            ]}
        >
            {children}
        </TouchableOpacity>
    );
};

export default HTouchableOpacity;
