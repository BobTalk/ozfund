import TableSend from "./table";
import MoreBtn from "@/Components/MoreBtn";
const Record = () => {
  return (
    <>
      <div className="bg-white rounded-[var(--border-radius)] pb-[var(--gap14)]">
        <TableSend />
      </div>
      <MoreBtn />
    </>
  );
};
export default Record;
