export const useStopPropagation = () => {
  function stop(e: any, fn: Function) {
    e?.stopPropagation?.();
    fn?.(e)
  } 
  return [stop]
}