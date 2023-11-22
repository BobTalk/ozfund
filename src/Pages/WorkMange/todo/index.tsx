import { Button } from "antd";
import TableConfig from "./table.jsx";
import linkIcon from "@/assets/images/link.svg";
import { useStopPropagation } from "@/Hooks/StopPropagation.js";
import { useState } from "react";
import ModalComp from "@/Pages/ModalComp";
import MoreBtn from "@/Components/MoreBtn/index.js";

const Todo = () => {
  let [stop] = useStopPropagation();
  let [signatureOpen, setSignatureOpen] = useState(false);
  function signatureCb(e, crt, index) {
    stop(e, () => {
      setSignatureOpen(!signatureOpen);
    });
  }
  return (
    <>
      <div className="flex justify-end bg-[var(--white)] px-[var(--gap20)] py-[var(--gap15)] rounded-[var(--border-radius)]">
        <Button
          className="flex items-center h-[.35rem]"
          type="primary"
          icon={<img src={linkIcon} alt="" />}
        >
          连接钱包
        </Button>
      </div>
      <TableConfig onEditor={signatureCb} />
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
      <MoreBtn />
    </>
  );
};

export default Todo;
