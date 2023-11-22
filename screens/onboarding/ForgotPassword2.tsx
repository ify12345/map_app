import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CancelIcon from "../../assets/icons/cancelIcon";
import HText from "../../components/HText";
import HTouchableOpacity from "../../components/HTouchableOpacity";
import { useNavigation } from "@react-navigation/native";
import { HInput } from "../../components/HForm";
import { ExclamationTriangleIcon } from "react-native-heroicons/outline";
import { devInstance } from "../../store/devInstance";
import Toast from "react-native-toast-message";

const image = require("../../assets/images/forgotPassword3.png");

const ForgotPassword2 = () => {
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");

    useEffect(() => {
        if (
            formData.password &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword
        ) {
            setError2("Both passwords must match");
        } else {
            setError2("");
        }
        if (formData.password && formData.password.length < 8) {
            setError1("Must be at least 8 characters");
        } else {
            setError1("");
        }
    }, [formData]);

    function getDisabledStatus() {
        if (
            formData.password &&
            formData.confirmPassword &&
            !error1 &&
            !error2
        ) {
            return false;
        } else {
            return true;
        }
    }

    const changePassword = async () => {
        try {
            setLoading(true);
            const res = await devInstance.put("/user/tomi", {
                password: formData.password,
            });
            if (res?.status === 200) {
                Toast.show({
                    type: "success",
                    text1: "Password changed successfully!",
                    text2: "You can now login with your new password",
                });
                navigation.navigate("Signin");
            }
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Error sending email, try again!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.topBar}>
                <HText fontSize="16" fontWeight="semibold">
                    Forgot Password
                </HText>
                <HTouchableOpacity onPress={() => navigation.goBack()}>
                    <CancelIcon />
                </HTouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.top}>
                    <View style={styles.topInner}>
                        <HText fontSize="16" fontWeight="semibold" color="#fff">
                            Forgot password
                        </HText>
                        <HText
                            fontWeight="medium"
                            color="white"
                            textStyle={styles.textTop}
                        >
                            Your new password must be different from your
                            previously used password.
                        </HText>
                    </View>
                    <Image alt="" source={image} style={styles.image} />
                </View>
                <View style={styles.bottom}>
                    <View style={styles.bottomTop}>
                        <HInput
                            label="Password"
                            placeholder="Password"
                            type={2}
                            error={error1}
                            onChangeText={(text: any) =>
                                setFormData({
                                    ...formData,
                                    password: text,
                                })
                            }
                            value={formData.password}
                        />
                        <HInput
                            label="Confirm Password"
                            placeholder="Password"
                            type={2}
                            error={error2}
                            onChangeText={(text: any) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: text,
                                })
                            }
                            value={formData.confirmPassword}
                        />
                        <View style={styles.caution}>
                            <View>
                                <ExclamationTriangleIcon color="#C18B00" />
                            </View>
                            <HText
                                color="#C18B00"
                                textStyle={styles.textBottom}
                            >
                                Please ensure that you remember and login with
                                your new password you just created. Changes will
                                reflect realtime after you change your password
                            </HText>
                        </View>
                    </View>

                    <HTouchableOpacity
                        style={[styles.button]}
                        backgroundColor="#9EFD38"
                        onPress={changePassword}
                        loading={loading}
                        disabled={getDisabledStatus()}
                    >
                        <HText fontSize="16" fontWeight="semibold">
                            Continue
                        </HText>
                    </HTouchableOpacity>
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
    topBar: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderColor: "#E1E1E1",
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    top: {
        flex: 1,
        backgroundColor: "#FF9501",
        borderRadius: 20,
        flexDirection: "row",
    },
    bottom: {
        flex: 5,
        justifyContent: "space-between",
    },
    topInner: {
        flex: 0.8,
        gap: 10,
        alignSelf: "center",
        padding: 20,
        zIndex: 1,
    },
    textTop: {
        lineHeight: 17.4,
    },
    textBottom: {
        lineHeight: 17.4,
        flex: 1,
    },
    image: {
        position: "absolute",
        right: 0,
        height: "100%",
    },
    caution: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 14,
    },
    bottomTop: {
        gap: 22,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 16,
        width: "100%",
        marginBottom: 30,
    },
});

export default ForgotPassword2;
