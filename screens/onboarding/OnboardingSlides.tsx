import {
    View,
    StyleSheet,
    ImageBackground,
    Animated,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import HText from "../../components/HText";
import { useNavigation } from "@react-navigation/native";
// import Animated, {
//     useSharedValue,
//     withSpring,
//     useAnimatedStyle,
// } from "react-native-reanimated";

const onboarding1 = require("../../assets/images/onboarding1.png");
const onboarding2 = require("../../assets/images/onboarding2.png");

const OnboardingSlides = () => {
    const [image, setImage] = useState(onboarding1);
    const navigation: any = useNavigation();
    // const translateX = useSharedValue(0);

    const texts = [
        {
            title: "Find your way with ease with roadersmap",
            content:
                "unlock the secrets of efficient navigation with roadersmap as your trust guide.",
        },
        {
            title: "100% real time tracking of your routes",
            content:
                "Experience  the joy of seamless navigation with roadersmap by your side  😄",
        },
    ];

    function nextAction() {
        if (image === onboarding2) {
            navigateToSignup();
        } else {
            setImage(onboarding2);
        }
    }

    function navigateToSignup() {
        navigation.navigate("SignupOverview");
    }
    return (
        <View style={styles.wrapper}>
            <Animated.View style={styles.top}>
                <ImageBackground
                    source={image}
                    style={styles.topImage}
                ></ImageBackground>
            </Animated.View>
            <View style={styles.bottom}>
                <View style={styles.bottomTitleContainer}>
                    <HText fontSize="24" fontWeight="semibold">
                        {image === onboarding1
                            ? texts[0].title
                            : texts[1].title}
                    </HText>

                    <HText fontSize="14">
                        {image === onboarding1
                            ? texts[0].content
                            : texts[1].content}
                    </HText>
                </View>
                <View
                    style={[
                        styles.indicatorsContainer,
                        {
                            transform: [
                                {
                                    rotateX:
                                        image === onboarding2
                                            ? "180deg"
                                            : "0deg",
                                },
                                {
                                    rotateZ:
                                        image === onboarding2
                                            ? "180deg"
                                            : "0deg",
                                },
                            ],
                        },
                    ]}
                >
                    <Animated.View style={styles.indicator}>
                        <View style={[styles.indicatorActive]}></View>
                    </Animated.View>
                    <Animated.View style={styles.indicator}>
                        <View
                            style={[
                                styles.indicatorInactive,
                                {
                                    marginLeft: "auto",
                                },
                            ]}
                        ></View>
                    </Animated.View>
                </View>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.leftButton, styles.button]}
                        onPress={navigateToSignup}
                    >
                        <HText fontSize="16" fontWeight="semibold">
                            skip
                        </HText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.rightButton, styles.button]}
                        onPress={nextAction}
                    >
                        <HText fontSize="16" fontWeight="semibold">
                            Next
                        </HText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    top: {
        flex: 1.2,
    },
    topImage: {
        flex: 1,
    },
    bottom: {
        flex: 0.8,
        paddingVertical: 30,
    },
    bottomTitleContainer: {
        width: 340,
        paddingHorizontal: 20,
        gap: 10,
    },
    indicatorsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 40,
    },
    indicator: {
        height: 8,
        width: 40,
    },
    indicatorActive: {
        borderRadius: 16,
        backgroundColor: "#9EFD38",
        flex: 1,
    },
    indicatorInactive: {
        height: 8,
        width: 8,
        borderRadius: 16,
        borderColor: "#777777",
        borderWidth: 1,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    button: {
        paddingHorizontal: 28,
        paddingVertical: 20,
        borderRadius: 16,
    },
    leftButton: {
        borderColor: "#777777",
        borderWidth: 1,
        shadowColor: "#f0f0f0",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 5,
    },
    rightButton: {
        backgroundColor: "#9EFD38",
    },
});

export default OnboardingSlides;
