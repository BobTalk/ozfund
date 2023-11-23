import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TableProcess from "./table";
import MoreBtn from "@/Components/MoreBtn";
import { useState } from "react";
import AddProcessModule from "./addProcess";
import { mergeClassName } from "@/utils/base";
const Process = () => {
  let [addProcessInfo, setAddProcessInfo] = useState(false);
  function addProcessCb() {
    setAddProcessInfo(!addProcessInfo);
  }
  function cancelCb() {
    setAddProcessInfo(!addProcessInfo);
  }
  return (
    <>
      {!addProcessInfo ? (
        <div className="flex bg-white justify-end p-[var(--gap20)] rounded-[var(--border-radius)]">
          <Button
            onClick={addProcessCb}
            type="primary"
            className="py-[6px] h-[.36rem]"
            icon={<PlusOutlined />}
          >
            新增进程
          </Button>
        </div>
      ) : null}
      <div
        className={mergeClassName(
          "bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]",
          addProcessInfo ? "h-full" : ""
        )}
      >
        {addProcessInfo ? (
          <AddProcessModule onCancel={cancelCb} />
        ) : (
          <TableProcess />
        )}
      </div>
      {!addProcessInfo ? <MoreBtn /> : null}
    </>
  );
};
export default Process;
