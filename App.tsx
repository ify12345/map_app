import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import Language from "./screens/onboarding/Language";
import OnboardingSlides from "./screens/onboarding/OnboardingSlides";
import Toast from "react-native-toast-message";
import SignupOverview from "./screens/onboarding/SignupOverview";
import Signup from "./screens/onboarding/Signup";
import Signin from "./screens/onboarding/Signin";
import SigninOverview from "./screens/onboarding/SigninOverview";
import PointOfInterest from "./screens/onboarding/PointOfInterest";
import { Provider } from "react-redux";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ForgotPassword from "./screens/onboarding/ForgotPassword";
import ForgotPassword2 from "./screens/onboarding/ForgotPassword2";
import Tabs from "./screens/Tabs";
import * as Linking from "expo-linking";
import HText from "./components/HText";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
const prefix = Linking.createURL("/");

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        GeneralSans: require("./assets/fonts/GeneralSans-Regular.ttf"),
        GeneralSansMedium: require("./assets/fonts/GeneralSans-Medium.ttf"),
        GeneralSansSemibold: require("./assets/fonts/GeneralSans-Semibold.ttf"),
    });

    const linking = {
        prefixes: [prefix],
    };

    useEffect(() => {
        async function prepare() {
            try {
                fontsLoaded;
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
        <Provider store={store}>
            <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <NavigationContainer linking={linking} fallback={<HText>Loading...</HText>}>
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
                            <Stack.Screen
                                name="SigninOverview"
                                component={SigninOverview}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Signup"
                                component={Signup}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Signin"
                                component={Signin}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ForgotPasswordScreen1"
                                component={ForgotPassword}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ForgotPasswordScreen2"
                                component={ForgotPassword2}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="PointOfInterest"
                                component={PointOfInterest}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Tabs"
                                component={Tabs}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                    <Toast />
                </SafeAreaProvider>
            </View>
        </Provider>
    );
}
