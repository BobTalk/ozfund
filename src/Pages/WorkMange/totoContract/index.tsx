import { ModalTitle } from "@/Components/Modal";
import { EditFilled, EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import { forwardRef, useEffect, useRef, useState } from "react";

const TodoContract = () => {
  let headerRefs = useRef<any>();
  let [headerHeight, setHeaderHeight] = useState<number>();
  useEffect(() => {
    let { height } = headerRefs.current.getBoundingClientRect();
    setHeaderHeight(height);
  }, []);
  return (
    <>
      <HeaderModule ref={headerRefs} />
      <Contentmodule headerH={headerHeight} />
    </>
  );
};
const HeaderModule = forwardRef((props, ref: any) => {
  let [moduleList] = useState([
    {
      id: 1,
      title: "开启/关闭TOTO出售",
      operateNode: <Switch defaultChecked />,
    },
    {
      id: 2,
      title: "设置TOTO发行总量",
      label: "当前发行总量",
      value: 10000,
      operateNode: (
        <Button icon={<SettingOutlined />} type="primary">
          设置
        </Button>
      ),
    },
    {
      id: 3,
      title: "增发TOTO",
      operateNode: (
        <Button icon={<EditOutlined />} type="primary">
          增发
        </Button>
      ),
    },
    {
      id: 4,
      title: "更改TOTO调度地址",
      label: "当前调度地址",
      value: "dkjahiuhf35hahd8",
      operateNode: (
        <Button icon={<EditOutlined />} type="primary">
          修改
        </Button>
      ),
    },
  ]);
  function liStyleFn(idx) {
    let strClassName =
      "w-[3.02rem] h-[1.4rem] bg-[var(--gray1)] rounded-[var(--border-radius)] pb-[.2rem] px-[.3rem]";
    if (idx % 2 == 0) {
      strClassName += " pt-[.3rem]";
    } else {
      strClassName += " pt-[.23rem] flex flex-col justify-between";
    }
    return strClassName;
  }
  return (
    <ul
      ref={ref}
      className="flex items-center gap-x-[.2rem] bg-white p-[.2rem] rounded-[var(--border-radius)]"
    >
      {moduleList.map((item, index) => (
        <li key={item.id} className={liStyleFn(index)}>
          <p className="text-[#333] text-[16px]">{item.title}</p>
          {item.label ? (
            <p className="text-[#666] text-[14px] mt-[.12rem]">
              <span>{item.label}：</span>
              <span>{item.value}</span>
            </p>
          ) : null}
          <div className={item.label ? "pt-[.1rem]" : "pt-[.2rem]"}>
            {item.operateNode}
          </div>
        </li>
      ))}
    </ul>
  );
});
const Contentmodule = (props) => {
  let [listInfo] = useState([
    {
      id: "1",
      title: "长期支持者占比",
      percentage: 15,
    },
    {
      id: "2",
      title: "OZ基金会占比",
      percentage: 30,
    },
    {
      id: "3",
      title: "OZ团队成员占比",
      percentage: 20,
    },
    {
      id: "4",
      title: "流动性占比",
      percentage: 5,
    },
    {
      id: "5",
      title: "用户OZC投注主矿池挖矿",
      percentage: 20,
    },
    {
      id: "6",
      title: "VIP用户OZC投注VIP矿池挖矿",
      percentage: 10,
    },
  ]);
  return (
    <div
      style={{
        height: `calc(100% - ${props.headerH}px - .15rem)`,
      }}
      className="bg-white mt-[.15rem] rounded-[var(--border-radius)]"
    >
      <TitleComp
        title={
          <div className="flex flex-1 items-center justify-between pr-[.2rem]">
            <span>提取合约中代币</span>
            <Button
              className="bg-[#e6f2fd] text-[var(--blue)] hover:text-[#FFF]"
              type="primary"
              icon={<EditFilled />}
            >
              编辑
            </Button>
          </div>
        }
      />
      <ul className="mt-[.2rem] px-[.3rem] pb-[.3rem]">
        {listInfo.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-[1.99rem_1fr] gap-x-[.3rem] not-first-of-type:mt-[.24rem] text-[14px]"
          >
            <span className="text-[#333]">{item.title}：</span>
            <span className="text-[#666]">{item.percentage ?? "--"}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
const TitleComp = ({ title }) => {
  return (
    <>
      <ModalTitle
        showTitleIcon
        title={title}
        classTitleName="py-[.25rem] ml-[.3rem]  border-b border-b-[#e6e6e6] text-[16px] text-[#333]"
        classIconName="w-[.03rem] h-[.13rem]"
      />
    </>
  );
};
export default TodoContract;
