import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import TableProblem from "./table";
import MoreBtn from "@/Components/MoreBtn";
import { forwardRef, useRef, useState } from "react";
import { mergeClassName } from "@/utils/base";
import ModalScope from "@/Pages/ModalComp";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalFooter from "@/Components/ModalFooterBtn";
const Problem = () => {
  let [addProblemInfoOpen, setAddProblemInfoOpen] = useState(false);
  let [showFilterComp, setShowFilterComp] = useState(false);
  let [stop] = useStopPropagation();

  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>();

  function addProblemCb(e) {
    stop(e, () => {
      moduleContent.current = EditorOrAddProblem;
      moduleTitle.current = "新增问题分类";
      setAddProblemInfoOpen(!addProblemInfoOpen);
      // setShowFilterComp(!showFilterComp);
    });
  }
  function lookCb(e, crt, index) {
    stop(e, () => {
      // moduleContent.current = EditorOrAddProblem;
      // moduleTitle.current = "查看问题分类";
      // setAddProblemInfoOpen(!addProblemInfoOpen);
      setShowFilterComp(!showFilterComp);
    });
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
          新增问题分类
        </Button>
      </div>
      {showFilterComp ? (
        <FilterContentModule onLook={lookCb} />
      ) : (
        <ContentModule onLook={lookCb} />
      )}

      <ModalComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={addProblemInfoOpen}
        onCancel={() => setAddProblemInfoOpen(!addProblemInfoOpen)}
        onOk={(values) => setAddProblemInfoOpen(!addProblemInfoOpen)}
      />
    </>
  );
};
const FilterContentModule = (props) => {
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
  let [activeFilter, setActiveFilter] = useState("");
  function filterItemCb(e, crt) {
    stop(e, () => {
      setActiveFilter(crt.id);
    });
  }
  function lookCb() {
    props?.onLook?.();
  }
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
        <ContentModule onLook={lookCb} />
      </div>
    </div>
  );
};

const ContentModule = (props) => {
  function lookCb() {
    props?.onLook?.();
  }
  return (
    <>
      <div className="bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]">
        <TableProblem onLook={lookCb} />
      </div>
      <MoreBtn />
    </>
  );
};
const EditorOrAddProblem = (props) => {
  let [stop] = useStopPropagation();
  let [form] = Form.useForm();
  let [formInitVal] = useState({
    problemType: "",
  });
  function submitCb(values) {
    console.log("values: ", values);
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

const ModalComp = forwardRef((props: any, ref: any) => {
  function cancelCb(value) {
    props?.onCancel?.(value);
  }
  function okCb(values) {
    props?.onOk?.(values);
  }
  let CompName = props.content;
  return props.modalOpen ? (
    <ModalScope
      onCancel={cancelCb}
      showFooter={false}
      modalOpen={true}
      body={{
        paddingInline: "0",
        paddingBlock: "0",
      }}
      title={props.title}
    >
      <CompName onCancel={cancelCb} onOk={okCb} />
    </ModalScope>
  ) : null;
});
export default Problem;
