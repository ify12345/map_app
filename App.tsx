import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Tabs/Home";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import Language from "./screens/onboarding/Language";
import OnboardingSlides from "./screens/onboarding/OnboardingSlides";
import Toast from "react-native-toast-message";
import SignupOverview from "./screens/onboarding/SignupOverview";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        GeneralSans: require("./assets/fonts/GeneralSans-Regular.ttf"),
        GeneralSansMedium: require("./assets/fonts/GeneralSans-Medium.ttf"),
        GeneralSansSemibold: require("./assets/fonts/GeneralSans-Semibold.ttf"),
    });

    useEffect(() => {
        async function prepare() {
            try {
                await fontsLoaded;
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Languages">
                    <Stack.Screen
                        name="Languages"
                        component={Language}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="OnboardingSlides"
                        component={OnboardingSlides}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SignupOverview"
                        component={SignupOverview}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </View>
    );
}
