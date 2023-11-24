import { ModalTitle } from "@/Components/Modal";
import TableAllocation from "./table";
import { useState } from "react";
import MoreBtn from "@/Components/MoreBtn";

const ChildAssets = (props) => {
  return (
    <>
      <div className="mt-[var(--gap15)] pb-[var(--gap14)] bg-white rounded-[0_0_var(--border-radius)_var(--border-radius)]">
        <TableAllocation />
      </div>
      <MoreBtn />
    </>
  );
};
export default ChildAssets;
