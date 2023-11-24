import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TableTemp from "./table";
import MoreBtn from "@/Components/MoreBtn";
import { useState } from "react";
import AddTempModule from "./addTemp";
import { mergeClassName } from "@/utils/base";
const Temp = () => {
  let [addTempInfo, setAddTempInfo] = useState(false);
  function addTempCb() {
    setAddTempInfo(!addTempInfo);
  }
  function cancelCb() {
    setAddTempInfo(!addTempInfo);
  }
  return (
    <>
      {!addTempInfo ? (
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
          addTempInfo ? "h-full" : ""
        )}
      >
        {addTempInfo ? (
          <AddTempModule onCancel={cancelCb} />
        ) : (
          <TableTemp />
        )}
      </div>
      {!addTempInfo ? <MoreBtn /> : null}
    </>
  );
};
export default Temp;
