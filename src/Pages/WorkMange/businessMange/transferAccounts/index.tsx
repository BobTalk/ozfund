import { EditOutlined, FileAddOutlined, PlusOutlined } from "@ant-design/icons";
import SplitComp from "../common";
import { useLayoutEffect, useRef, useState } from "react";
import { ModalTitle } from "@/Components/Modal";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import Icon from "@/Components/Icon";
import { poolIdEnum } from "@/Enum";
import { GetAirDropAddressInterface, TransferAccountsInterface } from "@/api";
import { mergeClassName } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { cloneDeep } from "lodash";

const BatchTransferAccounts = () => {
  let [listInfo, setListInfo] = useState([]);
  let poolIdNum = useRef<number>();
  let [form] = Form.useForm<any>();
  let [stop] = useStopPropagation();
  let [batchTransferAccountsList, setBatchTransferAccountsList] = useState<any>(
    []
  );
  function initiateCb(crt) {
    console.log("crt: ", crt);
    poolIdNum.current = crt.type;
    setBatchTransferAccountsList([
      { address_0: "", amount_0: undefined, site: 0 },
    ]);
  }
  function addAmountCb(e, len) {
    stop(e, () => {
      if (!len) return;
      setBatchTransferAccountsList((list) => {
        return list.concat({
          site: len,
          [`address_${len}`]: "",
          [`amount_${len}`]: undefined,
        });
      });
    });
  }
  function deleteAcount(e, index) {
    stop(e, () => {
      let cloneList = cloneDeep(batchTransferAccountsList);
      cloneList.splice(index, 1);
      setBatchTransferAccountsList(cloneList);
    });
  }
  async function submitBatchAmount(values) {
    let allKey = Object.keys(values);
    let transferInfo = allKey.reduce((prv, next) => {
      let [name, index] = next.split("_");
      prv[index] = {
        ...prv[index],
        [name]: values[next],
      };
      return prv;
    }, []);
    let { status, message: tipInof } = await TransferAccountsInterface({
      poolId: poolIdNum.current,
      transferInfo,
    });
    message[status ? "success" : "error"](tipInof);
    if (status) {
      resultTransferAccounts();
    }
  }
  function resultTransferAccounts() {
    form.resetFields();
    setBatchTransferAccountsList([]);
  }
  async function EthereumChain() {
    let { data = [] } = await GetAirDropAddressInterface();
    setListInfo(() =>
      data.map((item, index) => ({
        id: index,
        title: poolIdEnum[item.pool],
        type: item.pool,
        percentage: item.autoAddress || "暂无",
      }))
    );
  }
  useLayoutEffect(() => {
    console.log("batchTransferAccountsList", batchTransferAccountsList);
  }, [batchTransferAccountsList]);
  useLayoutEffect(() => {
    EthereumChain();
  }, []);
  return (
    <div className="h-full overflow-y-auto bg-white rounded-[var(--border-radius)] mt-[var(--gap15)]">
      <TitleComp title="TOTO矿池资产批量转账" />
      <SplitComp
        onEditor={initiateCb}
        className="px-[var(--gap30)] pt-[var(--gap20)]"
        list={listInfo}
        opertion={
          <>
            <Icon name="h-icon-initiate" />
            <span className=" ml-[.1rem] font-normal">发起</span>
          </>
        }
      />
      <TitleComp
        className="pb-[var(--gap15)]"
        title={
          <div className="flex flex-1 items-center justify-between pr-[var(--gap30)]">
            <span>Ozfund投注挖矿</span>
            <ConfigProvider
              theme={{
                token: {
                  colorTextLightSolid: "#0385f3",
                  colorPrimaryHover: "#e6f2fd",
                  colorPrimaryActive: "#e6f2fd",
                  colorLinkActive: "#0385f3",
                },
              }}
            >
              <Button
                onClick={(e) =>
                  addAmountCb(e, batchTransferAccountsList.length)
                }
                className="bg-[#e6f2fd] text-[#0385f3]"
                type="primary"
                icon={<PlusOutlined />}
              >
                添加
              </Button>
            </ConfigProvider>
          </div>
        }
      />
      <ConfigProvider
        theme={{
          components: {
            Input: {
              paddingBlock: 6,
              controlHeight: 35,
            },
            InputNumber: {
              paddingBlock: 6,
              controlHeight: 35,
            },
          },
          token: {
            controlHeight: 35,
            borderRadius: 2,
          },
        }}
      >
        <ul className="mt-[var(--gap20)] px-[var(--gap30)] pb-[var(--gap30)]">
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  itemMarginBottom: 15,
                },
              },
            }}
          >
            <Form
              form={form}
              onFinish={submitBatchAmount}
              className="clear_required"
            >
              {batchTransferAccountsList.map((item) => (
                <li className="flex gap-x-[var(--gap20)] not-first-of-type:mt-[var(--gap15)]">
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                    name={`address_${item.site}`}
                    className="flex-1"
                  >
                    <Input
                      className="w-full"
                      defaultValue={item[`address_${item.site}`]}
                      placeholder="输入地址"
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                    name={`amount_${item.site}`}
                    className="flex-1"
                  >
                    <InputNumber
                      className="w-full"
                      defaultValue={item[`amount_${item.site}`]}
                      placeholder="输入数量"
                    />
                  </Form.Item>
                  <div
                    onClick={(e) => deleteAcount(e, item.site)}
                    className="grid cursor-pointer place-items-center w-[.4rem] h-[.36rem] rounded-[.02rem] bg-[var(--border-color)] opacity-20"
                  >
                    <Icon
                      style={{
                        cursor: "pointer",
                        fontSize: ".24rem",
                        color: "#333",
                      }}
                      name="h-icon-close"
                    />
                  </div>
                </li>
              ))}

              {batchTransferAccountsList.length ? (
                <Form.Item>
                  <li className="flex justify-end mt-[var(--gap20)] gap-[.1rem]">
                    <Button
                      onClick={resultTransferAccounts}
                      className="w-[1rem] text-[#999]"
                    >
                      取消
                    </Button>
                    <Button
                      className="w-[1rem]"
                      type="primary"
                      htmlType="submit"
                    >
                      发起转账
                    </Button>
                  </li>
                </Form.Item>
              ) : null}
            </Form>
          </ConfigProvider>
        </ul>
      </ConfigProvider>
    </div>
  );
};
const TitleComp = ({ title, className = "" }) => {
  return (
    <ModalTitle
      showTitleIcon
      title={title}
      classTitleName={mergeClassName(
        "py-[var(--gap20)] ml-[var(--gap30)]  border-b border-b-[#e6e6e6] text-[16px] text-[#333]",
        className
      )}
      classIconName="w-[.03rem] h-[.13rem]"
    />
  );
};
export default BatchTransferAccounts;
