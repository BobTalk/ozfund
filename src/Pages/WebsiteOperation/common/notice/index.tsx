import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TableNotice from "./table";
import MoreBtn from "@/Components/MoreBtn";
import { useState } from "react";
import AddNoticeModule from "./addNotice";
import { mergeClassName } from "@/utils/base";
const Notice = () => {
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
            新增公告
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
          <AddNoticeModule onCancel={cancelCb} />
        ) : (
          <TableNotice />
        )}
      </div>
      {!addProcessInfo ? <MoreBtn /> : null}
    </>
  );
};
export default Notice;
