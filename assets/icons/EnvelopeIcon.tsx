import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    {...props}
    width={20}
    height={20}
    fill="none"
  >
    <Path fill="#9D9D95" d="M2.15 3.333 10 9.757l7.85-6.424H2.15Z" />
    <Path
      fill="#9D9D95"
      d="M1.667 5.092v11.575h16.666V5.092L10 11.91 1.667 5.092Z"
    />
  </Svg>
)
export default SvgComponent
