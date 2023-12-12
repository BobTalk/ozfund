import { Button } from "antd";
import TableConfig from "./table";
import linkIcon from "@/assets/images/link.svg";
import { useStopPropagation } from "@/Hooks/StopPropagation.js";
import { useEffect, useRef, useState } from "react";
import ModalComp from "@/Pages/ModalComp";
import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "@/utils/base";
import { DownOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";

const Todo = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [], balance: "", chainId: "" };
  const [wallet, setWallet] = useState(initialState);

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let [stop] = useStopPropagation();
  let topModuleRefs = useRef<any>();
  let tableRefs = useRef<any>();
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  let [signatureOpen, setSignatureOpen] = useState(false);
  function signatureCb(e, crt, index) {
    stop(e, () => {
      setSignatureOpen(!signatureOpen);
    });
  }
  useEffect(() => {
    const refreshAccounts = (accounts: any): any => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
      if (provider) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        (window as any).ethereum.on("accountsChanged", refreshAccounts);
        (window as any).ethereum.on("chainChanged", refreshChain);
      }
    };
    getProvider();
    return () => {
      (window as any).ethereum?.removeListener(
        "accountsChanged",
        refreshAccounts
      );
      (window as any).ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const updateWallet = async (accounts: any) => {
    const balance = formatBalance(
      await (window as any).ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await (window as any).ethereum!.request({
      method: "eth_chainId",
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    await (window as any).ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: []) => {
        setError(false);
        updateWallet(accounts);
      })
      .catch((err: any) => {
        setError(true);
        setErrorMessage(err.message);
      });
    setIsConnecting(false);
  };
  function installCb() {
    window.open("https://metamask.io", "_blank");
  }
  // const disableConnect = Boolean(wallet) && isConnecting;
  return (
    <>
      <div
        ref={topModuleRefs}
        className="flex justify-end bg-[var(--white)] px-[var(--gap20)] py-[var(--gap15)] rounded-[var(--border-radius)]"
      >
        {!hasProvider && (
          <Button
            onClick={installCb}
            className="flex items-center h-[.35rem]"
            type="primary"
            icon={<VerticalAlignBottomOutlined />}
          >
            Install MetaMask
          </Button>
        )}
        {(window as any).ethereum?.isMetaMask && wallet.accounts.length < 1 && (
          <Button
            onClick={handleConnect}
            className="flex items-center h-[.35rem]"
            type="primary"
            icon={<img src={linkIcon} alt="" />}
          >
            连接钱包
          </Button>
        )}
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
        onOk={signatureCb}
        onCancel={signatureCb}
      >
        <>
          <p className="flex items-center justify-between  text-[14px] mt-[var(--gap20)]">
            <span className="text-[#C5CAD0]">管理员A</span>
            <span className="text-[#333]">weeweesssssssssssssss</span>
          </p>
          <p className="flex items-center justify-between text-[14px] mt-[var(--gap20)]">
            <span className="text-[#C5CAD0]">员工ID</span>
            <span className="text-[#333]">Alex.yu</span>
          </p>
        </>
      </ModalComp>
    </>
  );
};

export default Todo;
