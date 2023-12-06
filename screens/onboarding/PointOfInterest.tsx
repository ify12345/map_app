import {
    View,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import HText from "../../components/HText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HTouchableOpacity from "../../components/HTouchableOpacity";
import CheckIconWhite from "../../assets/icons/CheckIconWhite";
import { HSearchInput } from "../../components/HForm";
import { useNavigation } from "@react-navigation/native";
import { devInstance } from "../../store/devInstance";
import Toast from "react-native-toast-message";

const backgroundImg = require("../../assets/images/pattern2.png");

const PointOfInterest = () => {
    const { user }: any = useAppSelector((state) => state.auth);
    const insets = useSafeAreaInsets();
    const navigation: any = useNavigation();
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTagsIds, setSelectedTagsIds] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        fetchPlaceTypes();
    }, []);

    const filteredSearch = tags.filter((el: any) =>
        el?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchPlaceTypes = useCallback(() => {
        setLoading(true);
        devInstance
            .get("/place_types")
            .then((res) => {
                setTags(res?.data?.data);
                console.log(res?.data, "data data");
            })
            .catch((err: any) => {
                Toast.show({
                    type: "error",
                    text1: "Error fetching resource",
                });
            })
            .finally(() => setLoading(false));
    }, []);

    function selectTag(id: any) {
        let found = selectedTagsIds.find((el: any) => el === id);
        let filtered = selectedTagsIds.filter((el: any) => el !== id);
        if (found) {
            setSelectedTagsIds(filtered);
        } else {
            setSelectedTagsIds((prev: any) => [...prev, id]);
        }
    }

    function foundTag(tagId: any) {
        let found = selectedTagsIds.find((el: any) => el === tagId);
        if (found) {
            return true;
        } else {
            return false;
        }
    }

    const saveTags = async () => {
        setLoading(true);
        devInstance
            .post(`/place_types/users/${user?.user_id}`, {
                user_id: `${user?.user_id}`,
                place_type_ids: [...selectedTagsIds],
            })
            .then(() => {
                navigation.navigate("Tabs");
            })
            .catch((err) =>
                Toast.show({
                    type: "error",
                    text1: "Error performing action, try again!",
                })
            )
            .finally(() => setLoading(false));
    };

    console.log(user);

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImg} style={styles.wrapper}>
                <View style={styles.wrapperInner}>
                    <View style={[styles.top, { paddingTop: insets.top }]}>
                        <View style={styles.topInner}>
                            <HText
                                color="#fff"
                                fontSize="14"
                                fontWeight="semibold"
                            >
                                Point of Interest
                            </HText>
                            <HTouchableOpacity
                                disabled={selectedTagsIds.length ? false : true}
                                onPress={saveTags}
                            >
                                <CheckIconWhite />
                            </HTouchableOpacity>
                        </View>
                        <View style={styles.topInner2}>
                            <HText
                                color="#fff"
                                fontWeight="semibold"
                                fontSize="22"
                            >
                                Roadersmap helps you collate your area of
                                interest
                            </HText>
                            <View style={styles.textRow}>
                                <HText
                                    color="#fff"
                                    fontSize="14"
                                    fontWeight="semibold"
                                >
                                    Select what you are interested in when
                                    navigating around your geo location.
                                </HText>
                                <HText>🤩</HText>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.bottom,
                            { paddingBottom: insets.bottom },
                        ]}
                    >
                        <HSearchInput
                            placeholder="Search"
                            value={searchTerm}
                            onChangeText={(text: string) => setSearchTerm(text)}
                        />

                        <View style={styles.contentContainer}>
                            <View style={styles.rowView}>
                                {!tags.length && loading ? (
                                    <ActivityIndicator
                                        size="large"
                                        color="#999"
                                    />
                                ) : (
                                    filteredSearch.map((item: any) => {
                                        return (
                                            <HTouchableOpacity
                                                style={[
                                                    styles.chip,
                                                    {
                                                        backgroundColor:
                                                            foundTag(item?.id)
                                                                ? "#EDFFDA"
                                                                : "#fff",
                                                    },
                                                ]}
                                                key={item?.id}
                                                onPress={() =>
                                                    selectTag(item?.id)
                                                }
                                            >
                                                <HText
                                                    fontWeight="medium"
                                                    fontSize="16"
                                                >
                                                    {item?.name}
                                                </HText>
                                            </HTouchableOpacity>
                                        );
                                    })
                                )}
                            </View>
                            <View style={styles.actionsContainer}>
                                <HTouchableOpacity
                                    style={[styles.leftButton, styles.button]}
                                    onPress={() => navigation.navigate("Tabs")}
                                >
                                    <HText fontSize="16" fontWeight="semibold">
                                        skip
                                    </HText>
                                </HTouchableOpacity>
                                <HTouchableOpacity
                                    style={[styles.rightButton, styles.button]}
                                    disabled={
                                        selectedTagsIds.length
                                            ? false
                                            : loading
                                            ? true
                                            : true
                                    }
                                    onPress={saveTags}
                                    loading={loading}
                                >
                                    <HText fontSize="16" fontWeight="semibold">
                                        Continue
                                    </HText>
                                </HTouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    wrapperInner: {
        flex: 1,
    },
    container: {
        backgroundColor: "#5DB400",
        flex: 1,
    },
    top: {
        flex: 1,
        justifyContent: "space-between",
    },
    bottom: {
        flex: 3,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    topInner: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    topInner2: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        gap: 10,
    },
    textRow: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    rowView: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 20,
        columnGap: 8,
        rowGap: 16,
        justifyContent: "center",
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 16,
        shadowColor: "#f0f0f0",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 5,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    contentContainer: {
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 20,
    },
});

export default PointOfInterest;
