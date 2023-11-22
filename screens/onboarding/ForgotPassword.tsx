import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HTouchableOpacity from "../../components/HTouchableOpacity";
import HText from "../../components/HText";
import CancelIcon from "../../assets/icons/cancelIcon";
import { HInput } from "../../components/HForm";
import { useNavigation } from "@react-navigation/native";
import { openInbox } from "react-native-email-link";
import { devInstance } from "../../store/devInstance";
import Toast from "react-native-toast-message";
import OtpInput from "../../components/OtpInputs";

const image1 = require("../../assets/images/forgotPassword1.png");
const image2 = require("../../assets/images/forgotPassword2.png");

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigation: any = useNavigation();
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const mergedOtp = otp[0] + otp[1] + otp[2] + otp[3];

    const inputs: any = [];

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        value && index < newOtp.length - 1 && inputs[index + 1].focus();
        console.log(mergedOtp);
    };

    const sendMail = async () => {
        try {
            setLoading(true);
            let res = await devInstance.post("/user/send_validation_code", {
                email: email,
            });
            if (res) {
                setEmailSent(true);
                Toast.show({
                    type: "success",
                    text1: "Email sent!",
                    text2: "Check your mailbox to reset your password",
                });
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

    const sentOtp = async () => {
        try {
            setLoading(true);
            let res = await devInstance.post("/validate_forget_password_code", {
                user_id: email,
                code: Number(mergedOtp),
            });
            console.log(res?.status);
            // if (res.status === 200) {
            //     Toast.show({
            //         type: "success",
            //         text1: "Code Matched Successfully",
            //     });
            // }
            navigation.navigate("ForgotPasswordScreen2");
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Error",
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
                <Image source={emailSent ? image2 : image1} />
                {emailSent ? (
                    <HText color="#5DB400" fontSize="16" fontWeight="semibold">
                        Enter Code
                    </HText>
                ) : (
                    <HText color="#5DB400" fontSize="16" fontWeight="semibold">
                        Request Code
                    </HText>
                )}

                <View style={styles.textContainer}>
                    {emailSent ? (
                        <>
                            <HText
                                fontWeight="medium"
                                color="#777777"
                                textStyle={styles.text}
                            >
                                Please enter the 4 digit code sent to
                            </HText>
                            <HText
                                fontWeight="medium"
                                color="#1F1F1F"
                                textStyle={styles.text}
                            >
                                {email}
                            </HText>
                        </>
                    ) : (
                        <>
                            <HText fontWeight="medium" color="#777777">
                                Kindly enter your email address associated{" "}
                            </HText>
                            <HText fontWeight="medium" color="#777777">
                                with this account and you will receive a
                                verification{" "}
                            </HText>
                            <HText fontWeight="medium" color="#777777">
                                code to aid your setup
                            </HText>
                        </>
                    )}
                </View>
                {emailSent ? (
                    <View>
                        <OtpInput
                            otp={otp}
                            handleChange={handleChange}
                            inputs={inputs}
                        />
                    </View>
                ) : (
                    <View style={styles.inputContainer}>
                        <HInput
                            textType={"email"}
                            type={2}
                            placeholder="Email"
                            onChangeText={(text: string) =>
                                setEmail(text.toLowerCase())
                            }
                            value={email}
                        />
                    </View>
                )}

                {emailSent ? (
                    <HTouchableOpacity
                        style={[
                            styles.button,
                            {
                                marginTop: emailSent ? 56 : 0,
                            },
                        ]}
                        backgroundColor="#9EFD38"
                        onPress={sentOtp}
                        loading={loading}
                        disabled={mergedOtp.length < 4 ? true : false}
                    >
                        <HText fontSize="16" fontWeight="semibold">
                            Continue
                        </HText>
                    </HTouchableOpacity>
                ) : (
                    <HTouchableOpacity
                        style={[
                            styles.button,
                            {
                                marginTop: emailSent ? 56 : 0,
                            },
                        ]}
                        backgroundColor="#9EFD38"
                        onPress={sendMail}
                        loading={loading}
                        disabled={!email ? true : false}
                    >
                        <HText fontSize="16" fontWeight="semibold">
                            Send request
                        </HText>
                    </HTouchableOpacity>
                )}
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
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: 20,
    },
    textContainer: {
        alignItems: "center",
        gap: 1,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 16,
        width: "100%",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 130,
    },
    text: {
        textAlign: "center",
    },
});

export default ForgotPassword;
