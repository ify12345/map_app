import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ImageSourcePropType, StyleProp, ImageStyle } from "react-native";
import Weather from "../drawer/Weather";
import Go from "./Go";
import { UserIcon} from 'react-native-heroicons/outline';
import Profile from "../drawer/Profile";
import Saved from "../drawer/Saved";
import { MapIcon } from "react-native-heroicons/solid";
import Explore from "../drawer/Explore";
import NearbyPlaces from "../NearbyPlaces";
import Notifications from "../drawer/Notifications";
import MyTrips from "../drawer/MyTrips";
import TrafficArea from "../drawer/TrafficArea";
import AugmentedReality from "../drawer/AugmentedReality";
import Language from "../onboarding/Language";
import Support from "../drawer/Support";
import About from "../drawer/About";

const Drawer = createDrawerNavigator();

// Custom Drawer Content Component
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
        <View style={{justifyContent:"center",flexDirection:"column", alignItems:"center", paddingVertical: 20, borderBottomWidth:1}}>
          <Image source={require("../../assets/roaders.png")} style={{}}/>
        </View>
      <View style={{flexDirection:"column", marginVertical:50}}>   
      <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};
interface CustomDrawerIconProps {
    source: ImageSourcePropType;
    size: number;
    color: string;
    style?: StyleProp<ImageStyle>;
  }
  
  const CustomDrawerIcon: React.FC<CustomDrawerIconProps> = ({ source, size, color, style }) => {
    return <Image source={source} style={[{ width: size, height: size, tintColor: color }, style]} />;
  };

const SideStack = () => {
    const [hide, setHide] = useState(false);
    function hideTab() {
        setHide(!hide);
    }

    return (
       
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>

          <Drawer.Screen
                name="Go"
                options={{
    
                    drawerIcon: ({ color }) => (
                        <MapIcon color={color} size={28} />
                    ),
                }}
            >
                {(props) => <Go {...props} hideTab={hideTab} />}
            </Drawer.Screen>


              <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            drawerIcon: ({ focused, color, size }) => (
                <CustomDrawerIcon source={require('../../assets/drawerIcons/user.png')} size={size} color={color} />
            ),
          }}
        />
              <Drawer.Screen
          name="Explore"
          component={Explore}
          options={{
            drawerIcon: ({ focused, color, size }) => (
                <CustomDrawerIcon source={require('../../assets/drawerIcons/zoom-in.png')} size={size} color={color} />
            ),
          }}
        />

          <Drawer.Screen name="Saved" component={Saved}
                
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <CustomDrawerIcon source={require('../../assets/drawerIcons/bookmark.png')} size={size} color={color} />
                    ),
                  }}
                />

              <Drawer.Screen
          name="Nearby"
          component={NearbyPlaces}
          options={{
            drawerIcon: ({ focused, color, size }) => (
                <CustomDrawerIcon source={require('../../assets/drawerIcons/map-marker.png')} size={size} color={color} />
            ),
          }}
        />

              <Drawer.Screen
          name="Notifications"
          component={Notifications}
          options={{
            drawerIcon: ({ focused, color, size }) => (
                <CustomDrawerIcon source={require('../../assets/drawerIcons/bell.png')} size={size} color={color} />
            ),
          }}
        />
              <Drawer.Screen
          name="My Trips"
          component={MyTrips}
          options={{
            drawerIcon: ({ focused, color, size }) => (
                <CustomDrawerIcon source={require('../../assets/drawerIcons/clock.png')} size={size} color={color} />
            ),
          }}
        />
              <Drawer.Screen
          name="Traffic Area"
          component={TrafficArea}
          options={{
            drawerIcon: ({ focused, color, size }) => (
                <CustomDrawerIcon source={require('../../assets/drawerIcons/car.png')} size={size} color={color} />
            ),
          }}
        />
              <Drawer.Screen
          name="Augment Reality"
          component={AugmentedReality}
          options={{
            drawerIcon: ({ focused, color, size }) => (
                <CustomDrawerIcon source={require('../../assets/drawerIcons/AR.png')} size={size} color={color} />
            ),
          }}
        />
         




               
                <Drawer.Screen name="Weather" component={Weather}
                   options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <CustomDrawerIcon source={require('../../assets/drawerIcons/sun-cloud.png')} size={size} color={color} />
                    ),
                  }}
                />

                <Drawer.Screen name="Language" component={Language}
                   options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <CustomDrawerIcon source={require('../../assets/drawerIcons/globe.png')} size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen name="About" component={About}
                   options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <CustomDrawerIcon source={require('../../assets/drawerIcons/about.png')} size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen name="Support" component={Support}
                   options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <CustomDrawerIcon source={require('../../assets/drawerIcons/support.png')} size={size} color={color} />
                    ),
                  }}
                />







            </Drawer.Navigator>

    );
};

export default SideStack;

const styles = StyleSheet.create({});
