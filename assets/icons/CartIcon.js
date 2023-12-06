import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CartIcon = (props) => (
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
            d="M2.375 2.5H3.53c.424 0 .796.286.906.696l.319 1.197m1.995 7.482a2.5 2.5 0 0 0-2.5 2.5h13.125m-10.625-2.5h9.349a49.674 49.674 0 0 0 2.436-5.948 50.095 50.095 0 0 0-13.78-1.534m1.995 7.482L4.755 4.393M5.5 16.875a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Zm10.625 0a.625.625 0 1 1-1.25 0 .625.625 0 0 1 1.25 0Z"
        />
    </Svg>
);
export default CartIcon;
