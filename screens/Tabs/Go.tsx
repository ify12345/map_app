import {
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HTouchableOpacity from "../../components/HTouchableOpacity";
import MapView, {
    AnimatedRegion,
    Marker,
    PROVIDER_GOOGLE,
    Polyline,
} from "react-native-maps";
import * as Location from "expo-location";
import CustomBottomSheet from "../../components/BottomSheet";
import { devInstance } from "../../store/devInstance";
import { HSearchInput } from "../../components/HForm";
import HText from "../../components/HText";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../apiKeys";
import CancelIcon from "../../assets/icons/cancelIcon";
import PlusIcon from "../../assets/icons/Plus";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";

const pointOfInterest = [
    {
        title: "First",
        location: {
            latitude: -27.2,
            longitude: 145,
        },
        description: "My first marker",
    },
    {
        title: "Second",
        location: {
            latitude: -30.2,
            longitude: 150,
        },
        description: "My second marker",
    },
    {
        title: "Third",
        location: {
            latitude: -35.2,
            longitude: 175,
        },
        description: "My third marker",
    },
];

const homeGreen = require("../../assets/icons/homeGreen.png");
const workGreen = require("../../assets/icons/workGreen.png");
const favouriteGreen = require("../../assets/icons/favouriteGreen.png");
const markerGreen = require("../../assets/icons/markerGreen.png");
const menuDots = require("../../assets/icons/dots-h.png");
const navigationIcon = require("../../assets/icons/navigation-alt.png");
const arIcon = require("../../assets/icons/AR.png");
const routeArrow = require("../../assets/icons/routeArrow.png");

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Go = (props: any) => {
    const insets = useSafeAreaInsets();
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);
    const [addresses, setAddresses] = useState([]);
    const [destination, setDestination] = useState<any>({});
    const [searchText, setSearchText] = useState("");
    const mapRef = useRef() as MutableRefObject<any>;
    const [modal, setModal] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<any>(null);
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 6.6202593,
        longitude: 3.29754,
    });

    const [bottomSheet, setBottomSheet] = useState(true);
    const [bottomSheet2, setBottomSheet2] = useState(false);
    const [startJourney, setStartJourney] = useState(false);

    const coordinate: any = new AnimatedRegion(currentLocation);

    const locationRef = useRef() as MutableRefObject<any>;
    const destinationRef = useRef() as MutableRefObject<any>;

    const onRegionChange = (region: any) => {
        // console.log(region);
    };

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getLocation();
    //     }, 4000);

    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        getLocation();
    }, []);

    const showPointOfInterest = () => {
        return pointOfInterest.map((item, index) => (
            <Marker
                key={index}
                coordinate={item?.location}
                title={item?.title}
                description={item?.description}
            />
        ));
    };

    function getNearbyLocation() {
        devInstance
            .get(
                `/nearby_places?latitude=${currentLocation?.latitude}&longitude=${currentLocation?.longitude}&radius=10000&`
            )
            .then((res) => {
                setAddresses(res.data.data);
                // console.log(res?.data, "response");
            });
    }

    function searchPlaces() {
        devInstance
            .get(
                `/nearby_places?latitude=${currentLocation?.latitude}&longitude=${currentLocation?.longitude}&radius=80000&keyword=${searchText}`
            )
            .then((res) => {
                setAddresses(res.data.data);
                // console.log(res?.data, "response");
            });
    }

    function getLastItem(arr: any) {
        const lastElement = arr[arr.length - 1];
        return lastElement;
    }

    useEffect(() => {
        getNearbyLocation();
    }, []);

    useEffect(() => {
        const debounceId = setTimeout(() => {
            searchPlaces();
        }, 1000);

        return () => {
            clearTimeout(debounceId);
        };
    }, [searchText]);

    const animate = (latitude: any, longitude: any) => {
        const newCoordinate: any = { latitude, longitude };
        if (Platform.OS === "android") {
            if (locationRef.current) {
                locationRef.current.animateMarkerToCoordinate(
                    newCoordinate,
                    7000
                );
            }
        } else {
            coordinate.timing(newCoordinate.start());
        }
    };

    console.log(destination, "destination");

    return (
        <>
            <View style={[styles.wrapper, { paddingTop: insets.top }]}>
                {!bottomSheet2 && !startJourney && (
                    <View style={styles.topBar}>
                        <HTouchableOpacity>
                            <Image
                                source={require("../../assets/icons/menu-bar.png")}
                            />
                        </HTouchableOpacity>
                    </View>
                )}
                {bottomSheet2 && !startJourney && (
                    <View
                        style={{
                            position: "absolute",
                            top: 50,
                            paddingHorizontal: 16,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 3,
                            zIndex: 2,
                        }}
                    >
                        <View
                            style={{
                                height: 65,
                                backgroundColor: "#fff",
                                borderColor: "#5DB400",
                                borderWidth: 1,
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                                width: 65,
                            }}
                        >
                            <HText fontWeight="semibold" color="#777777">
                                50km
                            </HText>
                            <Image
                                source={require("../../assets/icons/car.png")}
                            />
                        </View>
                        <View
                            style={{
                                height: 65,
                                backgroundColor: "#fff",
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                                width: 65,
                            }}
                        >
                            <HText fontWeight="semibold" color="#777777">
                                40km
                            </HText>
                            <Image
                                source={require("../../assets/icons/train.png")}
                            />
                        </View>
                        <View
                            style={{
                                height: 65,
                                backgroundColor: "#fff",
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                                width: 65,
                            }}
                        >
                            <HText fontWeight="semibold" color="#777777">
                                60km
                            </HText>
                            <Image
                                source={require("../../assets/icons/truck.png")}
                            />
                        </View>
                        <View
                            style={{
                                height: 65,
                                backgroundColor: "#fff",
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                                width: 65,
                            }}
                        >
                            <HText fontWeight="semibold" color="#777777">
                                30km
                            </HText>
                            <Image
                                source={require("../../assets/icons/bicycle.png")}
                            />
                        </View>
                        <View
                            style={{
                                height: 65,
                                backgroundColor: "#fff",
                                borderRadius: 15,
                                width: 65,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <HText fontWeight="semibold" color="#777777">
                                100km
                            </HText>
                            <Image
                                source={require("../../assets/icons/walking.png")}
                            />
                        </View>
                    </View>
                )}

                <MapView
                    ref={mapRef}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: currentLocation?.latitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitude: currentLocation?.longitude,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    onRegionChange={onRegionChange}
                >
                    {/* {showPointOfInterest()} */}

                    <Marker
                        coordinate={{
                            latitude: currentLocation?.latitude,
                            longitude: currentLocation?.longitude,
                        }}
                        ref={locationRef}
                    />

                    <Marker
                        coordinate={{
                            latitude: destination?.geometry?.location?.lat,
                            longitude: destination?.geometry?.location?.lng,
                        }}
                    />

                    {startJourney && (
                        <View
                            style={{
                                height: 92,
                                width: width - 40,
                                marginLeft: 20,
                                backgroundColor: "#fff",
                                position: "absolute",
                                top: 20,
                                left: 0,
                                borderRadius: 16,
                                paddingHorizontal: 16,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 16,
                            }}
                        >
                            <Image source={routeArrow} />
                            <View style={{ position: "relative" }}>
                                <HText fontSize="18" fontWeight="medium">
                                    {destination?.name.slice(0, 10)}...
                                </HText>
                                <HText fontWeight="medium">
                                    {(destination?.address &&
                                        getLastItem(
                                            destination?.address?.split(",")
                                        )) ||
                                        "Destination"}
                                </HText>
                            </View>
                        </View>
                    )}

                    {startJourney && (
                        <View
                            style={{
                                height: 127,
                                width: width - 40,
                                marginLeft: 20,
                                backgroundColor: "#fff",
                                position: "absolute",
                                bottom: 20,
                                left: 0,
                                borderRadius: 16,
                                paddingHorizontal: 16,
                                gap: 20,
                                justifyContent: "center",
                                // alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 16,
                                    justifyContent: "space-between",
                                }}
                            >
                                <HTouchableOpacity
                                    style={[
                                        styles.button,
                                        { backgroundColor: "#9EFD38" },
                                    ]}
                                >
                                    <HText fontSize="16">50km</HText>
                                </HTouchableOpacity>

                                <HText fontSize="16" fontWeight="medium">
                                    34min, 23sec
                                </HText>

                                <HTouchableOpacity
                                    style={[
                                        styles.button,
                                        { backgroundColor: "#9EFD38" },
                                    ]}
                                >
                                    <CancelIcon />
                                </HTouchableOpacity>
                            </View>
                            <HText
                                fontSize="14"
                                fontWeight="medium"
                                textStyle={{ textAlign: "center" }}
                            >
                                You will arrive at 6:08pm
                            </HText>
                        </View>
                    )}

                    {destination && (
                        <MapViewDirections
                            origin={{
                                latitude: currentLocation?.latitude,
                                longitude: currentLocation?.longitude,
                            }}
                            destination={{
                                latitude:
                                    destination?.geometry?.location?.lat ||
                                    null,
                                longitude:
                                    destination?.geometry?.location?.lng ||
                                    null,
                            }}
                            apikey={GOOGLE_MAPS_APIKEY}
                            region="NG"
                            strokeWidth={3}
                            strokeColor="#5DB400"
                            optimizeWaypoints={true}
                            onReady={(result) => {
                                mapRef.current.fitToCoordinates(
                                    result.coordinates,
                                    {
                                        edgePadding: {
                                            right: 30,
                                            bottom: 300,
                                            left: 30,
                                            top: 100,
                                        },
                                    }
                                );
                            }}
                        />
                    )}
                </MapView>
                {bottomSheet && !startJourney && (
                    <View
                        style={{
                            height: 374,
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                        }}
                    >
                        <CustomBottomSheet>
                            <View
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 16,
                                }}
                            >
                                <HSearchInput
                                    placeholder="Your destination?"
                                    type={2}
                                    value={searchText}
                                    onPressIn={() => {
                                        setModal(true);
                                        destinationRef.current.focus();
                                    }}
                                    onChangeText={() => {
                                        setModal(true);
                                        destinationRef.current.focus();
                                    }}
                                    ref={destinationRef}
                                />
                                <ScrollView>
                                    {addresses.map((item: any, index) => (
                                        <HTouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setDestination(item);
                                                setSearchText(item?.name);
                                                destinationRef.current.blur();
                                                console.log(item, "item");
                                                setBottomSheet(false);
                                                setModal(false);
                                                setBottomSheet2(true);
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    gap: 5,
                                                    flex: 1,
                                                    alignItems: "center",
                                                    paddingVertical: 10,
                                                    borderBottomWidth: 1,
                                                    borderColor: "#D9D9D9",
                                                    justifyContent:
                                                        "flex-start",
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/icons/clock.png")}
                                                />
                                                <View>
                                                    <HText
                                                        fontWeight="medium"
                                                        color="#1F1F1F"
                                                    >
                                                        {item?.address}
                                                    </HText>
                                                    <HText
                                                        fontSize="10"
                                                        color="#777777"
                                                    >
                                                        {getLastItem(
                                                            item?.address?.split(
                                                                ","
                                                            )
                                                        )}
                                                    </HText>
                                                </View>
                                            </View>
                                        </HTouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </CustomBottomSheet>
                    </View>
                )}
                {bottomSheet2 && destination && !startJourney && (
                    <View
                        style={{
                            height: 350,
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                        }}
                    >
                        <CustomBottomSheet>
                            <View
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 20,
                                    gap: 16,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        height: 105,
                                        borderWidth: 1,
                                        borderColor: "#E1E1E1",
                                        borderRadius: 16,
                                        alignItems: "center",
                                        paddingRight: 7,
                                    }}
                                >
                                    <View
                                        style={{
                                            gap: 3,
                                            paddingHorizontal: 16,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <HText
                                            color="#5DB400"
                                            fontWeight="semibold"
                                            fontSize="16"
                                        >
                                            {destination?.name || "Destination"}
                                        </HText>

                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Image source={markerGreen} />
                                            <HText color="#777777">
                                                {(destination?.address &&
                                                    getLastItem(
                                                        destination?.address?.split(
                                                            ","
                                                        )
                                                    )) ||
                                                    "Destination"}
                                            </HText>
                                        </View>
                                    </View>
                                    <View style={{ width: 90, height: 90 }}>
                                        <Image
                                            source={{
                                                uri:
                                                    destination?.image ||
                                                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AWU5eFiVB3JsY0XJgIIOttTe0-Wqg-O0S6d-SZS2-Pr0WD8bLH2KWPfV0-h_YKA_vsQ43NzIq5f6j-VgcbHjFfDHyvxBZzb2aOIxB88bvtDbphAZ9gMscFAdWaS29cLP3sFMHk4gqgz8cT99y0y2GS_f1yJIphdtiGSAm6Dpo69n1gDkm3YR&key=AIzaSyDzM3m0MOlip0uXRVyMHaVU6-SdAMBCNT4",
                                            }}
                                            style={{
                                                flex: 1,
                                                borderRadius: 16,
                                            }}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <HText
                                        color="#5DB400"
                                        fontSize="14"
                                        fontWeight="semibold"
                                    >
                                        34 min{" "}
                                        <HText
                                            fontSize="14"
                                            fontWeight="semibold"
                                        >
                                            (50km)
                                        </HText>
                                    </HText>
                                    <HText>
                                        Fastest route due to traffic conditions
                                    </HText>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <HTouchableOpacity
                                        style={[
                                            styles.button,
                                            { backgroundColor: "#9EFD38" },
                                        ]}
                                        onPress={() => setStartJourney(true)}
                                    >
                                        <Image source={navigationIcon} />
                                        <HText
                                            fontSize="16"
                                            fontWeight="semibold"
                                        >
                                            Start
                                        </HText>
                                    </HTouchableOpacity>
                                    <HTouchableOpacity
                                        style={[
                                            styles.button,
                                            { backgroundColor: "#9EFD38" },
                                        ]}
                                    >
                                        <Image source={arIcon} />
                                        <HText
                                            fontSize="16"
                                            fontWeight="semibold"
                                        >
                                            Live View
                                        </HText>
                                    </HTouchableOpacity>
                                    <HTouchableOpacity
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: "#9EFD38",
                                                borderWidth: 1,
                                            },
                                        ]}
                                    >
                                        <Image source={menuDots} />
                                    </HTouchableOpacity>
                                </View>
                            </View>
                        </CustomBottomSheet>
                    </View>
                )}
            </View>
            <Modal animationType="slide" visible={modal}>
                <View style={[styles.modalTopbar, { paddingTop: insets.top }]}>
                    <View style={styles.modalTopBarLeft}>
                        <HTouchableOpacity onPress={() => setModal(false)}>
                            <CancelIcon />
                        </HTouchableOpacity>

                        <HText fontSize="14" fontWeight="semibold">
                            Your Route
                        </HText>
                    </View>
                    <HTouchableOpacity>
                        <PlusIcon />
                    </HTouchableOpacity>
                </View>

                <View
                    style={[
                        styles.modalBottom,
                        { paddingBottom: insets.bottom },
                    ]}
                >
                    <View style={styles.modalBottomTop}>
                        <HSearchInput
                            icon={2}
                            value={"Agege"}
                            disabled={true}
                        />
                        <HSearchInput
                            placeholder="Your destination"
                            value={searchText}
                            ref={destinationRef}
                            onChangeText={(text: string) => setSearchText(text)}
                        />
                        {/* <GooglePlacesAutocomplete
                            placeholder="Search"
                            onFail={() => console.log("failed")}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details, "hello");
                            }}
                            fetchDetails={true}
                            query={{
                                key: GOOGLE_MAPS_APIKEY,
                                language: "en",
                                components: "country:us",
                            }}
                        /> */}
                        <View style={styles.flexRowBetween}>
                            <HTouchableOpacity style={styles.options}>
                                <Image source={homeGreen} />
                                <View style={styles.optionsContainer}>
                                    <HText fontSize="14" fontWeight="medium">
                                        Home
                                    </HText>
                                    <HText>Add home</HText>
                                </View>
                            </HTouchableOpacity>

                            <HTouchableOpacity style={styles.options}>
                                <Image source={workGreen} />
                                <View style={styles.optionsContainer}>
                                    <HText fontSize="14" fontWeight="medium">
                                        Work
                                    </HText>
                                    <HText>Add Work</HText>
                                </View>
                            </HTouchableOpacity>

                            <HTouchableOpacity style={styles.options}>
                                <Image source={favouriteGreen} />
                                <View style={styles.optionsContainer}>
                                    <HText fontSize="14" fontWeight="medium">
                                        Favourite places
                                    </HText>
                                    <HText>Add Favourites</HText>
                                </View>
                            </HTouchableOpacity>
                        </View>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {addresses.map((item: any, index) => (
                            <HTouchableOpacity
                                key={index}
                                onPress={() => {
                                    setDestination(item);
                                    setSearchText(item?.name);
                                    destinationRef.current.blur();
                                    setModal(false);
                                    console.log(item, "item");
                                    setBottomSheet(false);
                                    setBottomSheet2(true);
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 5,
                                        flex: 1,
                                        alignItems: "center",
                                        paddingVertical: 10,
                                        borderBottomWidth: 1,
                                        borderColor: "#D9D9D9",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Image source={markerGreen} />
                                    <View>
                                        <HText
                                            fontWeight="medium"
                                            color="#1F1F1F"
                                        >
                                            {item?.name}
                                        </HText>
                                        <HText fontSize="10" color="#777777">
                                            {getLastItem(
                                                item?.address?.split(",")
                                            )}
                                        </HText>
                                    </View>
                                </View>
                            </HTouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        // ...StyleSheet.absoluteFillObject,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        position: "absolute",
        top: 50,
        zIndex: 10,
    },
    map: {
        flex: 1,
    },
    markerStyle: {
        width: 100,
    },
    modalTopbar: {
        paddingHorizontal: 20,
        paddingBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottomColor: "#E1E1E1",
        borderBottomWidth: 1,
    },
    modalTopBarLeft: {
        flexDirection: "row",
        gap: 8,
        marginTop: 20,
        alignItems: "center",
    },
    modalBottom: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    modalBottomTop: {},
    flexRowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 28,
    },
    options: {
        gap: 5,
        flexDirection: "column",
        alignItems: "center",
    },
    optionsContainer: {
        alignItems: "center",
    },
    button: {
        paddingHorizontal: 18,
        paddingVertical: 16,
        borderRadius: 16,
        gap: 16,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Go;
