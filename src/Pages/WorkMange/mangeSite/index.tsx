import { useStopPropagation } from "@/Hooks/StopPropagation";
import ModalComp from "@/Pages/ModalComp";
import closeIcon from "@/assets/images/close.svg";
import plusIcon from "@/assets/images/plus.svg";
import { Button, Form, Input } from "antd";
import { useState } from "react";
const MangeSite = () => {
  let [mangeOpen, setMangeOpen] = useState(false);
  let [isAddManage, setIsAddManage] = useState(false);
  let [addmanage, setAddmanage] = useState({
    name: "",
  });
  let [stop] = useStopPropagation();
  function onFinish() {}
  function manageCb() {
    setMangeOpen(!mangeOpen);
  }
  function deleteCb(e) {
    stop(e, manageCb);
    setIsAddManage(false);
  }
  function addCb(e) {
    stop(e, manageCb);
    setIsAddManage(true);
  }
  return (
    <>
      <ul className="h-full bg-[var(--white)] rounded-[var(--border-radius)] py-[.2rem]">
        <li className="grid items-center ml-[.4rem] py-[.2rem] border-b border-b-[var(--border-color)] border-dashed pr-[.2rem] grid-cols-[20%_1fr_max-content] gap-[.15rem] text-[14px] text-[#333]">
          <span>Bob.Li -超级管理员A</span>
          <span>bdjkhafheuiwfhkhiureofufherhiuehfi23fcdushod</span>
          <span onClick={deleteCb} className="flex items-center cursor-pointer">
            <img width={15} height={15} src={closeIcon} alt="关闭" />
            <span className="ml-[.1rem]">删除</span>
          </span>
        </li>
        <li className="grid items-center ml-[.4rem] py-[.2rem] border-b border-b-[var(--border-color)] border-dashed pr-[.2rem] grid-cols-[20%_1fr_max-content] gap-[.15rem] text-[14px] text-[#333]">
          <span>Bob.Li -超级管理员B</span>
          <span>bdjkhafheuiwfhkhiureofufherhiuehfi23fcdushod</span>
          <span className="flex items-center cursor-pointer">
            <img width={15} height={15} src={closeIcon} alt="关闭" />
            <span className="ml-[.1rem]">删除</span>
          </span>
        </li>
        <li className="grid items-center ml-[.4rem] py-[.2rem] border-b border-b-[var(--border-color)] border-dashed pr-[.2rem] grid-cols-[20%_1fr_max-content] gap-[.15rem] text-[14px] text-[#333]">
          <span>管理员A</span>
          <span>暂无</span>
          <span onClick={addCb} className="flex items-center cursor-pointer">
            <img width={15} height={15} src={plusIcon} alt="添加" />
            <span className="ml-[.1rem] text-[var(--blue)]">添加</span>
          </span>
        </li>
        <li className="grid items-center ml-[.4rem] py-[.2rem] border-b border-b-[var(--border-color)] border-dashed pr-[.2rem] grid-cols-[20%_1fr_max-content] gap-[.15rem] text-[14px] text-[#333]">
          <span>Bob.Li -管理员B</span>
          <span>bdjkhafheuiwfhkhiureofufherhiuehfi23fcdushod</span>
          <span className="flex items-center cursor-pointer">
            <img width={15} height={15} src={closeIcon} alt="关闭" />
            <span className="ml-[.1rem]">删除</span>
          </span>
        </li>
        <li className="grid items-center ml-[.4rem] py-[.2rem] border-b border-b-[var(--border-color)] border-dashed pr-[.2rem] grid-cols-[20%_1fr_max-content] gap-[.15rem] text-[14px] text-[#333]">
          <span>Bob.Li -超级管理员C</span>
          <span>bdjkhafheuiwfhkhiureofufherhiuehfi23fcdushod</span>
          <span onClick={deleteCb} className="flex items-center cursor-pointer">
            <img width={15} height={15} src={closeIcon} alt="关闭" />
            <span className="ml-[.1rem]">删除</span>
          </span>
        </li>
      </ul>
      <ModalComp
        title={(isAddManage ? "添加" : "移除") + "管理员"}
        showFooter={!isAddManage}
        modalOpen={mangeOpen}
        onOk={manageCb}
        onCancel={manageCb}
      >
        {isAddManage ? (
          <Form layout="vertical" onFinish={onFinish} initialValues={addmanage}>
            <Form.Item
              label={
                <span className="text-[var(--border-color)]">管理员A</span>
              }
              className="px-[.3rem]"
              name="name"
            >
              <Input
                size="large"
                placeholder="请输入"
                defaultValue={addmanage.name}
              />
            </Form.Item>
            <Form.Item className="border-t border-t-[var(--border-color)]">
              <div className="flex justify-end py-[.2rem] pr-[.2rem]">
                <Button onClick={manageCb} className="mr-[.1rem]">取消</Button>
                <Button onClick={manageCb} type="primary" htmlType="submit">
                  确定
                </Button>
              </div>
            </Form.Item>
          </Form>
        ) : (
          <div className="text-center text-[14px] text-[#333] grid place-items-center">
            <p className="leading-normal">确定移除管理员A</p>
            <p className="leading-normal">owrijwfnwm0isd992rsd</p>
          </div>
        )}
      </ModalComp>
    </>
  );
};
export default MangeSite;
