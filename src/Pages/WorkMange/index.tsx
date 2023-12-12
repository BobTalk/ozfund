import { Outlet } from "react-router-dom";
// import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
const WorkMange = () => {
  return (
    // <MetaMaskUIProvider sdkOptions={{
    //   dappMetadata: {
    //     name: "数字钱包",
    //   }
    // }}>
    <Outlet />
    // </MetaMaskUIProvider>
  );
};
export default WorkMange;
