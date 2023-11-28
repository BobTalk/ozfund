import { Button, ConfigProvider } from "antd";

const ModalFooter = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          controlHeight: 32,
        },
      }}
    >
      <div className="flex justify-end py-[var(--gap20)] pr-[var(--gap30)] border-t border-t-[#e6e6e6]">
        {props.only ? (
          <>
            <Button
              type="primary"
              className="w-[.8rem]"
              onClick={(e) => props?.onSubmit(e)}
            >
              确定
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={(e) => props?.onCancel(e)}
              className="mr-[.1rem] w-[.8rem]"
            >
              取消
            </Button>
            <Button className="w-[.8rem]" type="primary" htmlType="submit">
              确定
            </Button>
          </>
        )}
      </div>
    </ConfigProvider>
  );
};
export default ModalFooter