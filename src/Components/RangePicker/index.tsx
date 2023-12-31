import { DatePicker } from "antd";
const { RangePicker: Picker } = DatePicker;
import locale from "antd/es/date-picker/locale/zh_CN";
import "dayjs/locale/zh-cn";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
const RangePicker = (props, ref) => {
  let { value, form, name } = props;
  let [time, setTime] = useState<any>(value);
  let [timeStr, setTimeStr] = useState();
  function timeChangeCb(date, dateString) {
    setTimeStr(dateString);
    setTime(date);
    form?.setFieldValue?.(name, dateString ?? []);
  }

  useImperativeHandle(
    ref,
    () => ({
      time,
      timeStr,
    }),
    [time]
  );
  return (
    <Picker
      ref={ref}
      size={props.size}
      value={time}
      onChange={timeChangeCb}
      locale={locale}
    />
  );
};

export default forwardRef(RangePicker);
