import type { ColumnsType } from "@/Components/Table";
import { useLayoutEffect, useRef, useState } from "react";
import PageTableScope from "@/Pages/Components/Table";
import { GetProductionRatioInterface, GetTotoDistributeStatisticalInterface } from "@/api";
const TableAllocation = (props) => {
  const [columns, setColumns] = useState<ColumnsType>([]);
  const [dataList, setDataList] = useState<any>([
    {
      key: 1,
      frezzTime: new Date(),
      address: "djahoaic4234kahdiuahdajag",
      num: 439487,
      notes: "Ozfund投注挖矿：sifjsidijjisd-Ozfund投注挖矿：Aioeowie",
      staffId: "xiaowu",
    },
  ]);
  let pagitions = useRef<any>({
    pageNo: 1,
    pageSize: 10,
  });
  async function allocationRatio(){
  let {data=[]} = await GetProductionRatioInterface({})
    setColumns([
      {
        title: "日期",
        dataIndex: "frezzTime",
        render: (_, record, index) => index + 1,
      },
      {
        title: "链上时间(天）",
        dataIndex: "address",
      },
      {
        title: "新增(TOTO)",
        dataIndex: "num",
      },
      {
        title: `基金会(${poolIdToVal(3, data)}%)`,
        dataIndex: "num",
      },
      {
        title: `Oz团队(${poolIdToVal(1, data)}%)`,
        dataIndex: "num",
      },
      {
        title: `长期支持者(${poolIdToVal(2, data)}%)`,
        dataIndex: "num",
      },
      {
        title: `OZC质押(${poolIdToVal(4, data)}%)`,
        dataIndex: "num",
      },
      {
        title: `Ozfund挖矿(${poolIdToVal(5, data)}%)`,
        dataIndex: "num",
      },
      {
        title: `Ozfund VIP挖矿(${poolIdToVal(6, data)}%)`,
        dataIndex: "num",
      },
    ])
  }
  function poolIdToVal(id, list=[]){
    return list.find(item => item['pool'] == id).proportion
  }
  async function getPageInfo(){
    let {data} = await GetTotoDistributeStatisticalInterface({
      pageSize:10,
      pageNo:1
    })
    console.log('data: ', data);
   }
  const isShowMoreBtn = () =>
    pagitions.current.pageNo < pagitions.current.pageTotal;

  function moreCb(): void {}
useLayoutEffect(()=>{
  allocationRatio(),
  getPageInfo()
},[])
  return (
    <PageTableScope
      pagitions={pagitions.current}
      style={props.style}
      className="_reset-table__no-btn"
      isShowMoreBtn={isShowMoreBtn()}
      dataList={dataList}
      columns={columns}
      moreLoad={moreCb}
    />
  );
};

export default TableAllocation;
