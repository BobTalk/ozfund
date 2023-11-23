import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import TableProblem from "./table";
import MoreBtn from "@/Components/MoreBtn";
import { forwardRef, useRef, useState } from "react";
import { mergeClassName } from "@/utils/base";
import ModalScope from "@/Pages/ModalComp";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const Problem = () => {
  let [addProblemInfoOpen, setAddProblemInfoOpen] = useState(false);
  let [stop] = useStopPropagation();
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>();
  function addProblemCb(e) {
    stop(e, () => {
      moduleContent.current = EditorOrAddProblem;
      moduleTitle.current = "新增问题分类";
      setAddProblemInfoOpen(!addProblemInfoOpen);
    });
  }
  function lookCb(e, crt, index) {
    stop(e, () => {
      moduleContent.current = EditorOrAddProblem;
      moduleTitle.current = "查看问题分类";
      setAddProblemInfoOpen(!addProblemInfoOpen);
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
      <div
        className={mergeClassName(
          "bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]"
        )}
      >
        <TableProblem onLook={lookCb} />
      </div>
      <MoreBtn />
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
const ModalFooter = (props) => {
  return (
    <div className="flex justify-end py-[.28rem] pr-[.28rem] border-t border-t-[#e6e6e6]">
      {props.only ? (
        <>
          <Button type="primary" onClick={(e) => props?.onSubmit(e)}>
            确定
          </Button>
        </>
      ) : (
        <>
          <Button onClick={(e) => props?.onCancel(e)} className="mr-[.1rem]">
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </>
      )}
    </div>
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
