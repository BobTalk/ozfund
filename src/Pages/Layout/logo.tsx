import React from "react";
import logo from "@/assets/images/logo_text.svg";
import styleScope from "./logo.module.less";
import { mergeClassName } from "@/utils/base";
const LayoutLogo = ({ collapsed }:any) => {
  return (
    <div
      className={mergeClassName(
        styleScope["logo-box"],
        "grid place-content-center"
      )}
    >
      <img src={logo} className="aspect-square" alt="logo" />
    </div>
  );
};

export default LayoutLogo;
