import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalComp from "@/Pages/ModalComp";
import closeIcon from "@/assets/images/close.svg";
import plusIcon from "@/assets/images/plus.svg";
import { Button, Form, Input } from "antd";
import { useRef, useState } from "react";
const MangeSite = () => {
  let [mangeOpen, setMangeOpen] = useState(false);
  let [isAddManage, setIsAddManage] = useState(false);
  let crtManageInfo = useRef<any>();
  let [addmanage, setAddmanage] = useState({
    name: "",
  });
  let [manageList, setmanageList] = useState([
    {
      id: 1,
      name: "超级管理员A",
      address: "",
    },
    {
      id: 2,
      name: "超级管理员B",
      address: "",
    },
    {
      id: 3,
      name: "管理员A",
      address: "",
    },
    {
      id: 4,
      name: "管理员B",
      address: "",
    },
    {
      id: 5,
      name: "管理员C",
      address: "",
    },
  ]);
  let [stop] = useStopPropagation();
  function onFinish() {}
  function manageCb() {
    setMangeOpen(!mangeOpen);
  }
  function deleteCb(crt, crtIdx) {
    crtManageInfo.current = { ...crt, flag: "删除", index: crtIdx };
    setMangeOpen(!mangeOpen);
    setIsAddManage(false);
  }
  function addCb(crt, crtIdx) {
    crtManageInfo.current = { ...crt, flag: "添加", index: crtIdx };
    setMangeOpen(!mangeOpen);
    setIsAddManage(true);
  }
  function operationCb(e, item, index) {
    stop(e, () => {
      (item.address ? deleteCb : addCb)(item, index);
    });
  }
  return (
    <>
      <ul className="h-full bg-[var(--white)] rounded-[var(--border-radius)] py-[var(--gap20)]">
        {manageList.map((item, index) => (
          <li
            key={item.id}
            className="grid items-center ml-[.4rem] py-[var(--gap20)] border-b border-b-[var(--border-color)] border-dashed pr-[var(--gap20)] grid-cols-[20%_1fr_max-content] gap-[var(--gap15)] text-[14px] text-[#333]"
          >
            <span>{item.name}</span>
            <span>{item.address || "暂无"}</span>
            <span
              onClick={(e) => operationCb(e, item, index)}
              className="flex items-center cursor-pointer"
            >
              <img
                width={15}
                height={15}
                src={item.address ? closeIcon : plusIcon}
                alt=""
              />
              {item.address ? (
                <span className="ml-[.1rem]">删除</span>
              ) : (
                <span className="ml-[.1rem] text-[var(--blue)]">添加</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <ModalComp
        title={`${crtManageInfo.current?.flag}${crtManageInfo.current?.name}`}
        showFooter={!isAddManage}
        footer={{
          paddingInline: ".28rem",
          paddingBlock: "var(--gap20)",
        }}
        modalOpen={mangeOpen}
        onOk={manageCb}
        onCancel={manageCb}
      >
        {isAddManage ? (
          <Form layout="vertical" onFinish={onFinish} initialValues={addmanage}>
            <Form.Item
              label={
                <span className="text-[var(--border-color)]">{crtManageInfo.current?.name}</span>
              }
              className="px-[var(--gap30)] my-[var(--gap30)] "
              name="name"
            >
              <Input
                size="large"
                placeholder="请输入"
                defaultValue={addmanage.name}
              />
            </Form.Item>
            <Form.Item className="border-t border-t-[var(--border-color)]">
              <div className="flex justify-end py-[var(--gap20)] pr-[var(--gap20)]">
                <Button onClick={manageCb} className="mr-[.1rem]">
                  取消
                </Button>
                <Button onClick={manageCb} type="primary" htmlType="submit">
                  确定
                </Button>
              </div>
            </Form.Item>
          </Form>
        ) : (
          <div className="m-[var(--gap30)] text-center text-[14px] text-[#333] grid place-items-center">
            <p className="leading-normal">确定移除管理员A</p>
            <p className="leading-normal">owrijwfnwm0isd992rsd</p>
          </div>
        )}
      </ModalComp>
    </>
  );
};
export default MangeSite;
