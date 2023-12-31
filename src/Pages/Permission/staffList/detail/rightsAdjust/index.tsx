import { CloseOutlined, KeyOutlined, SaveOutlined } from "@ant-design/icons";
import RouteList from "@/Routers/config";
import { Button, ConfigProvider, Tree, message } from "antd";
import {
  formatEnum,
  getSession,
  mergeClassName,
  setSession,
} from "@/utils/base";
import { useCallback, useState } from "react";
import { cloneDeep } from "lodash";
import { routerMapIdEnum } from "@/Enum";
import styleScope from "./index.module.less";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { UpdatePermissionInterface } from "@/api";
import { useLocation } from "react-router-dom";
const RightsAdjust = () => {
  let routerMapIdCp = formatEnum(routerMapIdEnum);
  let activePath = getSession("activePath");
  let [stop] = useStopPropagation();
  let { state } = useLocation();
  let [treeDisabled, setTreeDisabled] = useState(true);
  let [activeTreeNode, setActiveTreeNode] = useState(activePath);
  const filterRouter = useCallback((routerList = [], parentPath = null) => {
    return routerList.map((item, index) => {
      let p = parentPath ? parentPath + "/" + item.path : item.path;
      if (item?.children?.length) {
        filterRouter(item?.children, p);
      }
      if (item.title && item.isAuth) {
        item.key = p;
        return item;
      } else {
        Reflect.deleteProperty(routerList, index);
      }
    });
  }, []);
  const treeData = filterRouter(cloneDeep(RouteList)).filter(Boolean);
  function treeCheckCb(keyList) {
    setActiveTreeNode(keyList);
  }
  async function updatePermissCb() {
    let idList = [];
    for (let index = 0; index < routerMapIdCp.length; index++) {
      const obj = routerMapIdCp[index];
      if (activeTreeNode.includes(obj["label"])) {
        idList.push(obj["value"]);
      }
    }
    let { status, message: tipInfo } = await UpdatePermissionInterface({
      adminId: state.adminId,
      permissions: idList.filter(Boolean),
    });
    if (status) {
      message.success(tipInfo);
      setTreeDisabled(!treeDisabled);
      setSession("activePath", activeTreeNode);
    } else {
      message.error(tipInfo);
    }
  }
  function changeCb(e) {
    stop(e, () => {
      setTreeDisabled(!treeDisabled);
    });
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeight: 35,
            borderRadius: 2,
          },
          Tree: {
            borderRadius: 0,
            borderRadiusSM: 0,
            controlItemBgHover: "rgba(28,99,255,0.05)",
          },
        },
      }}
    >
      <div className="h-full mt-[var(--gap15)]">
        <div className="p-[var(--gap20)] flex items-center justify-end bg-[var(--white)] rounded-[var(--border-radius)]">
          {treeDisabled ? (
            <Button
              onClick={changeCb}
              size="middle"
              type="primary"
              icon={<KeyOutlined />}
            >
              权限调整
            </Button>
          ) : (
            <>
              <Button
                onClick={updatePermissCb}
                className="text-[var(--green)] border-[var(--green)]"
                icon={<SaveOutlined />}
              >
                保存
              </Button>
              <Button
                onClick={changeCb}
                className="text-[#999] border-[#999] ml-[var(--gap10)]"
                icon={<CloseOutlined />}
              >
                取消
              </Button>
            </>
          )}
        </div>

        <Tree
          // blockNode
          onCheck={treeCheckCb}
          disabled={treeDisabled}
          defaultExpandedKeys={activeTreeNode}
          defaultCheckedKeys={activeTreeNode}
          className={mergeClassName(`${styleScope["reset-tree"]}`)}
          checkable
          treeData={treeData}
        />
      </div>
    </ConfigProvider>
  );
};
export default RightsAdjust;
