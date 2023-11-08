import { Button } from "antd";
import TableConfig from "./table.jsx";
import linkIcon from "@/assets/images/link.svg";
import { useStopPropagation } from "@/Hooks/StopPropagation.js";
import { useState } from "react";
import ModalComp from "@/Pages/ModalComp/index.js";

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
      <div className="flex justify-end bg-[var(--white)] px-[.2rem] py-[.15rem]">
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
        onOk={signatureCb}
        onCancel={signatureCb}
      >
        <>
          <p className="flex items-center justify-between  text-[14px]">
            <span className="text-[#C5CAD0]">管理员A</span>
            <span className="text-[#333]">weeweesssssssssssssss</span>
          </p>
          <p className="flex items-center justify-between text-[14px] mt-[.2rem]">
            <span className="text-[#C5CAD0]">员工ID</span>
            <span className="text-[#333]">Alex.yu</span>
          </p>
        </>
      </ModalComp>
      <p className="py-[.14rem] bg-[var(--white)] text-center rounded-[var(--border-radius)] mt-[.15rem]">
        <span className="text-[14px] text-[#999] cursor-pointer">查看更多</span>
      </p>
    </>
  );
};

export default Todo;
