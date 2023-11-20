import { ModalTitle } from "@/Components/Modal";
import SplitComp from "../common";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
const DrawsContractMoney = () => {
  let [listInfo] = useState([
    {
      id: "1",
      title: "OZC",
    },
    {
      id: "2",
      title: "TOTO",
    },
    {
      id: "3",
      title: "质押",
    },
  ]);
  function editorCb(crt) {
    console.log("crt: ", crt);
  }
  return (
    <div className="h-full overflow-y-auto bg-white rounded-[var(--border-radius)] mt-[.15rem]">
      <TitleComp title="提取合约中代币" />
      <SplitComp
        listClassName="grid-cols-[.4rem_1fr] gap-[1em]"
        onEditor={editorCb}
        className="px-[.3rem] pt-[.2rem]"
        list={listInfo}
        opertion={
          <>
            <EditOutlined />
            <span className=" ml-[.1rem] font-normal">提取</span>
          </>
        }
      />
      <TitleComp title="OZC" />
    </div>
  );
};
const TitleComp = ({ title }) => {
  return (
    <ModalTitle
      showTitleIcon
      title={title}
      classTitleName="py-[.2rem] ml-[.3rem]  border-b border-b-[#e6e6e6] text-[16px] text-[#333]"
      classIconName="w-[.03rem] h-[.13rem]"
    />
  );
};
export default DrawsContractMoney;
