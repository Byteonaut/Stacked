import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    {...props}
    width={20}
    height={20}
    fill="none"
  >
    <Path
      fill="#9D9D95"
      fillRule="evenodd"
      d="M10 1.667a4.167 4.167 0 0 0-4.167 4.166V7.5h-2.5v10.833h13.334V7.5h-2.5V5.833A4.167 4.167 0 0 0 10 1.667ZM12.5 7.5V5.833a2.5 2.5 0 0 0-5 0V7.5h5Zm-1.666 3.333V15H9.167v-4.167h1.667Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
