import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import TableProcess from "./table";
import { useRef, useState } from "react";
import AddTrendsModule from "./addTrends";
import { mergeClassName } from "@/utils/base";
import { useLocation } from "react-router-dom";
import { AddTrendsInterface, UpdateTrendsInterface } from "@/api";
import { languageEnum } from "@/Enum";
const Trends = () => {
  let { state } = useLocation();
  let tabelRefs = useRef<any>();
  let [addTrendsInfo, setAddTrendsInfo] = useState(false);
  let [crtData, setCrtData] = useState<any>({});
  function addTrendsCb() {
    setCrtData({});
    setAddTrendsInfo(!addTrendsInfo);
  }
  function cancelCb() {
    setAddTrendsInfo(!addTrendsInfo);
  }
  function editorCb(crt) {
    setCrtData(crt);
    setAddTrendsInfo(!addTrendsInfo);
  }
  async function updateTrendsCb(crt) {
    let { status, message: tipInfo } = await UpdateTrendsInterface(crt);
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      setAddTrendsInfo(!addTrendsInfo);
      tabelRefs?.current?.editorLoadTableList();
    }
  }
  async function addTrendsSubmitCb({ title, time,content }) {
    let { status, message: tipInfo } = await AddTrendsInterface({
      subject: title,
      time,
      content,
      language: languageEnum[state.language],
    });
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      setAddTrendsInfo(!addTrendsInfo);
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
      {!addTrendsInfo ? (
        <div className="flex bg-white justify-end p-[var(--gap20)] rounded-[var(--border-radius)]">
          <Button
            onClick={addTrendsCb}
            type="primary"
            className="py-[6px] h-[.36rem]"
            icon={<PlusOutlined />}
          >
            新增动态
          </Button>
        </div>
      ) : null}

      {addTrendsInfo ? (
        <div
          className={mergeClassName(
            "bg-white h-full rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]"
          )}
        >
          <AddTrendsModule
            crtData={crtData}
            onUpdateTrends={updateTrendsCb}
            onAddTrends={addTrendsSubmitCb}
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
export default Trends;
