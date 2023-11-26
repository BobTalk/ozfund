import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import Table from "./table";
import MoreBtn from "@/Components/MoreBtn";
const StaffList = () => {
  return (
    <>
      <FilterComp />
      <TableComp />
    </>
  );
};
const FilterComp = () => {
  return (
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
        <Form colon={false} className="flex items-center gap-x-[var(--gap10)]">
          <Form.Item className="mr-[var(--gap10)]">
            <Input className="w-[2.8rem]" placeholder="搜索员工ID" />
          </Form.Item>
          <Form.Item label="账户状态">
            <Select className="!w-[1.63rem]" placeholder="请选择" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">查询</Button>
          </Form.Item>
        </Form>
        <Button type="primary" icon={<PlusOutlined />}>
          新增员工
        </Button>
      </div>
    </ConfigProvider>
  );
};
const TableComp = () => {
  return (
    <>
      <div className="pb-[.25rem] bg-white rounded-[var(--border-radius)] mt-[var(--gap15)]">
        <Table />
      </div>
      <MoreBtn />
    </>
  );
};
export default StaffList;
