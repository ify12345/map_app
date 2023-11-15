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

const signinImage1 = require("../../assets/images/signin-screen1.png");

const signinImage2 = require("../../assets/images/signin-screen2.png");

const signinImage3 = require("../../assets/images/signin-screen3.png");

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
        email: "",
        password: "",
    });

    useEffect(() => {
        if (formData.email && formData.password) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formData]);

    const handleSubmit = () => {
        console.log(formData);
        setDisabled(true);
        setLoading(true);
        devInstance
            .post("/auth", {
                email: formData.email,
                password: formData.password,
            })
            .then(() => {
                Toast.show({
                    type: "success",
                    text1: "You have successfully logged in",
                    text2: "Pick your interests to continue",
                });
                navigation.navigate("PointOfInterest");
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setDisabled(false);
                setLoading(false);
            });
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.container}>
                <BackButton />
                <View style={styles.imagesContainer}>
                    <Image source={signinImage1} style={styles.image} />
                    <Image source={signinImage2} style={styles.image} />
                    <Image source={signinImage3} style={styles.image} />
                </View>
                <View style={styles.titleContainer}>
                    <HText fontSize="24" color="#5DB400" fontWeight="semibold">
                        Sign In
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
                </View>
                <View style={styles.containerRow}>
                    <View style={styles.checkboxContainer}>
                        <HCheckbox
                            checked={checked}
                            setChecked={setCheckboxVal}
                        />
                        <HText
                            fontSize="10"
                            fontWeight="medium"
                            color="#777777"
                        >
                            Remember me
                        </HText>
                    </View>
                    <HTouchableOpacity>
                        <HText
                            color="#5DB400"
                            fontSize="10"
                            fontWeight="medium"
                        >
                            Forgot password?
                        </HText>
                    </HTouchableOpacity>
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
    imagesContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        flex: 1,
    },
    image: {
        borderRadius: 16,
        marginTop: 16,
        marginBottom: 20,
        flex: 1,
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
    containerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
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
