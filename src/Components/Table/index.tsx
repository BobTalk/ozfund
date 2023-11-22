import { ConfigProvider, Table } from "antd";
import { ReactNode } from "react";
import zh_CN from "antd/es/locale/zh_CN";
import styleScope from "./table.module.less";
import type { ColumnsType as ColType } from "antd/es/table";
import { mergeClassName } from "@/utils/base";
export type ColumnsType = ColType<{
  title: string;
  key?: string;
  dataIndex: string;
  responsive?: Array<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'>;
  align?: "left" | "center" | "right";
  className?:string;
  ellipsis?:boolean;
  fixed?:boolean|string;
  render?:Function;
  onHeaderCell?:Function;
  onCell?:Function;
  width?:string | number;
  rowScope?:string | number;
}>
type TableCompPropsType = {
  dataSource: Array<any>;
  columns: ColumnsType;
  pagination?: false | {};
  children?: ReactNode;
  border?: boolean;
  themeObj?: Object;
  token?: Object;
  paginationThemeObj?: Object;
  components?: Object;
  virtual?: boolean;
  [key: string]: any;
};

const TableComp = (props: TableCompPropsType) => {
  let {
    dataSource,
    columns,
    pagination,
    border,
    components: comp,
    virtual,
    className
  } = props;
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: props?.themeObj ?? {},
          Pagination: props?.paginationThemeObj ?? {},
        },
        token: props?.token ?? {},
      }}
      locale={zh_CN}
    >
      <div className={mergeClassName(styleScope["table-reset_style"], className)}>
        <Table
          components={comp}
          virtual={virtual}
          bordered={border}
          scroll={{ y: 0 }}
          pagination={pagination}
          dataSource={dataSource}
          columns={columns}
          {...props}
        >
          {props.children}
        </Table>
      </div>
    </ConfigProvider>
  );
};
TableComp.defaultProps = {
  dataSource: [],
  columns: [],
  sticky: true,
  pagination: false,
  border: false,
  themeObj: {},
  token: {},
  paginationThemeObj: {},
  components: {},
  virtual: true,
};
export default TableComp;
