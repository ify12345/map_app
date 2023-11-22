import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HSearchInput } from "../../../components/HForm";
import Carousel from "react-native-reanimated-carousel";
import { devInstance } from "../../../store/devInstance";
import Toast from "react-native-toast-message";
import HText from "../../../components/HText";

const Home = () => {
    const insets = useSafeAreaInsets();
    const width = Dimensions.get("window").width;
    const [eventsData, setEventsData] = useState([]);

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
                <HText fontSize="16" fontWeight="semibold">
                    New Events
                </HText>
                <View style={{}}>
                    <Carousel
                        loop
                        width={width}
                        height={width / 2}
                        data={eventsData}
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) =>
                            console.log("current index:", index)
                        }
                        renderItem={({ item, index }: any) => (
                            <View
                                style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    justifyContent: "center",
                                    width: width - 20,
                                    borderRadius: 16,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 30,
                                    }}
                                >
                                    {item?.title}
                                </Text>
                            </View>
                        )}
                    />
                </View>
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
        // paddingHorizontal: 20,
    },
});

export default Home;
