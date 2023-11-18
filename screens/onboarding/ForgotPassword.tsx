import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HTouchableOpacity from "../../components/HTouchableOpacity";
import HText from "../../components/HText";
import CancelIcon from "../../assets/icons/cancelIcon";
import { HInput } from "../../components/HForm";
import { useNavigation } from "@react-navigation/native";
import { openInbox } from "react-native-email-link";

const image1 = require("../../assets/images/forgotPassword1.png");

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigation: any = useNavigation();
    const [emailSent, setEmailSent] = useState(false);

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
                <Image source={image1} />
                {emailSent ? (
                    <HText color="#5DB400" fontSize="16" fontWeight="semibold">
                        Check your mail
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
                                We have sent instructions to your
                            </HText>
                            <HText
                                fontWeight="medium"
                                color="#777777"
                                textStyle={styles.text}
                            >
                                mail to create a new password
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
                {!emailSent && (
                    <View style={styles.inputContainer}>
                        <HInput type={2} placeholder="Email" />
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
                        onPress={() => openInbox()}
                        loading={loading}
                    >
                        <HText fontSize="16" fontWeight="semibold">
                            Open Email app
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
                        onPress={() => setEmailSent(true)}
                        loading={loading}
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
