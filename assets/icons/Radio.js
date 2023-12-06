import * as React from "react";
import Svg, { Path } from "react-native-svg";
const RadioGreen = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            fill="#5DB400"
            d="M5.833 10a4.167 4.167 0 1 1 8.334 0 4.167 4.167 0 0 1-8.334 0Z"
        />
        <Path
            fill="#5DB400"
            fillRule="evenodd"
            d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm0-13.333a5.833 5.833 0 1 0 0 11.666 5.833 5.833 0 0 0 0-11.666Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default RadioGreen;
