import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import TableProblem from "./table";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalFooter from "@/Components/ModalFooterBtn";
import ModalScopeComp from "@/Pages/ModalScope";
import { AddProbelmTypeInterface } from "@/api";
import { useLocation } from "react-router-dom";
import { languageEnum } from "@/Enum";
const Problem = () => {
  let [addProblemInfoOpen, setAddProblemInfoOpen] = useState(false);
  let [showFilterComp, setShowFilterComp] = useState(false);
  let { state } = useLocation();
  let tableRefs = useRef<any>();
  let filterTableTefs = useRef<any>();
  let [stop] = useStopPropagation();
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>();

  function addProblemCb(e) {
    stop(e, () => {
      if (showFilterComp) {
        // 详情页添加
      } else {
        // 列表添加
        moduleContent.current = EditorOrAddProblem;
        moduleTitle.current = "新增问题分类";
        setAddProblemInfoOpen(!addProblemInfoOpen);
      }

      // setShowFilterComp(!showFilterComp);
    });
  }
  function lookCb(e, crt, index) {
    stop(e, () => {
      setShowFilterComp(!showFilterComp);
    });
  }
  async function problemTypeSubmit({ problemType }) {
    console.log("values: ", problemType);
    let { status, message: tipInfo } = await AddProbelmTypeInterface({
      typeName: problemType,
      language: languageEnum[state.language],
    });
    message[status ? "success" : "error"](tipInfo);
    if(status){
      setAddProblemInfoOpen(!addProblemInfoOpen);
      showFilterComp?'':tableRefs.current.getTableList()
    }
  }
  return (
    <>
      <div className="flex bg-white justify-end p-[var(--gap20)] rounded-[var(--border-radius)]">
        <Button
          onClick={addProblemCb}
          type="primary"
          className="py-[6px] h-[.36rem]"
          icon={<PlusOutlined />}
        >
          {showFilterComp ?"新增问题" :"新增问题分类"}
          
        </Button>
      </div>
      {showFilterComp ? (
        <FilterContentModule ref={filterTableTefs} />
      ) : (
        <TableProblem ref={tableRefs} isDetail={true} onLook={lookCb} />
      )}

      <ModalScopeComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={addProblemInfoOpen}
        onCancel={() => setAddProblemInfoOpen(!addProblemInfoOpen)}
        onOk={problemTypeSubmit}
      />
    </>
  );
};
const FilterContentModule = forwardRef((props, ref) => {
  let problemListFilter = [
    {
      id: "A",
      title: "A类问题",
    },
    {
      id: "B",
      title: "B类问题",
    },
    {
      id: "C",
      title: "C类问题",
    },
  ];
  let [stop] = useStopPropagation();
  let tableRefs = useRef<any>();
  let [activeFilter, setActiveFilter] = useState("");
  function filterItemCb(e, crt) {
    stop(e, () => {
      setActiveFilter(crt.id);
    });
  }
  function getTableInfo() {
    return tableRefs.current.isDetailFlagCb();
  }
  function lookCb() {}
  useImperativeHandle(
    ref,
    () => ({
      getTableInfo,
    }),
    []
  );
  return (
    <div className="grid grid-cols-[2rem_1fr] gap-x-[var(--gap15)] ">
      <div className="rounded-[var(--border-radius)] w-[2rem] overflow-hidden bg-white mt-[var(--gap15)]">
        <p className="grid place-items-center w-full h-[65px] bg-[#fafafa] rounded-[var(--border-radius)]">
          <span className="text-[16px] text-[#333]">问题分类</span>
        </p>
        <ul className="w-full">
          {problemListFilter.map((item) => (
            <li
              onClick={(e) => filterItemCb(e, item)}
              key={item.id}
              className="grid place-items-center h-[.6rem] border-b border-b-[#e9e9e9]"
            >
              <span
                className={mergeClassName(
                  "cursor-pointer",
                  activeFilter == item.id ? "text-[var(--blue)]" : ""
                )}
              >
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <TableProblem onLook={lookCb} isDetail={false} ref={tableRefs} />
      </div>
    </div>
  );
});

const EditorOrAddProblem = (props) => {
  let [stop] = useStopPropagation();
  let [form] = Form.useForm();
  let [formInitVal] = useState({
    problemType: "",
  });
  function submitCb(values) {
    props?.onOk(values);
  }
  function cancelCb(e) {
    stop(e, () => {
      props?.onCancel?.(false);
    });
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
      }}
    >
      <Form
        layout="vertical"
        onFinish={submitCb}
        initialValues={formInitVal}
        form={form}
      >
        <Form.Item
          className="mb-[var(--gap30)] mx-[var(--gap30)] mt-[var(--gap20)]"
          label={<span className="text-[var(--border-color)]">问题分类</span>}
          name="problemType"
        >
          <Input size="large" placeholder="请输入问题分类" />
        </Form.Item>

        <Form.Item className="mb-0">
          <ModalFooter onCancel={(e) => cancelCb(e)} />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default Problem;
