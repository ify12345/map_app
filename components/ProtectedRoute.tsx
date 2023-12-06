import React from "react";
import { useAppSelector } from "../store/hooks";
import { useNavigation } from "@react-navigation/native";

interface _props {
    children: any;
}
const ProtectedRoute = (props: _props) => {
    // const { children } = props;
    // const { user }: any = useAppSelector((state) => state.auth);
    // const navigation: any = useNavigation();

    // return !user ? children : navigation.navigate("SigninOverview");
};

export default ProtectedRoute;
