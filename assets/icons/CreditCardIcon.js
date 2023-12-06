import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CreditCardIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={21}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            stroke="#5DB400"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.375 6.875h16.25M2.375 7.5h16.25m-13.75 4.375h5m-5 1.875h2.5m-3.125 2.5h12.5c1.035 0 1.875-.84 1.875-1.875v-8.75c0-1.036-.84-1.875-1.875-1.875H4.25c-1.036 0-1.875.84-1.875 1.875v8.75c0 1.036.84 1.875 1.875 1.875Z"
        />
    </Svg>
);
export default CreditCardIcon;
