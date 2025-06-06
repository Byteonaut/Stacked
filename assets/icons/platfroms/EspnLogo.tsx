import * as React from "react"
import Svg, { Path, Rect, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    {...props}
    width={32}
    height={32}
    fill="none"
  >
    <Rect width={32} height={32} fill="#AA3B25" rx={4} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m3.838 12.708-.301 1.905H8.95l.302-1.905H3.838Zm24.644 6.585h-2.12l.547-3.944h2.12l-.547 3.944Zm-4.178 0h-2.121l.548-3.944h2.12l-.547 3.944Zm-8.098-3.944-.486 3.944h2.072l.353-2.474h3.042c1.087 0 1.002-1.47 1.002-1.47h-5.983Zm-1.637 0H9.42c.015.735.15 1.47 1.036 1.47H13.4l-.042.97H9.353l-.301 1.47h5.415c.484 0 1.053-.835 1.053-2.24 0-1.036-.234-1.67-.951-1.67Zm8.189-.703.234-1.938h4.78c1.755 0 1.303 1.938 1.303 1.938h-6.317Zm-13.304 0s.186-1.938 1.538-1.938h10.395s.416.033.717.501c.301.468.186 1.437.186 1.437H9.454Zm-.837 2.24.301-1.47H3.504l-.635 3.81h.14l-.007.034h5.415l.301-1.471H4.863l.15-.903h3.604Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
