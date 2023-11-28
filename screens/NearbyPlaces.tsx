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

const Place = ({ item }: any) => {
    return (
        <TouchableOpacity style={styles.place}>
            <Image source={item?.image} style={styles.placeImage} />
            <View style={styles.placeContent}>
                <HText fontSize="14" fontWeight="semibold">
                    {item?.title}
                </HText>
                <View style={styles.placeRow}>
                    <View
                        style={[
                            styles.chip,
                            {
                                backgroundColor:
                                    item?.status === "Open"
                                        ? "#EDFFDA"
                                        : "#F0F0F0",
                            },
                        ]}
                    >
                        <HText
                            color={
                                item?.status === "Open" ? "#5DB400" : "#777777"
                            }
                            fontWeight="medium"
                        >
                            {item?.status}
                        </HText>
                    </View>
                    <HText fontWeight="medium">{item?.distance}</HText>
                    <View style={styles.placeRow2}>
                        <Image source={starIcon} />
                        <HText fontWeight="medium">{item?.rating}</HText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const NearbyPlaces = () => {
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
            image: require("../assets/images/places.png"),
            title: "Eti’s Tasty Kitchen",
            distance: "10km",
            rating: 4.8,
            status: "Open",
        },
        {
            image: require("../assets/images/places2.png"),
            title: "Saint John’s Church",
            distance: "10km",
            rating: 4.8,
            status: "Closed",
        },
        {
            image: require("../assets/images/places3.png"),
            title: "Med Plus",
            distance: "10km",
            rating: 4.8,
            status: "Open",
        },
        {
            image: require("../assets/images/places4.png"),
            title: "The Stake Place",
            distance: "10km",
            rating: 4.8,
            status: "Open",
        },
        {
            image: require("../assets/images/places5.png"),
            title: "Shoprite",
            distance: "10km",
            rating: 4.8,
            status: "Closed",
        },
        {
            image: require("../assets/images/places6.png"),
            title: "Mosque",
            distance: "10km",
            rating: 4.8,
            status: "Open",
        },
    ]);

    return (
        <View style={[{ paddingBottom: insets.bottom }, styles.wrapper]}>
            <HSearchInput
                placeholder="Where to?"
                value={searchText}
                onChangeText={(text: string) => setSearchText(text)}
            />

            <View>
                <ScrollView
                    contentContainerStyle={styles.tagsContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {tags.map((el: any, index: number) => (
                        <TouchableOpacity
                            style={styles.tag}
                            onPress={() => setSearchText(el?.title)}
                            key={index}
                        >
                            {el?.icon}
                            <HText>{el?.title}</HText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                columnWrapperStyle={styles.places}
                style={styles.placesContainer}
                numColumns={2}
                data={data}
                keyExtractor={(item: any) => item?.title}
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
        height: 179,
        borderRadius: 16,
        flex: 1,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    places: {
        gap: 10,
    },
    placesContainer: {
        marginTop: 20,
    },
    placeImage: {
        width: "100%",
        height: 100,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    placeContent: {
        paddingHorizontal: 12.5,
        paddingVertical: 10,
        justifyContent: "space-between",
        flex: 1,
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
});

export default NearbyPlaces;
