import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import TableProblem from "./table";
import { useEffect, useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useLocation } from "react-router-dom";
import AddProblemModule from "./addProblem";
import { languageEnum } from "@/Enum";
import { AddProbelmInterface, UpdateProbelmInterface } from "@/api";

const Problem = () => {
  let [addProblem, setAddProblem] = useState(false);
  let [crtData, setCrtData] = useState<any>({});
  let topModuleRefs = useRef<any>();
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  let { state } = useLocation();
  let tableRefs = useRef<any>();
  let [stop] = useStopPropagation();
  function addProblemCb(e) {
    stop(e, () => {
      setCrtData({});
      setAddProblem(!addProblem);
    });
  }
  function cancelCb() {
    setAddProblem(!addProblem);
  }
  function editorCb(crt) {
    setCrtData(crt);
    setAddProblem(!addProblem);
  }
  async function updateProblemCb(crt) {
    let { status, message: tipInfo } = await UpdateProbelmInterface(crt);
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      setAddProblem(!addProblem);
      tableRefs?.current?.editorLoadTableList();
    }
  }
  async function addProblemSubmitCb({ problem, content }) {
    let { status, message: tipInfo } = await AddProbelmInterface({
      subject: problem,
      content,
      language: languageEnum[state.language],
    });
    message[status ? "success" : "error"](tipInfo);
    if (status) {
      setAddProblem(!addProblem);
      tableRefs?.current?.updateTableList(
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
      {addProblem ? (
        <AddProblemModule
          crtData={crtData}
          onUpdateProcess={updateProblemCb}
          onAddProcess={addProblemSubmitCb}
          onCancel={cancelCb}
          language={state.language}
        />
      ) : (
        <>
          <div
            ref={topModuleRefs}
            className="flex bg-white justify-end p-[var(--gap20)] rounded-[var(--border-radius)]"
          >
            <Button
              onClick={addProblemCb}
              type="primary"
              className="py-[6px] h-[.36rem]"
              icon={<PlusOutlined />}
            >
              新增问题
            </Button>
          </div>

          <TableProblem
            style={{
              height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
            }}
            ref={tableRefs}
            onEditor={editorCb}
            language={state.language}
          />
        </>
      )}
    </>
  );
};

export default Problem;
