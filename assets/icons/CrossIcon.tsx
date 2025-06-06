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
      stroke="#9D9D95"
      strokeLinecap="square"
      strokeWidth={1.5}
      d="m3.167 3.167 9.666 9.666m0-9.666-9.666 9.666"
    />
  </Svg>
)
export default SvgComponent
