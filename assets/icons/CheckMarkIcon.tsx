import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    {...props}
    width={16}
    height={16}
    fill="none"
  >
    <Path
      stroke="#B5FF4D"
      strokeLinecap="square"
      strokeWidth={1.5}
      d="M1.833 10.063 6 13.5l8.167-11"
    />
  </Svg>
)
export default SvgComponent
