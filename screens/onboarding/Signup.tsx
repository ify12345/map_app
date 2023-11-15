import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Platform,
    Touchable,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import HText from "../../components/HText";
import { HCheckbox, HInput } from "../../components/HForm";
import HTouchableOpacity from "../../components/HTouchableOpacity";
import { devInstance } from "../../store/devInstance";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const signupImage = require("../../assets/images/signup-screen.png");

const Signup = () => {
    const navigation: any = useNavigation();
    const [checked, setChecked] = useState(false);

    const [error, setError] = useState("");

    const setCheckboxVal = (val: Boolean) => {
        setChecked(!val);
    };

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [formData, setFormData] = React.useState({
        user_id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (formData.password && formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
            } else {
                setError("");
            }
        } else {
            setError("");
        }
    }, [formData.password, formData.confirmPassword]);

    useEffect(() => {
        if (
            formData.first_name &&
            formData.last_name &&
            formData.email &&
            formData.user_id &&
            formData.password &&
            formData.confirmPassword &&
            checked
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formData, checked]);

    const handleSubmit = () => {
        setDisabled(true);
        setLoading(true);
        devInstance
            .post(`/user/${formData.user_id}`, {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                user_id: formData.user_id,
            })
            .then(() => {
                Toast.show({
                    type: "success",
                    text1: "You have successfully signed up",
                    text2: "Please login to continue",
                });
                navigation.navigate("Signin");
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setDisabled(false);
                setLoading(true);
            });
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.container}>
                <BackButton />
                <Image source={signupImage} style={styles.image} />
                <View style={styles.titleContainer}>
                    <HText fontSize="24" color="#5DB400" fontWeight="semibold">
                        Sign Up
                    </HText>
                    <View>
                        <HText
                            fontSize="14"
                            fontWeight="medium"
                            color="#777777"
                            textStyle={styles.subtitle}
                        >
                            Please fill in your details to get
                        </HText>
                        <HText
                            fontSize="14"
                            fontWeight="medium"
                            color="#777777"
                            textStyle={styles.subtitle}
                        >
                            started with roadersmap
                        </HText>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <HInput
                        label="First Name"
                        placeholder="First Name"
                        onChangeText={(text: any) =>
                            setFormData({
                                ...formData,
                                first_name: text,
                            })
                        }
                    />
                    <HInput
                        label="Last Name"
                        placeholder="Last Name"
                        onChangeText={(text: any) =>
                            setFormData({
                                ...formData,
                                last_name: text,
                            })
                        }
                    />
                    <HInput
                        label="Username"
                        placeholder="Username"
                        onChangeText={(text: any) =>
                            setFormData({
                                ...formData,
                                user_id: text,
                            })
                        }
                    />
                    <HInput
                        label="Email"
                        placeholder="Email"
                        onChangeText={(text: any) =>
                            setFormData({
                                ...formData,
                                email: text,
                            })
                        }
                    />
                    <HInput
                        label="Password"
                        placeholder="Password"
                        onChangeText={(text: any) =>
                            setFormData({
                                ...formData,
                                password: text,
                            })
                        }
                    />
                    <HInput
                        label="Confirm Password"
                        placeholder="ConfirmPassword"
                        onChangeText={(text: any) =>
                            setFormData({
                                ...formData,
                                confirmPassword: text,
                            })
                        }
                    />
                </View>
                <View style={styles.checkboxContainer}>
                    <HCheckbox checked={checked} setChecked={setCheckboxVal} />
                    <HText fontSize="10" fontWeight="medium" color="#777777">
                        I agree to the Terms of Service and Privacy Policy
                    </HText>
                </View>
                <HTouchableOpacity
                    style={styles.button}
                    backgroundColor="#9EFD38"
                    disabled={disabled}
                    onPress={handleSubmit}
                    loading={loading}
                >
                    <HText fontSize="16" fontWeight="semibold">
                        Sign up
                    </HText>
                </HTouchableOpacity>

                <View style={styles.footerContainer}>
                    <HText>Already have an account?</HText>
                    <HTouchableOpacity
                        onPress={() => navigation.navigate("SignupOverview")}
                    >
                        <HText
                            color="#5DB400"
                            fontSize="14"
                            fontWeight="medium"
                        >
                            Sign In
                        </HText>
                    </HTouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 20 : 50,
        paddingHorizontal: 20,
    },
    image: {
        borderRadius: 16,
        marginTop: 16,
        width: "100%",
        marginBottom: 20,
    },
    titleContainer: {
        gap: 14,
        marginBottom: 28,
    },
    subtitle: {
        lineHeight: 20.3,
    },
    inputContainer: {
        gap: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        marginTop: 16,
        marginBottom: 20,
    },
    button: {
        paddingVertical: 16,
    },
    footerContainer: {
        marginTop: 34,
        marginBottom: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
});

export default Signup;
