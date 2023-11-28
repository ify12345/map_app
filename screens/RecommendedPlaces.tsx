import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HSearchInput } from "../components/HForm";
import CreditCardIcon from "../assets/icons/CreditCardIcon";
import CartIcon from "../assets/icons/CartIcon";
import CupIcon from "../assets/icons/CupIcon";
import WaterdropIcon from "../assets/icons/Waterdrop";
import HTouchableOpacity from "../components/HTouchableOpacity";
import HText from "../components/HText";
import { devInstance } from "../store/devInstance";
import Toast from "react-native-toast-message";

const starIcon = require("../assets/icons/star.png");
const image = require("../assets/images/forgotPassword3.png");
const recommended = require("../assets/images/recommended.png");
const recommended2 = require("../assets/images/recommended2.png");
const recommended3 = require("../assets/images/recommended3.png");
const recommended4 = require("../assets/images/recommended4.png");
const savePlace = require("../assets/images/save-place.png");

const Place = ({ item }: any) => {
    return (
        <TouchableOpacity style={styles.place}>
            <Image source={item?.image} style={styles.placeImage} />
            <View style={styles.placeContent}>
                <View style={styles.placeContentTop}>
                    <View style={styles.placeContentTitle}>
                        <HText fontSize="14" fontWeight="semibold">
                            {item?.title}
                        </HText>
                        <HText color="#777777" fontWeight="medium">
                            {item?.location}
                        </HText>
                    </View>
                    <TouchableOpacity>
                        <Image source={savePlace} />
                    </TouchableOpacity>
                </View>
                <View style={styles.placeRow}>
                    <View
                        style={[
                            styles.chip,
                            {
                                backgroundColor: "#EDFFDA",
                            },
                        ]}
                    >
                        <HText color="#5DB400" fontWeight="medium">
                            {item?.distance}
                        </HText>
                    </View>
                    <View style={styles.placeRow2}>
                        <Image source={starIcon} />
                        <HText fontWeight="medium">{item?.rating}</HText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const RecommendedPlaces = () => {
    const insets = useSafeAreaInsets();

    const [searchText, setSearchText] = useState("");

    const [places, setPlaces] = useState<any>([]);

    const searchPlaces = async () => {
        devInstance
            .get(
                `/nearby_places?latitude=6.6202593&longitude=3.29754&radius=80000&keyword=${searchText}`
            )
            .then((res) => {
                setPlaces(res?.data?.data);
                console.log(res?.data, "console");
            })
            .catch((err) => {
                Toast.show({
                    type: "error",
                    text1: "Error fetching resources",
                });
            });
    };

    useEffect(() => {
        const debounceId = setTimeout(() => {
            searchPlaces();
        }, 1000);

        return () => {
            clearTimeout(debounceId);
        };
    }, [searchText]);

    const tags = [
        {
            title: "ATMs",
            icon: <CreditCardIcon />,
        },
        {
            title: "Shopping",
            icon: <CartIcon />,
        },
        {
            title: "Restaurant",
            icon: <CupIcon />,
        },
        {
            title: "Filling Station",
            icon: <WaterdropIcon />,
        },
    ];

    const [data, setData] = useState([
        {
            image: recommended,
            title: "Pleasure park",
            location: "Admiralty, lekki phase 1",
            distance: "70km",
            rating: 4.8,
        },
        {
            image: recommended2,
            title: "Upbeat",
            location: "Admiralty, lekki phase 1",
            distance: "200km",
            rating: 4.8,
        },
        {
            image: recommended3,
            title: "The Good Beach",
            location: "Admiralty, lekki phase 1",
            distance: "70km",
            rating: 4.8,
        },
        {
            image: recommended4,
            title: "The vendom",
            location: "Wuse 2 Abuja",
            distance: "70km",
            rating: 4.8,
        },
    ]);

    return (
        <View style={[{ paddingBottom: insets.bottom }, styles.wrapper]}>
            <View style={styles.top}>
                <View style={styles.topInner}>
                    <HText fontSize="16" fontWeight="semibold" color="#fff">
                        Awesome places for you
                    </HText>
                    <View>
                        <HText
                            fontWeight="medium"
                            color="white"
                            textStyle={styles.textTop}
                        >
                            some exciting locations curated
                        </HText>
                        <HText
                            fontWeight="medium"
                            color="white"
                            textStyle={styles.textTop}
                        >
                            to spark up your interest.
                        </HText>
                    </View>
                </View>
                <Image alt="" source={image} style={styles.image} />
            </View>
            <HSearchInput
                placeholder="Where to?"
                value={searchText}
                onChangeText={(text: string) => setSearchText(text)}
            />

            <FlatList
                contentContainerStyle={styles.places}
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item: any) => item?.id}
                renderItem={({ item }) => <Place item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 17,
    },
    tagsContainer: {
        columnGap: 5,
    },
    tag: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#EDFFDA",
        borderWidth: 1,
        borderColor: "#5DB400",
        borderRadius: 16,
        gap: 5,
        alignItems: "center",
        alignSelf: "flex-start",
    },
    content: {
        marginTop: 20,
        flex: 1,
    },
    place: {
        height: 117,
        borderRadius: 16,
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    places: {
        gap: 10,
    },
    placeImage: {
        height: 100,
        borderRadius: 16,
    },
    placeContent: {
        height: "100%",
        justifyContent: "space-between",
        flex: 1,
        paddingRight: 16,
        paddingVertical: 16,
    },
    placeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    placeRow2: {
        flexDirection: "row",
        alignItems: "center",
    },
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    top: {
        backgroundColor: "#3975EA",
        borderRadius: 20,
        flexDirection: "row",
        marginBottom: 20,
    },
    topInner: {
        flex: 0.7,
        gap: 10,
        alignSelf: "center",
        padding: 20,
        zIndex: 1,
    },
    textTop: {
        lineHeight: 17.4,
    },
    image: {
        position: "absolute",
        right: 0,
        height: "100%",
    },
    placeContentTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    placeContentTitle: {
        gap: 3,
    },
});

export default RecommendedPlaces;
