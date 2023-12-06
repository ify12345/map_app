import { useState } from "react";
import {
    Dimensions,
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    PixelRatio,
    StyleSheet,
    Image,
    Text,
    ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HText from "./HText";

const Slider = (props: any) => {
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get("window");

    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
            setSliderState({
                ...sliderState,
                currentPage: indexOfNextScreen,
            });
        }
    };

    const { currentPage: pageIndex } = sliderState;

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event: any) => {
                        setSliderPage(event);
                    }}
                >
                    {props?.data.map((item: any, index: any) => (
                        <ImageBackground
                            source={require(item?.url)}
                            style={{
                                width: "100%",
                                flex: 1,
                                justifyContent: "flex-end",
                                height: 217,
                                borderRadius: 20,
                                overflow: "hidden",
                            }}
                            key={index}
                        >
                            <LinearGradient
                                colors={["#00000000", "#000000"]}
                                style={{
                                    width: "100%",
                                    height: 155,
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
                                        {item.title}
                                    </HText>
                                    <HText
                                        fontSize="14"
                                        fontWeight="medium"
                                        color="#ffffff"
                                    >
                                        By {item?.organizer}
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
                                        source={require("../assets/map-marker.png")}
                                    />
                                    <HText color="#ffffff">
                                        {item?.location}
                                    </HText>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        height: 100,
        width: "100%",
    },
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30,
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 17,
    },
    paginationWrapper: {
        position: "absolute",
        bottom: 200,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
});

export default Slider;
