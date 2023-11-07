import { ConfigProvider, Table } from "antd";
import { ReactNode } from "react";
import zh_CN from "antd/es/locale/zh_CN";
type TableCompPropsType = {
  dataSource: Array<any>;
  columns: Array<any>;
  pagination?: false | {};
  children?: ReactNode;
  border?: boolean;
  themeObj?: Object;
  paginationThemeObj?: Object;
  components?:Object,
  virtual?:boolean,
  [key: string]: any;
};
const TableComp = (props: TableCompPropsType) => {
  console.log('props: ', props);
  let { dataSource, columns, pagination, border,components: comp,virtual } = props;
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: props?.themeObj ?? {},
          Pagination: props?.paginationThemeObj ?? {},
        },
      }}
      locale={zh_CN}
    >
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
  paginationThemeObj: {},
  components:{},
  virtual:true
};
export default TableComp;
