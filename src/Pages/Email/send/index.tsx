import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TableSend from "./table";
import MoreBtn from "@/Components/MoreBtn";
import { useState } from "react";
import AddSendModule from "./addSend";
import { mergeClassName } from "@/utils/base";
const Send = () => {
  let [addSendInfo, setAddSendInfo] = useState(false);
  function addTempCb() {
    setAddSendInfo(!addSendInfo);
  }
  function cancelCb() {
    setAddSendInfo(!addSendInfo);
  }
  return (
    <>
      {!addSendInfo ? (
        <div className="flex bg-white justify-end p-[var(--gap20)] rounded-[var(--border-radius)]">
          <Button
            onClick={addTempCb}
            type="primary"
            className="py-[6px] h-[.36rem]"
            icon={<PlusOutlined />}
          >
            新增模板
          </Button>
        </div>
      ) : null}
      <div
        className={mergeClassName(
          "bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]",
          addSendInfo ? "h-full" : ""
        )}
      >
        {addSendInfo ? (
          <AddSendModule onCancel={cancelCb} />
        ) : (
          <TableSend />
        )}
      </div>
      {!addSendInfo ? <MoreBtn /> : null}
    </>
  );
};
export default Send;
