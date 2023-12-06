import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ChevronLeftIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            stroke="#1F1F1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13.125 3.75 6.875 10l6.25 6.25"
        />
    </Svg>
);
export default ChevronLeftIcon;
