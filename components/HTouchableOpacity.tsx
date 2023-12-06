import {
    View,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React from "react";

type _props = {
    width?: number;
    backgroundColor?: string;
    style?: any;
    children?: any;
    gap?: number;
    onPress?: any;
    disabled?: boolean;
    loading?: boolean;
};

const HTouchableOpacity = (props: _props) => {
    const { width, backgroundColor, style, children, gap, disabled, loading } =
        props;
    return (
        <TouchableOpacity
            {...props}
            disabled={disabled}
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
                    opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
        >
            {loading ? <ActivityIndicator /> : children}
        </TouchableOpacity>
    );
};

export default HTouchableOpacity;
