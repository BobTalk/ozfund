import Modal from "@/Pages/ModalComp";
import { ConfigProvider, Form, Input } from "antd";
import { useLayoutEffect, useRef, useState } from "react";
import SplitComp from "../common";
import { EditOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalFooter from "@/Components/ModalFooterBtn";
import { poolIdEnum } from "@/Enum";
import { getSession } from "@/utils/base";
import { GetAirDropAddressInterface } from "@/api";

const AddressAutoAirdrop = () => {
  let [listInfo, setListInfo] = useState([]);
  let [stop] = useStopPropagation();
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
  function updateAddrCb(values) {
    console.log("values: ", values);
  }
  async function EthereumChain() {
    let { data = [] } = await GetAirDropAddressInterface();
    setListInfo(() =>
      data.map((item, index) => ({
        id: index,
        title: poolIdEnum[item.pool],
        percentage: item.autoAddress || "暂无",
      }))
    );
  }
  useLayoutEffect(() => {
    EthereumChain();
  }, []);
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
                <ModalFooter onCancel={(e) => cancelCb(e)} />
              </FormItem>
            </Form>
          </Modal>
        </ConfigProvider>
      ) : null}
    </>
  );
};

export default AddressAutoAirdrop;
