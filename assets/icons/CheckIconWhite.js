import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CheckIconWhite = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            fillRule="evenodd"
            d="M17.353 6.144A1 1 0 1 0 15.98 4.69l-9.019 8.518L4.02 10.43a1 1 0 0 0-1.373 1.454l3.628 3.427a1 1 0 0 0 1.373 0l9.705-9.167Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default CheckIconWhite;
