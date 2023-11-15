import {
    View,
    SafeAreaView,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import HText from "../../components/HText";
import HTouchableOpacity from "../../components/HTouchableOpacity";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import AppleIcon from "../../assets/icons/AppleIcon";
import { useNavigation } from "@react-navigation/native";

const signupBg = require("../../assets/images/signup-overview.png");

const SignupOverview = () => {
    const navigation: any = useNavigation();
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.top}>
                    <HText fontSize="24" fontWeight="semibold">
                        Create an account
                    </HText>
                    <HText fontWeight="medium" textStyle={styles.subtitle} color="#777777">
                        Create an account with roadersmap to see what’s the
                        latest
                    </HText>
                </View>
                <View style={styles.middle}>
                    <Image source={signupBg} style={styles.imageStyle} />
                </View>
                <View style={styles.bottom}>
                    <View style={styles.buttonContainer}>
                        <HTouchableOpacity
                            style={styles.button}
                            backgroundColor="#3975EA"
                        >
                            <GoogleIcon />
                            <HText
                                color="#fff"
                                fontSize="16"
                                fontWeight="semibold"
                            >
                                Sign up with Google
                            </HText>
                        </HTouchableOpacity>
                        <HTouchableOpacity
                            style={styles.button}
                            backgroundColor="#0F172A"
                        >
                            <AppleIcon />
                            <HText
                                color="#fff"
                                fontSize="16"
                                fontWeight="semibold"
                            >
                                Sign up with Apple
                            </HText>
                        </HTouchableOpacity>
                        <HTouchableOpacity
                            style={styles.button}
                            backgroundColor="#9EFD38"
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <HText fontSize="16" fontWeight="semibold">
                                Sign up with Email
                            </HText>
                        </HTouchableOpacity>
                    </View>

                    <View style={styles.bottomTexts}>
                        <HText color="#667185" fontSize="14">
                            Already have an account?
                        </HText>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("SigninOverview")
                            }
                        >
                            <HText
                                color="#5DB400"
                                fontSize="14"
                                fontWeight="medium"
                            >
                                Sign In
                            </HText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
    top: {
        flex: 0.7,
        width: 270,
        gap: 3,
    },
    middle: {
        flex: 2,
    },
    bottom: {
        flex: 2,
        justifyContent: "center",
        gap: 34,
        marginBottom: 20,
    },
    subtitle: {
        lineHeight: 17.4,
    },
    imageStyle: {
        flex: 1,
        alignSelf: "center",
    },
    button: {
        paddingVertical: 16,
    },
    buttonContainer: {
        gap: 16,
    },
    bottomTexts: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
    },
});

export default SignupOverview;
