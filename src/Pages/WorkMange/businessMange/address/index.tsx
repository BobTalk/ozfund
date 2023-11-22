import Modal from "@/Components/Modal";
import { ConfigProvider, Input } from "antd";
import { useRef, useState } from "react";
import SplitComp from "../common";
import { EditOutlined } from "@ant-design/icons";

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
  let [editorAddrOpen, setEditorAddrOpen] = useState<boolean>(false);
  let crtInfo = useRef<any>();
  function editorCb(crt) {
    crtInfo.current = crt;
    setEditorAddrOpen(!editorAddrOpen);
  }
  return (
    <>
      <SplitComp
        onEditor={editorCb}
        className="p-[.3rem] bg-white h-full rounded-[var(--border-radius)] mt-[var(--mt15)]"
        list={listInfo}
        opertion={
          <>
            <EditOutlined />
            <span className=" ml-[.1rem] font-normal">编辑</span>
          </>
        }
      />
      {editorAddrOpen ? (
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 2,
            },
            components: {
              Input: { paddingBlockLG: 8 },
            },
          }}
        >
          <Modal
            onCancel={() => setEditorAddrOpen(!editorAddrOpen)}
            onOk={() => setEditorAddrOpen(!editorAddrOpen)}
            style={{
              footer: {
                marginTop: 0,
              },
            }}
            body={{
              paddingInline: ".3rem",
              paddingBlock: ".2rem .3rem",
            }}
            showFooter
            showTitleIcon
            title="修改空投地址"
            open={editorAddrOpen}
          >
            <p className="flex text-[14px] items-center justify-between pb-[.2rem] border-b border-b-[#e6e6e6]">
              <span className="text-[var(--border-color)]">
                {crtInfo.current.title}
              </span>
              <span className="text-[#333]">weeweesssssssssssssss</span>
            </p>
            <p className="mt-[.2rem] mb-[.1rem] text-[14px] text-[var(--border-color)]">
              输入新地址
            </p>
            <Input allowClear size="large" placeholder="请输入新地址" />
          </Modal>
        </ConfigProvider>
      ) : null}
    </>
  );
};

export default AddressAutoAirdrop;
