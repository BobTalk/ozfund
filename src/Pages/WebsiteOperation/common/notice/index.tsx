import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import TableProcess from "./table";
import { useEffect, useRef, useState } from "react";
import AddTrendsModule from "./addNotice";
import { mergeClassName } from "@/utils/base";
import { useLocation } from "react-router-dom";
import { AddNoticeInterface, UpdateNoticeInterface } from "@/api";
import { languageEnum } from "@/Enum";
const Notice = () => {
  let { state } = useLocation();
  let tabelRefs = useRef<any>();
  let topModuleRefs = useRef<any>();
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  let [addNoticeInfo, setAddNoticeInfo] = useState(false);
  let [crtData, setCrtData] = useState<any>({});
  function addNoticeCb() {
    setCrtData({});
    setAddNoticeInfo(!addNoticeInfo);
  }
  function cancelCb() {
    setAddNoticeInfo(!addNoticeInfo);
  }
  function editorCb(crt) {
    setCrtData(crt);
    setAddNoticeInfo(!addNoticeInfo);
  }
  async function updateNoticeCb(crt) {
    let { status, message: tipInfo } = await UpdateNoticeInterface(crt);
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      setAddNoticeInfo(!addNoticeInfo);
      tabelRefs?.current?.editorLoadTableList();
    }
  }
  async function addNoticeSubmitCb({ title, sender, sendEmail, content }) {
    let { status, message: tipInfo } = await AddNoticeInterface({
      subject: title,
      sender,
      content,
      sendEmail,
      language: languageEnum[state.language],
    });
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      setAddNoticeInfo(!addNoticeInfo);
      tabelRefs?.current?.updateTableList(
        {},
        {
          pageNo: 1,
          pageSize: 10,
        }
      );
    }
  }
  useEffect(() => {
    let { height } = topModuleRefs.current.getBoundingClientRect();
    setFilterModuleHeight(height);
  }, []);
  return (
    <>
      {!addNoticeInfo ? (
        <div
          ref={topModuleRefs}
          className="flex bg-white justify-end p-[var(--gap20)] rounded-[var(--border-radius)]"
        >
          <Button
            onClick={addNoticeCb}
            type="primary"
            className="py-[6px] h-[.36rem]"
            icon={<PlusOutlined />}
          >
            新增公告
          </Button>
        </div>
      ) : null}

      {addNoticeInfo ? (
        <div
          className={mergeClassName(
            "bg-white h-full rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]"
          )}
        >
          <AddTrendsModule
            crtData={crtData}
            onUpdateNotice={updateNoticeCb}
            onAddNotice={addNoticeSubmitCb}
            onCancel={cancelCb}
            language={state.language}
          />
        </div>
      ) : (
        <TableProcess
          style={{
            height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
          }}
          ref={tabelRefs}
          onEditor={editorCb}
          language={state.language}
        />
      )}
    </>
  );
};
export default Notice;
