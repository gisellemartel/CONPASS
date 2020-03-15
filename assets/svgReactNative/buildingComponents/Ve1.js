import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SvgVe1(props) {
  return (
    <Svg width={1024} height={1024} {...props}>
      <G stroke="#000" strokeWidth={2}>
        <Path
          d="M790.178 42.215v94.642h-97.213v57.807h14.646v6.063h33.84v-31.82h48.727v1.009h33.601v-47.344h6.567V42.215h-40.168z"
          fill="#f7d6d6"
        />
        <Path
          fill="#da3636"
          d="M707.612 168.906h33.84v31.82h-33.84zM790.178 42.215v127.701h33.601v-47.344h6.567V42.215h-40.168z"
        />
        <Path fill="#da3636" d="M692.965 168.906h14.647v25.759h-14.647z" />
      </G>
    </Svg>
  );
}

export default SvgVe1;
