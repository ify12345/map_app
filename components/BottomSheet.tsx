import React, { useCallback, useRef, useMemo, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface _props {
    children?: React.ReactNode;
}

const CustomBottomSheet = ({ children }: _props) => {
    const sheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ["80%"], []);

    // callbacks
    const handleSheetChange = useCallback((index: any) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index: any) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    useEffect(() => {
        sheetRef.current?.snapToIndex(0);
    }, []);

    return (
        <GestureHandlerRootView style={styles.wrapper}>
            <BottomSheet
                ref={sheetRef}
                index={0}
                snapPoints={snapPoints}
                // enablePanDownToClose
                onChange={handleSheetChange}
            >
                <BottomSheetScrollView style={styles.contentContainer}>
                    {children}
                </BottomSheetScrollView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: 200,
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
});

export default CustomBottomSheet;
