import { View, StyleSheet, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import HText from "../../components/HText";
import { HCheckbox, HInput } from "../../components/HForm";
import HTouchableOpacity from "../../components/HTouchableOpacity";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../store/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const signinImage1 = require("../../assets/images/signin-screen1.png");

const signinImage2 = require("../../assets/images/signin-screen2.png");

const signinImage3 = require("../../assets/images/signin-screen3.png");

const Signup = () => {
    const dispatch = useAppDispatch();
    const navigation: any = useNavigation();
    const [checked, setChecked] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);

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

    const handleSubmit = async () => {
        console.log(formData);
        try {
            setDisabled(true);
            setLoading(true);
            setInputDisabled(true);
            let res: any = await dispatch(loginUser(formData));
            let errors =
                res.meta.rejectedWithValue === true ||
                res.meta.requestStatus === "rejected";

            if (!errors) {
                navigation.navigate("PointOfInterest");
            }
        } catch (error: any) {
            setDisabled(false);
        } finally {
            setLoading(false);
            setDisabled(false);
            setInputDisabled(false);
        }
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
                        disabled={inputDisabled}
                        label="Email"
                        placeholder="Email"
                        textType={"emailAddress"}
                        onChangeText={(text: any) =>
                            setFormData({
                                ...formData,
                                email: text.toLowerCase(),
                            })
                        }
                        value={formData.email}
                    />
                    <HInput
                        disabled={inputDisabled}
                        label="Password"
                        placeholder="Password"
                        textType={"password"}
                        onChangeText={(text: any) =>
                            setFormData({
                                ...formData,
                                password: text,
                            })
                        }
                        value={formData.password}
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
                    <HTouchableOpacity
                        onPress={() =>
                            navigation.navigate("ForgotPasswordScreen1")
                        }
                    >
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
                        Sign in
                    </HText>
                </HTouchableOpacity>

                <View style={styles.footerContainer}>
                    <HText>Don't have an account?</HText>
                    <HTouchableOpacity
                        onPress={() => navigation.navigate("SignupOverview")}
                    >
                        <HText
                            color="#5DB400"
                            fontSize="14"
                            fontWeight="medium"
                        >
                            Sign Up
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
        paddingTop: 20,
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
