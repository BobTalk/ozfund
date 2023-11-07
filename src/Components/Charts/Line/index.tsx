import { forwardRef } from 'react';
import CommonChart from '../common'
type LinePropsType = {
  option: {};
  className?: "";
  style?: {};
};
const Line = (props: LinePropsType, ref: any) => {
  let { option, className, style } = props;
  return <div className={className} style={style}>
    <CommonChart ref={ref} option={option} />
  </div>;
};
export default forwardRef(Line);
