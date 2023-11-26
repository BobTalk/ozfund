import routerConfig from "@/Routers/config";
console.log('routerConfig: ', routerConfig);
let routerFilter = routerConfig.find(item => item.isAuth)
console.log('routerFilter: ', routerFilter);
const RightsAdjust = () => {
  return <>RightsAdjust</>;
};
export default RightsAdjust