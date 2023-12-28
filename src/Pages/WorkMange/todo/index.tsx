import { Button } from "antd";
import TableConfig from "./table";
import linkIcon from "@/assets/images/link.svg";
import { useStopPropagation } from "@/Hooks/StopPropagation.js";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ModalComp from "@/Pages/ModalComp";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { getSession, removeSession, setSession } from "@/utils/base";
import { useWallatInfo } from "@/Hooks/Web";
import { useAccount, useConnect, useDisconnect, useNetwork, } from "wagmi";
import { getAccount } from '@wagmi/core'
const Todo = () => {
  let [walletConnectFlag,setWalletConnectFlag] = useState<boolean>(false)
  let { signature } = useWallatInfo();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const { address } = useAccount({
    onConnect: ({address}) => {
      setWalletConnectFlag(true)
      setSession("ethAddress", address)
    }
  });
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      setWalletConnectFlag(false)
      removeSession("chainId");
      removeSession("ethAddress");
    },
  });
  let [stop] = useStopPropagation();
  let topModuleRefs = useRef<any>();
  let tableRefs = useRef<any>();
  let crtInfo = useRef<any>({});
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(60);
  let [signatureOpen, setSignatureOpen] = useState(false);

  function signatureCb(e, crt = {}, index) {
    stop(e, () => {
      crtInfo.current = crt;
      setSignatureOpen(!signatureOpen);
    });
  }
  function signatureSubmitCb() {
    signature({
      accountAddress: getSession("ethAddress"),
      chainId: getSession("chainId"),
      id: crtInfo?.current?.id,
    }).then(() => {
      setSignatureOpen(!signatureOpen);
    });
  }
  useEffect(() => {
   let {isConnected} =  getAccount()
   setWalletConnectFlag(isConnected)
  }, []);

  const getWalletInfo = async () => {
    const chainId = await (window as any).ethereum!.request({
      method: "eth_chainId",
    });
    // 以太链ID
    console.log('chainId: ', chainId);
    setSession("chainId", chainId);
  };
  function walletCb(e) {
    console.log('e: ', e);
    stop(e, () => {
      if (walletConnectFlag) {
        disconnect();
      } else {
        connect();
        getWalletInfo();
      }
    });
  }
  function getHeaderH() {
    let { height } = topModuleRefs?.current?.getBoundingClientRect();
    setFilterModuleHeight(height);
  }
  useLayoutEffect(() => {
    setTimeout(() => {
      getHeaderH();
    }, 1000);
  }, []);
  // const disableConnect = Boolean(wallet) && isConnecting;
  return (
    <>
      <div
        ref={topModuleRefs}
        className="flex justify-end bg-[var(--white)] px-[var(--gap20)] py-[var(--gap15)] rounded-[var(--border-radius)]"
      >
        <Button
          onClick={walletCb}
          className="flex items-center h-[.35rem]"
          type="primary"
          icon={<img src={linkIcon} alt="" />}
        >
          {walletConnectFlag ? "断开连接" : "连接钱包"}
        </Button>
      </div>
      <TableConfig
        ref={tableRefs}
        style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }}
        onEditor={signatureCb}
      />
      <ModalComp
        title="签名"
        modalOpen={signatureOpen}
        body={{
          marginInline: "var(--gap30)",
          marginBottom: "var(--gap30)",
        }}
        footer={{
          paddingInline: ".28rem",
          paddingBlock: "var(--gap20)",
        }}
        onOk={signatureSubmitCb}
        onCancel={signatureCb}
      >
        <>
          <p className="flex items-center justify-between  text-[14px] mt-[var(--gap20)]">
            <span className="text-[#C5CAD0]">管理员</span>
            <span className="text-[#333]">{getSession("ethAddress")}</span>
          </p>
          <p className="flex items-center justify-between text-[14px] mt-[var(--gap20)]">
            <span className="text-[#C5CAD0]">员工ID</span>
            <span className="text-[#333]">
              {getSession("userInfo").adminId}
            </span>
          </p>
        </>
      </ModalComp>
    </>
  );
};

export default Todo;
