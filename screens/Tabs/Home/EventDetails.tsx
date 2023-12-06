import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import { devInstance } from "../../../store/devInstance";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import HText from "../../../components/HText";

const EventDetails = () => {
    const [eventData, setEventData] = useState<any>({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        devInstance
            .get("/events?keyword=Events in Lagos")
            .then((res) => {
                console.log(res.data.data[0], "efvefvef");
                setEventData(res?.data?.data[0]);
            })
            .catch((error) => {
                Toast.show({
                    type: "error",
                    text1: "Error fetching data",
                });
            });
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.topBar}>
                <ChevronLeftIcon />
            </View>
            <View style={styles.contentContainer}>
                <ImageBackground
                    source={{ uri: eventData?.thumbnail }}
                    style={{
                        width: "100%",
                        flex: 0.6,
                        justifyContent: "flex-end",
                        borderRadius: 20,
                        overflow: "hidden",
                    }}
                    imageStyle={styles.image}
                >
                    <LinearGradient
                        colors={["#00000000", "#000000"]}
                        style={{
                            width: "100%",
                            height: 205,
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            paddingHorizontal: 12.5,
                            paddingBottom: 14,
                            flexDirection: "row",
                        }}
                    >
                        <View style={{ gap: 5 }}>
                            <HText
                                fontSize="24"
                                fontWeight="semibold"
                                color="#ffffff"
                                textStyle={{ opacity: 1 }}
                            >
                                {eventData?.title}
                            </HText>
                            <HText
                                fontSize="14"
                                fontWeight="medium"
                                color="#ffffff"
                            >
                                By {eventData?.organizer}
                            </HText>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderRadius: 16,
                                paddingHorizontal: 7,
                                paddingVertical: 5,
                                gap: 5,
                                backgroundColor: "#ffffff30",
                            }}
                        >
                            <Image
                                source={require("../../../assets/map-marker.png")}
                            />
                            <HText color="#ffffff">{eventData?.location}</HText>
                        </View>
                    </LinearGradient>
                </ImageBackground>

                <View style={{ marginTop: 20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 14,
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 8,
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={require("../../../assets/icons/calendar.png")}
                            />
                            <HText fontSize="14" fontWeight="semibold">
                                20th oct., 2023
                            </HText>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 8,
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={require("../../../assets/icons/clock.png")}
                            />
                            <HText fontSize="14" fontWeight="semibold">
                                2:00pm
                            </HText>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "center",
                            flexWrap: "wrap"
                        }}
                    >
                        <Image
                            source={require("../../../assets/icons/map-marker2.png")}
                        />
                        <HText fontSize="14" fontWeight="semibold">
                            British council ikoyi, Thompson avenue, lagos
                        </HText>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingVertical: 20,
    },
    topBar: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    imageContainer: {
        flex: 0.6,
    },
    image: {
        borderRadius: 20,
        flex: 1,
    },
});

export default EventDetails;
