import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import TableProcess from "./table";
import MoreBtn from "@/Components/MoreBtn";
import { useRef, useState } from "react";
import AddProcessModule from "./addProcess";
import { mergeClassName } from "@/utils/base";
import { useLocation } from "react-router-dom";
import { AddProcessInterface, UpdateProcessInterface } from "@/api";
import { languageEnum } from "@/Enum";
const Process = () => {
  let { state } = useLocation();
  let tabelRefs = useRef<any>();
  let [addProcessInfo, setAddProcessInfo] = useState(false);
  let [crtData, setCrtData] = useState<any>({});
  function addProcessCb() {
    setCrtData({});
    setAddProcessInfo(!addProcessInfo);
  }
  function cancelCb() {
    setAddProcessInfo(!addProcessInfo);
  }
  function editorCb(crt) {
    setCrtData(crt);
    setAddProcessInfo(!addProcessInfo);
  }
  async function updateProcessCb(crt) {
    let { status, message: tipInfo } = await UpdateProcessInterface(crt);
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      setAddProcessInfo(!addProcessInfo);
      tabelRefs?.current?.editorLoadTableList();
    }
  }
  async function addProcessSubmitCb({ title, content }) {
    let { status, message: tipInfo } = await AddProcessInterface({
      subject: title,
      content,
      language: languageEnum[state.language],
    });
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      setAddProcessInfo(!addProcessInfo);
      tabelRefs?.current?.updateTableList(
        {},
        {
          pageNo: 1,
          pageSize: 10,
        }
      );
    }
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

      {addProcessInfo ? (
        <div
          className={mergeClassName(
            "bg-white h-full rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]"
          )}
        >
          <AddProcessModule
            crtData={crtData}
            onUpdateProcess={updateProcessCb}
            onAddProcess={addProcessSubmitCb}
            onCancel={cancelCb}
            language={state.language}
          />
        </div>
      ) : (
        <TableProcess
          ref={tabelRefs}
          onEditor={editorCb}
          language={state.language}
        />
      )}
    </>
  );
};
export default Process;
