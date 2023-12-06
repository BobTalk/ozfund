import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TableTemp from "./table";
import { useRef, useState } from "react";
import AddTempModule from "./addSend";
const Send = () => {
  let [addTempInfo, setAddTempInfo] = useState(false);

  let tableRefs = useRef<any>();
  let crtData = useRef<any>({});
  let crtTablePagination = useRef<{
    pageNo: number;
    pageSize: number;
    pageTotal?: number;
  }>({
    pageNo: 1,
    pageSize: 10,
  });
  let disabled = useRef<boolean>(false);
  function addTempCb() {
    crtData.current = {};
    disabled.current = false;
    setAddTempInfo(!addTempInfo);
  }
  function cancelCb() {
    setAddTempInfo(!addTempInfo);
  }
  function addSuccessCb() {
    setAddTempInfo(!addTempInfo);
  }
  function updateSuccessCb() {
    setAddTempInfo(!addTempInfo);
    setTimeout(() => {
      tableRefs?.current?.updateTableList(crtTablePagination.current);
    }, 1000);
  }
  function lookCb(crt, index) {
    crtData.current = crt;
    disabled.current = true;
    setAddTempInfo(!addTempInfo);
  }
  function editorCb(crt, index, pgt) {
    crtTablePagination.current = pgt;
    crtData.current = crt;
    disabled.current = false;
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
            新增邮件
          </Button>
        </div>
      ) : null}

      {addTempInfo ? (
        <div className="h-full bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]">
          <AddTempModule
            disabled={disabled.current}
            crtData={crtData.current}
            onCancel={cancelCb}
            onAdd={addSuccessCb}
            onUpdate={updateSuccessCb}
          />
        </div>
      ) : (
        <TableTemp ref={tableRefs} onLook={lookCb} onEditor={editorCb} />
      )}
    </>
  );
};
export default Send;
