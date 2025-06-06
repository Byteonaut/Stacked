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
      stroke="#CCCCC5"
      strokeLinecap="square"
      strokeWidth={1.5}
      d="M8 2.5V8m0 0v5.5M8 8H2.5M8 8h5.5"
    />
  </Svg>
)
export default SvgComponent
