import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventsHome from "./EventsHome";
import EventDetails from "./EventDetails";

const Stack = createNativeStackNavigator();

const Home = () => {
    return (
        <Stack.Navigator initialRouteName="EventsHome">
            <Stack.Screen
                name="EventsHome"
                component={EventsHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EventDetails"
                component={EventDetails}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default Home;
