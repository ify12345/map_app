import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HSearchInput } from "../../../components/HForm";
import Carousel from "react-native-reanimated-carousel";
import { devInstance } from "../../../store/devInstance";
import Toast from "react-native-toast-message";
import HText from "../../../components/HText";
import Slider from "../../../components/Slider";
import HTouchableOpacity from "../../../components/HTouchableOpacity";
import { useNavigation } from "@react-navigation/native";

const EventsHome = () => {
    const insets = useSafeAreaInsets();
    const width = Dimensions.get("window").width;
    const [eventsData, setEventsData] = useState([]);
    const navigation: any = useNavigation();

    useEffect(() => {}, []);

    const fetchEvents = useCallback(async () => {}, [eventsData]);

    const fetchData = () => {
        devInstance
            .get("/events?keyword=Events in Lagos")
            .then((res) => {
                console.log(res.data.data, "efvefvef");
                setEventsData(res?.data?.data);
            })
            .catch((error) => {
                Toast.show({
                    type: "error",
                    text1: "Error fetching data",
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
            <View style={[styles.topBar, { paddingTop: insets.top }]}>
                <View style={styles.topBarInner}>
                    <HSearchInput placeholder="Where to?" />
                </View>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View>
                    <HText fontSize="16" fontWeight="semibold">
                        New Events
                    </HText>
                    <View style={styles.carouselContainer}>
                        {/* <Slider /> */}
                    </View>
                </View>
                <HTouchableOpacity
                    onPress={() => navigation.navigate("EventDetails")}
                >
                    <HText>Events Details</HText>
                </HTouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    topBar: {
        backgroundColor: "#fff",
    },
    topBarInner: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    scrollContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    carouselContainer: {
        flex: 1,
    },
});

export default EventsHome;
