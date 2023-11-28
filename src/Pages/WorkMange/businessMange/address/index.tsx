import Modal from "@/Pages/ModalComp";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useRef, useState } from "react";
import SplitComp from "../common";
import { EditOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalFooter from "@/Components/ModalFooterBtn";

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
  let [stop] =  useStopPropagation()
  let [editorAddrOpen, setEditorAddrOpen] = useState<boolean>(false);
  let crtInfo = useRef<any>();
  let [formInitVal, setFormInitVal] = useState({
    newAddress: "",
  });
  function editorCb(crt) {
    crtInfo.current = crt;
    setEditorAddrOpen(!editorAddrOpen);
  }
  function cancelCb(e) {
     stop(e, () => {
      setEditorAddrOpen(!editorAddrOpen);
     });
   }
   function updateAddrCb(values){
    console.log('values: ', values);
   }
  return (
    <>
      <SplitComp
        onEditor={editorCb}
        className="p-[var(--gap30)] bg-white h-full rounded-[var(--border-radius)] mt-[var(--gap15)]"
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
              Form: {
                itemMarginBottom: 30,
              },
              Input: {
                paddingBlock: 8,
                controlHeight: 42,
              },
            },
          }}
        >
          <Modal
            onCancel={() => setEditorAddrOpen(!editorAddrOpen)}
            style={{
              footer: {
                marginTop: 0,
              },
            }}
            body={{
              paddingInline: 0,
              paddingBlock: 0,
            }}
            showFooter={false}
            showTitleIcon
            title="修改空投地址"
            modalOpen={editorAddrOpen}
          >
            <p className="flex mx-[var(--gap30)] mt-[var(--gap20)] text-[14px] items-center justify-between pb-[var(--gap20)] border-b border-b-[#e6e6e6]">
              <span className="text-[var(--border-color)]">
                {crtInfo.current.title}
              </span>
              <span className="text-[#333]">weeweesssssssssssssss</span>
            </p>
            <Form
              colon={false}
              onFinish={updateAddrCb}
              initialValues={formInitVal}
              layout="vertical"
              className=" mt-[var(--gap20)]"
            >
              <FormItem
                name="newAddress"
                className="px-[var(--gap30)]"
                label={
                  <p className="text-[14px] text-[var(--border-color)]">
                    输入新地址
                  </p>
                }
              >
                <Input allowClear placeholder="请输入新地址" />
              </FormItem>
              <FormItem>
                <ModalFooter onCancel={(e) => cancelCb(e)}/>
              </FormItem>
            </Form>
          </Modal>
        </ConfigProvider>
      ) : null}
    </>
  );
};

export default AddressAutoAirdrop;
