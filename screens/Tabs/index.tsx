import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Go from "./Go";
import Saved from "./Saved";
import Profile from "./Profile";
import {
    HomeIcon,
    MapIcon,
    BookmarkIcon,
    UserIcon,
} from "react-native-heroicons/outline";
import { useState } from "react";

const Tab = createBottomTabNavigator();

function Tabs() {
    const [hide, setHide] = useState(false);
    function hideTab() {
        setHide(!hide);
    }
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <HomeIcon color={color} size={28} />
                    ),
                    tabBarActiveTintColor: "#5DB400",
                    tabBarInactiveTintColor: "#777777",
                }}
            />
            <Tab.Screen
                name="Go"
                options={{
                    tabBarStyle: {
                        display: hide ? "none" : "flex",
                    },
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MapIcon color={color} size={28} />
                    ),
                    tabBarActiveTintColor: "#5DB400",
                    tabBarInactiveTintColor: "#777777",
                }}
            >
                {(props) => <Go {...props} hideTab={hideTab} />}
            </Tab.Screen>
            <Tab.Screen
                name="Saved"
                component={Saved}
                options={{
                    // headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <BookmarkIcon color={color} size={28} />
                    ),
                    tabBarActiveTintColor: "#5DB400",
                    tabBarInactiveTintColor: "#777777",
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    // headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <UserIcon color={color} size={28} />
                    ),
                    tabBarActiveTintColor: "#5DB400",
                    tabBarInactiveTintColor: "#777777",
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;
