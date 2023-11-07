import { useCallback, useEffect, useRef, useState } from "react";
//initCount是倒计时时长，默认是60s，callBack是开始执行的回调函数，endBack是结束时执行的函数
export function useCountDown(
  initCount = 59,
  callBack = () => { },
  endBack = () => { }
) {
  //初始化定时器id
  const timeId = useRef<{ id: number }>({ id: 0 });
  //初始化倒计时
  const [count, setCount] = useState(initCount);
  //初始化是否禁用
  const [isdisable, setIsdisable] = useState(false);
  const [isExec, setIsExec] = useState(false)
  //开始,执行该函数之后会开启倒计时
  const start = (Fn?:Function) => {
    if (!isExec) {
      setIsExec(true)
      setCount(initCount);
      setIsdisable(true);
      Fn?.()
      timeId.current.id = window.setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
    }
  };
  //   首先清除定时器
  useEffect(() => window.clearInterval(timeId.current.id), []);
  //   判断是否需要清除
  useEffect(() => {
    if (count !== initCount || isdisable) {
      callBack();
    }
    if (count === 0) {
      setIsExec(false)
      clearInterval(timeId.current.id);
      setCount(initCount);
      endBack();
      setIsdisable(false);
    }
  }, [callBack, count, initCount, endBack, isdisable]);
  //对外暴露三个属性，开始执行函数，当前倒计时时间，是否禁用
  return { start, count, isdisable };
}
