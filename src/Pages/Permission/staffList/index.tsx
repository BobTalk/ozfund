import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import Table from "./table";
import ModalScope from "@/Pages/ModalComp";
import MoreBtn from "@/Components/MoreBtn";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { forwardRef, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ModalFooter from "@/Components/ModalFooterBtn";
const StaffList = () => {
  let urlPrev = "/ozfund/permission/staff-list/staff-detail";
  let navigate = useNavigate();
  let { pathname } = useLocation();
  function lookCb(crt) {
    navigate(urlPrev, { state: crt });
  }
  return [
    urlPrev,
    `${urlPrev}/staff-info`,
    `${urlPrev}/rights-adjust`,
    `${urlPrev}/account`,
  ].includes(pathname) ? (
    <Outlet />
  ) : (
    <>
      <FilterComp />
      <TableComp onLook={lookCb} />
    </>
  );
};
const FilterComp = () => {
  let [stop] = useStopPropagation();
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>();
  let [filterInfo] = useState({
    staffId: "",
    stateAcount: "",
  });
  let [modalOpen, setModalOpen] = useState(false);

  function submitCb(values) {
    moduleContent.current = AddStaffInfo;
    moduleTitle.current = "开设员工";
    setModalOpen(!modalOpen);
  }
  function addStaffInfoCb(e) {
    stop(e, () => {
      moduleContent.current = AddStaffInfo;
      moduleTitle.current = "开设员工";
      setModalOpen(!modalOpen);
    });
  }
  function filterSubmitCb(values) {
    console.log("筛选条件: ", values);
  }
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 0,
            },
          },
          token: {
            borderRadius: 2,
            controlHeight: 35,
          },
        }}
      >
        <div className="flex items-center justify-between p-[var(--gap20)] bg-white rounded-[var(--border-radius)]">
          <Form
            colon={false}
            onFinish={filterSubmitCb}
            initialValues={filterInfo}
            className="flex items-center gap-x-[var(--gap10)]"
          >
            <Form.Item name="staffId" className="mr-[var(--gap10)]">
              <Input
                allowClear
                className="w-[2.8rem]"
                placeholder="搜索员工ID"
              />
            </Form.Item>
            <Form.Item name="stateAcount" label="账户状态">
              <Select
                allowClear
                className="!w-[1.63rem]"
                placeholder="请选择"
                options={[]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
          <Button
            type="primary"
            onClick={addStaffInfoCb}
            icon={<PlusOutlined />}
          >
            新增员工
          </Button>
        </div>
      </ConfigProvider>
      {/* 信息收集 */}
      <ModalComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={modalOpen}
        onCancel={() => setModalOpen(!modalOpen)}
        onOk={(values) => submitCb(values)}
      />
    </>
  );
};

const AddStaffInfo = (props) => {
  let [stop] = useStopPropagation();
  let [form] = Form.useForm();
  let countryCode = useRef(86);
  let [collectStaffInfo] = useState({
    staffId: "",
    email: "",
    mobile: "",
    note: "",
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
  function countryCodeCb(val) {
    countryCode.current = val;
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
        initialValues={collectStaffInfo}
        form={form}
      >
        <Form.Item
          className="mb-[var(--gap15)] mx-[var(--gap30)] mt-[var(--gap20)]"
          label={<span className="text-[var(--border-color)]">员工ID</span>}
          name="staffId"
        >
          <Input size="large" placeholder="" />
        </Form.Item>
        <Form.Item
          className="mb-[var(--gap20)] mx-[var(--gap30)]"
          label={<span className="text-[var(--border-color)]">邮箱</span>}
          name="email"
        >
          <Input size="large" className="w-full" placeholder="" />
        </Form.Item>
        <Form.Item
          className="mb-[var(--gap20)] mx-[var(--gap30)]"
          label={<span className="text-[var(--border-color)]">联系方式</span>}
          name="mobile"
        >
          <Input
            size="large"
            addonBefore={<AddonBeforePhone onCountryCodeCb={countryCodeCb} />}
            placeholder="请输入联系方式"
          />
        </Form.Item>
        <Form.Item
          className="mb-[var(--gap20)] mx-[var(--gap30)]"
          label={<span className="text-[var(--border-color)]">备注</span>}
          name="note"
        >
          <TextArea
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
        </Form.Item>
        <Form.Item className="mb-0">
          <ModalFooter onCancel={(e) => cancelCb(e)} />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
const AddonBeforePhone = (props) => {
  function selectChangeCb(val) {
    props?.onCountryCodeCb?.(val);
  }
  return (
    <div className="flex items-center">
      <PlusOutlined className="text-[14px] text-[#333]" />
      <Select
        className="text-[14px] text-[#333]"
        size="large"
        defaultValue="86"
        onChange={selectChangeCb}
        options={[{ value: "86", label: "86" }]}
      />
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
const TableComp = (props) => {
  function lookCb(crt) {
    props?.onLook?.(crt);
  }
  return (
    <>
      <div className="pb-[.25rem] bg-white rounded-[var(--border-radius)] mt-[var(--gap15)]">
        <Table onLook={lookCb} />
      </div>
      <MoreBtn />
    </>
  );
};
export default StaffList;
