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
  responsive?: Array<"xxl" | "xl" | "lg" | "md" | "sm" | "xs">;
  align?: "left" | "center" | "right";
  className?: string;
  ellipsis?: boolean;
  fixed?: boolean | string;
  render?: Function;
  onHeaderCell?: Function;
  onCell?: Function;
  width?: string | number;
  rowScope?: string | number;
}>;
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
  style?: Object;
  [key: string]: any;
};

const TableComp = (props: TableCompPropsType) => {
  let {
    dataSource,
    columns,
    pagination,
    border,
    components: comp,
    className,
    line = 10,
    style = {},
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
      <div
        style={style}
        className={mergeClassName(styleScope["table-reset_style"], className)}
      >
        <Table
          className="w-full"
          rowKey="dataIndex"
          components={comp}
          virtual={false}
          bordered={border}
          loading={false}
          scroll={{ y: 55 * line }}
          pagination={pagination}
          dataSource={dataSource}
          columns={columns}
          // {...props}
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
  virtual: false,
};
export default TableComp;
