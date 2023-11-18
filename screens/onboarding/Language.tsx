import {
    View,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CheckIcon from "../../assets/icons/CheckIcon";
import HText from "../../components/HText";
import { HSearchInput } from "../../components/HForm";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const backgroundImg = require("../../assets/images/pattern2.png");

type Item = {
    id: string;
    name: string;
    code: string;
    color: string;
};

interface _props {
    item: Item;
}

const Language = () => {
    const navigation: any = useNavigation();
    const [active, setActive] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [langs, setLangs] = useState([
        {
            id: "1",
            name: "English",
            code: "en",
            color: "#ED6331",
        },
        {
            id: "2",
            name: "Yoruba",
            code: "yo",
            color: "#F19B3F",
        },
        {
            id: "3",
            name: "Hausa",
            code: "ha",
            color: "#3975EA",
        },
        {
            id: "4",
            name: "Igbo",
            code: "ig",
            color: "#30C85B",
        },
    ]);

    function doneAction() {
        if (active) {
            Toast.show({
                type: "success",
                text1: `Language selected as ${active.name}`,
            });
            navigation.navigate("OnboardingSlides");
        } else {
            setError("Please select a language to continue");
        }
    }

    const filteredLangs = langs.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const Item = ({ item }: _props) => {
        return (
            <TouchableOpacity
                style={styles.itemWrapper}
                onPress={() => setActive(item)}
            >
                <View
                    style={[
                        styles.itemContainer,
                        {
                            backgroundColor:
                                active === item ? "#EDFFDA" : "#fff",
                        },
                    ]}
                >
                    <View
                        style={[
                            { backgroundColor: item.color },
                            styles.itemInner,
                        ]}
                    >
                        <HText fontSize="20" fontWeight="semibold" color="#fff">
                            {item?.code.toUpperCase()}
                        </HText>
                    </View>

                    <HText fontSize="16" fontWeight="semibold">
                        {item.name}
                    </HText>
                </View>
            </TouchableOpacity>
        );
    };
    

    return (
        <ImageBackground source={backgroundImg} style={styles.wrapper}>
            <SafeAreaView style={styles.container}>
                <View style={styles.topBar}>
                    <HText fontSize="20" fontWeight="semibold">
                        Languages
                    </HText>
                    <TouchableOpacity onPress={doneAction}>
                        <CheckIcon />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <HSearchInput
                        placeholder="Search for your language here..."
                        onChangeText={(text: string) => setSearchTerm(text)}
                        value={searchTerm}
                    />
                    <View>
                        {error && !active && (
                            <View style={styles.errorContainer}>
                                <HText
                                    color="#fff"
                                    fontWeight="semibold"
                                    fontSize="10"
                                >
                                    {error}
                                </HText>
                            </View>
                        )}
                        <FlatList
                            data={filteredLangs}
                            numColumns={2}
                            renderItem={Item}
                            columnWrapperStyle={styles.gridRow}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: "center",
        marginBottom: 24,
    },
    content: {
        paddingHorizontal: 20,
        gap: 52,
    },
    errorContainer: {
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#F19B3F",
        width: 230,
        padding: 3,
        borderRadius: 8,
        alignSelf: "center",
    },
    itemWrapper: {
        flexBasis: "48.5%",
    },
    itemContainer: {
        height: 66,
        flex: 1,
        borderColor: "#D9D9D9",
        borderWidth: 1,
        width: "100%",
        borderRadius: 8,
        marginBottom: 10,
        shadowRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        columnGap: 10,
        shadowColor: "#f0f0f0",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 5,
    },
    itemInner: {
        width: 50,
        height: 50,
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center",
    },
    gridRow: {
        justifyContent: "space-between",
    },
});

export default Language;
