import DividerComp from "@/Components/Divider";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

const AddressAutoAirdrop = () => {
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
  function editorCb(crt) {
    console.log("crt: ", crt);
  }
  return (
    <ul className="p-[.3rem] bg-white h-full rounded-[var(--border-radius)] mt-[.15rem]">
      {listInfo.map((item) => (
        <li
          className="grid grid-cols-[2rem_1fr] gap-[.3rem] items-center"
          key={item.id}
        >
          <span className="whitespace-nowrap text-[14px] text-[#333]">
            {item.title}：
          </span>
          <DividerComp
            dashed
            left={
              <span className="text-[14px] text-[#666]">
                {item.percentage}%
              </span>
            }
            right={<RightModuleNode onEditor={() => editorCb(item)} />}
          />
        </li>
      ))}
    </ul>
  );
};
const RightModuleNode = (props) => {
  let [stop] = useStopPropagation();
  function editorCb(e) {
    stop(e, () => {
      props?.onEditor?.();
    });
  }
  return (
    <div onClick={editorCb} className="text-[var(--blue)] cursor-pointer">
      <EditOutlined />
      <span className=" ml-[.1rem]">编辑</span>
    </div>
  );
};
export default AddressAutoAirdrop;
