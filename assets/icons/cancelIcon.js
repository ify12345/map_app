import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CancelIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={21}
        fill="none"
        {...props}
    >
        <Path
            fill="#1F1F1F"
            d="M5.876 5.197a.833.833 0 0 0-1.179 1.179L8.822 10.5l-4.125 4.124a.833.833 0 0 0 1.179 1.179L10 11.679l4.124 4.125a.833.833 0 0 0 1.179-1.179l-4.125-4.124 4.125-4.125a.833.833 0 0 0-1.179-1.179l-4.124 4.125-4.125-4.125Z"
        />
    </Svg>
);
export default CancelIcon;
