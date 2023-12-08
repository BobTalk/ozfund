import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select, message } from "antd";
import Table from "./table";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TextArea from "antd/es/input/TextArea";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ModalFooter from "@/Components/ModalFooterBtn";
import ModalScopeComp from "@/Pages/ModalScope";
import { AddStaffInterface } from "@/api";
import { userAcountStateEnum } from "@/Enum";
import { breadSite, formatEnum, getSession } from "@/utils/base";
import store from "@/store";
const StaffList = () => {
  let urlPrev = "/ozfund/permission/staff-list/staff-detail";
  let childrenUrl = [
    `${urlPrev}/staff-info`,
    `${urlPrev}/rights-adjust`,
    `${urlPrev}/account`,
  ];

  let navigate = useNavigate();
  let tableRefs = useRef<any>();
  let { pathname } = useLocation();
  let [childrenRouter, setChildrenRouter] = useState<any>();
  let topModuleRefs = useRef<any>();
  let [filterModuleHeight, setFilterModuleHeight] = useState<number>(0);
  function findChildRouterPermiss() {
    let activePath: Array<string> = getSession("activePath");
    let findRouter = childrenUrl.find((item) => {
      return activePath.includes(item);
    });
    setChildrenRouter(findRouter);
  }
  function lookCb(crt) {
    !!childrenRouter && navigate(childrenRouter, { state: crt });
    store.dispatch({
      type: "ADD_BREADCRUMB",
      data: breadSite(childrenRouter),
    });
  }
  function updateListCb() {
    tableRefs.current.updateList({});
  }
  function filterCb({ staffId, stateAcount }) {
    tableRefs.current.updateList(
      {
        search: staffId || null,
        state: stateAcount || null,
      },
      true
    );
  }
  useEffect(() => {
    let { height } = topModuleRefs.current.getFilterHeight();
    setFilterModuleHeight(height);
  }, []);
  useEffect(() => {
    findChildRouterPermiss();
  }, []);
  return [urlPrev, ...childrenUrl].includes(pathname) ? (
    <Outlet />
  ) : (
    <>
      <FilterComp
        ref={topModuleRefs}
        onUpdate={updateListCb}
        onFilter={filterCb}
      />
      <Table
        onLook={lookCb}
        ref={tableRefs}
        style={{
          height: `calc(100% - ${filterModuleHeight}px - .15rem)`,
        }}
        childrenPermison={childrenRouter}
      />
    </>
  );
};
const FilterComp = forwardRef((props: any, ref) => {
  let [stop] = useStopPropagation();
  let filterHeight = useRef<any>(0);
  let moduleContent = useRef<any>();
  let moduleTitle = useRef<any>();
  let [filterInfo] = useState({
    staffId: undefined,
    stateAcount: undefined,
  });
  let [modalOpen, setModalOpen] = useState(false);

  async function submitCb({ staffId, email, mobile, note, countryCode }) {
    let { status, message: tipInfo } = await AddStaffInterface({
      adminId: staffId,
      email,
      mobile: `${countryCode} ${mobile}`,
      note,
    });
    if (status) {
      message.success(tipInfo);
      props?.onUpdate?.();
      setModalOpen(!modalOpen);
    } else {
      message.error(tipInfo);
    }
  }
  function addStaffInfoCb(e) {
    stop(e, () => {
      moduleContent.current = AddStaffInfo;
      moduleTitle.current = "开设员工";
      setModalOpen(!modalOpen);
    });
  }
  function filterSubmitCb(values) {
    props?.onFilter?.(values);
  }
  function getFilterHeight() {
    return filterHeight?.current.getBoundingClientRect();
  }
  useImperativeHandle(
    ref,
    () => ({
      getFilterHeight,
    }),
    []
  );
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
        <div
          ref={filterHeight}
          className="flex items-center justify-between p-[var(--gap20)] bg-white rounded-[var(--border-radius)]"
        >
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
                placeholder="请选择"
                className="!w-[1.63rem]"
                options={formatEnum(userAcountStateEnum)}
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
      <ModalScopeComp
        content={moduleContent.current}
        title={moduleTitle.current}
        modalOpen={modalOpen}
        onCancel={() => setModalOpen(!modalOpen)}
        onOk={(values) => submitCb(values)}
      />
    </>
  );
});

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
    props?.onOk({ ...values, countryCode: countryCode.current });
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
          controlHeight: 42,
        },
      }}
    >
      <Form
        layout="vertical"
        onFinish={submitCb}
        className="clear_required"
        initialValues={collectStaffInfo}
        form={form}
      >
        <Form.Item
          className="mb-[var(--gap15)] mx-[var(--gap30)] mt-[var(--gap20)]"
          label={<span className="text-[var(--border-color)]">员工ID</span>}
          name="staffId"
          rules={[{ required: true, message: "输入员工ID" }]}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "输入邮箱" }]}
          className="mb-[var(--gap20)] mx-[var(--gap30)]"
          label={<span className="text-[var(--border-color)]">邮箱</span>}
          name="email"
        >
          <Input className="w-full" placeholder="" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "输入联系方式" }]}
          className="mb-[var(--gap20)] mx-[var(--gap30)]"
          label={<span className="text-[var(--border-color)]">联系方式</span>}
          name="mobile"
        >
          <Input
            addonBefore={<AddonBeforePhone onCountryCodeCb={countryCodeCb} />}
            placeholder="请输入联系方式"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "输入备注" }]}
          className="mb-[var(--gap20)] mx-[var(--gap30)]"
          label={<span className="text-[var(--border-color)]">备注</span>}
          name="note"
        >
          <TextArea
            autoSize={{
              minRows: 4,
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
        placeholder="请选择"
        defaultValue="86"
        onChange={selectChangeCb}
        options={[{ value: "86", label: "86" }]}
      />
    </div>
  );
};
export default StaffList;
