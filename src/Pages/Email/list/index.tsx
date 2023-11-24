import { ConfigProvider, Select } from "antd";
import TableEmail from "./table";
import MoreBtn from "@/Components/MoreBtn";
import { mergeClassName } from "@/utils/base";
const List = () => {
  return (
    <>
      <div className="flex items-center bg-white p-[var(--gap20)] rounded-[var(--border-radius)]">
        <span className="text-[14px] text-[#666] mr-[var(--gap10)]">分类</span>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 2,
            },
          }}
        >
          <Select placeholder="请选择" className="w-[1.63rem] h-[.36rem]" options={[]} />
        </ConfigProvider>
      </div>
      <div
        className={mergeClassName(
          "bg-white rounded-[var(--border-radius)] mt-[var(--gap15)] pb-[var(--gap14)]"
        )}
      >
        <TableEmail />
      </div>
      <MoreBtn />
    </>
  );
};
export default List;
