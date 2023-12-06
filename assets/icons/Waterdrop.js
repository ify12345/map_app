import * as React from "react";
import Svg, { Path } from "react-native-svg";
const WaterdropIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={21}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            fill="#5DB400"
            fillRule="evenodd"
            d="M11.686 2.59c-.38-1.14-1.992-1.14-2.372 0l-3.12 9.359a4.167 4.167 0 0 0 1.007 4.264l.353.353a4.167 4.167 0 0 0 5.892 0l.353-.353a4.167 4.167 0 0 0 1.007-4.264l-3.12-9.36Zm-3.91 9.886L10.5 4.302l2.725 8.174a2.5 2.5 0 0 1-.604 2.558l-.353.353a2.5 2.5 0 0 1-3.536 0l-.353-.353a2.5 2.5 0 0 1-.604-2.558Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default WaterdropIcon;
