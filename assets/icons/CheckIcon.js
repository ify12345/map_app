import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CheckIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={25}
        fill="none"
        {...props}
    >
        <Path
            fill="#1F1F1F"
            fillRule="evenodd"
            d="M20.687 7.727a1 1 0 1 0-1.374-1.454L8.353 16.625 4.687 13.16a1 1 0 1 0-1.374 1.454l4.354 4.112a1 1 0 0 0 1.373 0l11.647-11Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default CheckIcon;
