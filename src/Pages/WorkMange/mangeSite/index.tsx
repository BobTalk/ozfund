import { manageTypeEnum } from "@/Enum";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useWallatInfo } from "@/Hooks/Web";
import ModalComp from "@/Pages/ModalComp";
import {
  AddManageInterface,
  AddSuperManageInterface,
  GetContractSystemInterface,
  RemoveManageInterface,
  RemoveSuperManageInterface,
} from "@/api";
import closeIcon from "@/assets/images/close.svg";
import plusIcon from "@/assets/images/plus.svg";
import { getSession } from "@/utils/base";
import { Button, Form, Input, message } from "antd";
import { useLayoutEffect, useRef, useState } from "react";
const MangeSite = () => {
  let [mangeOpen, setMangeOpen] = useState(false);
  let [isAddManage, setIsAddManage] = useState(false);
  let crtManageInfo = useRef<any>();
  let [addmanage, setAddmanage] = useState({
    address: "",
  });
  let [manageList, setmanageList] = useState([]);
  let [stop] = useStopPropagation();
  let { removeManageSytem, removeSuperManageSytem, addSuperManageSytem, addManageSytem } = useWallatInfo();
  function addManageResFormat(status, tipInfo) {
    message[status ? "success" : "error"](tipInfo);
    setMangeOpen(!mangeOpen);
  }
  // 删除
  async function submitDeleteManageCb() {
    let { address } = crtManageInfo.current;
    if (crtManageInfo.current.type === 2) {
      let res = await RemoveSuperManageInterface({
        address,
      });
      let { status, message: tipInfo } = res;
      if (status) {
        removeSuperManageSytem({
          accountAddress: getSession("ethAddress"),
          chainId: getSession("chainId"),
          manageName: address,
        }).then(res => {
          console.log('res: ', res);
        });
      }
      addManageResFormat(status, tipInfo);
    }
    if (crtManageInfo.current.type === 1) {
      let { status, message: tipInfo } = await RemoveManageInterface({
        address,
      });
      if (status) {
        removeManageSytem({
          accountAddress: getSession("ethAddress"),
          chainId: getSession("chainId"),
          manageName: address,
        }).then(res => {
          console.log('res: ', res);
        });
      }
      addManageResFormat(status, tipInfo);
    }
  }
  // 添加
  async function onFinish({ address }) {
    if (crtManageInfo.current.type === "superManage") {
      let res = await AddSuperManageInterface({
        address,
      });
      let { status, message: tipInfo } = res;
      if (status) {
        if (status) {
          addSuperManageSytem({
            accountAddress: getSession("ethAddress"),
            chainId: getSession("chainId"),
            manageName: address,
          }).then(res => {
            console.log('res: ', res);
          });
        }
      }
      addManageResFormat(status, tipInfo);
    }
    if (crtManageInfo.current.type === "manage") {
      let { status, message: tipInfo } = await AddManageInterface({ address });
      if (status) {
        addManageSytem({
          accountAddress: getSession("ethAddress"),
          chainId: getSession("chainId"),
          manageName: address,
        }).then(res => {
          console.log('res: ', res);
        });
      }
      addManageResFormat(status, tipInfo);
    }
  }
  function manageCb() {
    setMangeOpen(!mangeOpen);
  }
  function deleteCb(crt, crtIdx) {
    crtManageInfo.current = { ...crt, flag: "删除", index: crtIdx };
    setMangeOpen(!mangeOpen);
    setIsAddManage(false);
  }
  function addCb(crt, crtIdx) {
    crtManageInfo.current = { ...crt, flag: "编辑", index: crtIdx };
    setMangeOpen(!mangeOpen);
    setIsAddManage(true);
  }
  function operationCb(e, item, index) {
    stop(e, () => {
      (item.address ? deleteCb : addCb)(item, index);
    });
  }
  async function getManageList() {
    let { data = [] } = await GetContractSystemInterface();
    setmanageList(data);
  }
  useLayoutEffect(() => {
    getManageList();
  }, []);
  return (
    <>
      <ul className="h-full bg-[var(--white)] rounded-[var(--border-radius)] py-[var(--gap20)]">
        {manageList.map((item: any, index) => (
          <li
            key={item.address}
            className="grid items-center ml-[.4rem] py-[var(--gap20)] border-b border-b-[var(--border-color)] border-dashed pr-[var(--gap20)] grid-cols-[20%_1fr_max-content] gap-[var(--gap15)] text-[14px] text-[#333]"
          >
            <span>
              {manageTypeEnum[item.type]}
              {item.note}
            </span>
            <span>{item.address || "暂无"}</span>
            <span
              onClick={(e) => operationCb(e, item, index)}
              className="flex items-center cursor-pointer"
            >
              <img
                width={12}
                height={12}
                src={item.address ? closeIcon : plusIcon}
                alt=""
              />
              {item.address ? (
                <span className="ml-[.05rem]">删除</span>
              ) : (
                <span className="ml-[.05rem] text-[var(--blue)]">编辑</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <ModalComp
        title={`${crtManageInfo.current?.flag}${manageTypeEnum[crtManageInfo.current?.type]
          }${crtManageInfo.current?.note}`}
        showFooter={!isAddManage}
        footer={{
          paddingInline: ".28rem",
          paddingBlock: "var(--gap20)",
        }}
        modalOpen={mangeOpen}
        onCancel={manageCb}
        onOk={submitDeleteManageCb}
      >
        {isAddManage ? (
          <Form
            layout="vertical"
            className="clear_required"
            onFinish={onFinish}
            initialValues={addmanage}
          >
            <Form.Item
              label={
                <span className="text-[var(--border-color)]">
                  {crtManageInfo.current?.name}
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              className="px-[var(--gap30)] my-[var(--gap30)] "
              name="address"
            >
              <Input
                size="large"
                placeholder="请输入"
                defaultValue={addmanage.address}
              />
            </Form.Item>
            <Form.Item className="border-t border-t-[var(--border-color)]">
              <div className="flex justify-end py-[var(--gap20)] pr-[var(--gap20)]">
                <Button onClick={manageCb} className="mr-[.1rem]">
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
              </div>
            </Form.Item>
          </Form>
        ) : (
          <div className="m-[var(--gap30)] text-center text-[14px] text-[#333] grid place-items-center">
            <p className="leading-normal">
              确定移除{crtManageInfo.current?.name}
            </p>
            <p className="leading-normal">{crtManageInfo.current?.address}</p>
          </div>
        )}
      </ModalComp>
    </>
  );
};
export default MangeSite;
