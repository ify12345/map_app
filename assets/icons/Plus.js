import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const PlusIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Rect width={24} height={24} fill="#fff" rx={12} />
        <Path
            fill="#000"
            d="M13 4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7v7a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4Z"
        />
    </Svg>
);
export default PlusIcon;
