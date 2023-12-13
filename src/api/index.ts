import _http from "../Https";
let env = process.env.NODE_ENV == 'development' ? '/' : '/api/'
let rootPathPrefix = `${env}root/`
const adminPrefix = `${env}admin/`
const contractPrefix = `${env}contract/`
const totoPrefix = `${env}toto/`
export const GetAccessKeyInterface = () => {
  return _http.getReq({
    url: `${adminPrefix}/getAccessKey`
  })
}
export const LoginInterface = (data) => {
  return _http.postReq({
    url: `${adminPrefix}/login`,
    data
  })
}
export const LogoutInterface = () => {
  return _http.getReq({
    url: `${adminPrefix}/logout`
  })
}
export const GetCrtIpAddreaaInterface = () => {
  return _http.getReq({
    url: `${adminPrefix}/myIp`
  })
}
export const GetAdminInfoInterface = (params) => {
  return _http.getReq({
    url: `${adminPrefix}/getAdminInfo`,
    params
  })
}
export const CloseAccountInterface = (params) => {
  return _http.putReq({
    url: `${adminPrefix}/closeAdmin`,
    params
  })
}
export const UpdatePasswordInterface = () => {
  return _http.putReq({
    url: `${adminPrefix}/updateAdminPassword`
  })
}
export const GetPermissionInterface = () => {
  return _http.getReq({
    url: `${adminPrefix}/findPermissionList`
  })
}
export const FindListInterface = (data) => {
  return _http.postReq({
    url: `${adminPrefix}/findAdminList`,
    data
  })
}
// 新增员工
export const AddStaffInterface = (data) => {
  return _http.postReq({
    url: `${adminPrefix}/openAdmin`,
    data
  })
}
export const GetLoginLogInterface = (data) => {
  return _http.postReq({
    url: `${adminPrefix}/findAdminLoginLog`,
    data
  })
}
export const GetOperationLogInterface = (data) => {
  return _http.postReq({
    url: `${adminPrefix}/findAdminOperationLog`,
    data
  })
}
export const SwitchFreezeAccountInterface = (params) => {
  return _http.putReq({
    url: `${adminPrefix}/switchFreezeAdmin`,
    params
  })
}
export const ResetPwdInterface = (params) => {
  return _http.putReq({
    url: `${adminPrefix}/resetAdminPassword`,
    params
  })
}
export const UpdatePermissionInterface = (data) => {
  return _http.putReq({
    url: `${adminPrefix}/setAdminPermission`,
    data
  })
}
export const GetIpListInterface = (data) => {
  return _http.postReq({
    url: `${adminPrefix}/findAdminIpList`,
    data
  })
}
export const AddIpInterface = (data) => {
  return _http.postReq({
    url: `${adminPrefix}/addAdminIp`,
    data
  })
}
export const DeleteIpInterface = (params) => {
  return _http.deleteReq({
    url: `${adminPrefix}/deleteAdminIp`,
    params
  })
}
export const GetIpLogListInterface = (data) => {
  return _http.postReq({
    url: `${adminPrefix}/findAdminIpLogList`,
    data
  })
}
export const UpdateInfoInterface = (data) => {
  return _http.putReq({
    url: `${adminPrefix}/updateAdminInfo`,
    data
  })
}
export const EmailSubscribeInterface = (params) => {
  return _http.getReq({
    url: `${rootPathPrefix}subscribe`,
    params
  })
}
// /findSubscribeEmail 获取订阅邮箱
export const GetEmailListInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}findSubscribeEmail`,
    data
  })
}
// /findEmailTemplate 获取邮箱模板
export const GetEmailTempInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}findEmailTemplate`,
    data
  })
}



// /addEmailTemplate 添加邮箱模板
export const AddEmailTempInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}addEmailTemplate`,
    data
  })
}
export const UpdateEmailTempInterface = (data) => {
  return _http.putReq({
    url: `${rootPathPrefix}updateEmailTemplate`,
    data
  })
}
export const DeleteEmailTempInterface = (params) => {
  return _http.putReq({
    url: `${rootPathPrefix}deleteEmailTemplate`,
    params
  })
}
// /getEmailTemplate?id= 获取邮箱模板内容
export const GetEmailTempInfoInterface = (params) => {
  return _http.postReq({
    url: `${rootPathPrefix}getEmailTemplate`,
    params
  })
}
export const GetEmailAllTempInfoInterface = () => {
  return _http.getReq({
    url: `${rootPathPrefix}findAllEmailTemplate`,
  })
}
// 0 获取定时邮件任务 1 获取定时邮件发送记录
export const GetEmailTimeTaskInterface = (data, flag) => {
  return _http.postReq({
    url: `${rootPathPrefix}findEmailTask/${flag}`,
    data
  })
}
// /addEmailTask 添加邮件任务
export const AddEmailTaskInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}addEmailTask`,
    data
  })
}

// /updateEmailTask 修改邮件任务
export const UpdateEmailTaskInterface = (data) => {
  return _http.putReq({
    url: `${rootPathPrefix}updateEmailTask`,
    data
  })
}
// /deleteEmailTask?id= 删除邮件任务
export const DeleteEmailTaskInterface = (params) => {
  return _http.deleteReq({
    url: `${rootPathPrefix}deleteEmailTask`,
    params
  })
}
// /findAnnouncementList 获取公告列表
export const GetNoticeListInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}findAnnouncementList`,
    data
  })
}
// /addAnnouncement 添加公告
export const AddNoticeInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}addAnnouncement`,
    data
  })
}
// /updateAnnouncement 修改公告
export const UpdateNoticeInterface = (data) => {
  return _http.putReq({
    url: `${rootPathPrefix}updateAnnouncement`,
    data
  })
}
// /deleteAnnouncement?id= 删除公告
export const DeleteNoticeInterface = (params) => {
  return _http.deleteReq({
    url: `${rootPathPrefix}deleteAnnouncement`,
    params
  })
}
// /switchTopAnnouncement 开关公告置顶
export const SwitchNoticeInterface = (params) => {
  return _http.putReq({
    url: `${rootPathPrefix}switchTopAnnouncement`,
    params
  })
}
// 进程
// /findCourseList 获取进程列表
export const GetProcessInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}findCourseList`,
    data
  })
}
// /addCourse 添加进程
export const AddProcessInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}addCourse`,
    data
  })
}
// /updateCourse 修改进程
export const UpdateProcessInterface = (data) => {
  return _http.putReq({
    url: `${rootPathPrefix}updateCourse`,
    data
  })
}
// /deleteCourse?id 删除进程
export const DeleteProcessInterface = (params) => {
  return _http.deleteReq({
    url: `${rootPathPrefix}deleteCourse`,
    params
  })
}
// /switchTopCourse 开关进程置顶
export const SwitchProcessInterface = (params) => {
  return _http.putReq({
    url: `${rootPathPrefix}switchTopCourse`,
    params
  })
}
// /findDynamicList 获取动态列表
export const GetTrendsInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}findDynamicList`,
    data
  })
}
// /updateDynamic 修改动态
export const UpdateTrendsInterface = (data) => {
  return _http.putReq({
    url: `${rootPathPrefix}updateDynamic`,
    data
  })
}
// /updateDynamic 新增动态
export const AddTrendsInterface = (data) => {
  return _http.putReq({
    url: `${rootPathPrefix}addDynamic`,
    data
  })
}
// /deleteDynamic 删除动态
export const DeleteTrendsInterface = (params) => {
  return _http.deleteReq({
    url: `${rootPathPrefix}deleteDynamic`,
    params
  })
}
// /switchTopDynamic 开关动态置顶
export const SwitchTrendsInterface = (params) => {
  return _http.putReq({
    url: `${rootPathPrefix}switchTopDynamic`,
    params
  })
}

// /findAllIssueType 获取问题分类
export const GetProbelmTypeInterface = () => {
  return _http.getReq({
    url: `${rootPathPrefix}findAllIssueType`,
  })
}
// /addIssueType 添加问题分类
export const AddProbelmTypeInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}addIssueType`,
    data
  })
}
// /updateIssueType 修改问题分类
export const UpdateProbelmTypeInterface = (data) => {
  return _http.putReq({
    url: `${rootPathPrefix}updateIssueType`,
    data
  })
}
// /deleteIssueType?id= 删除问题分类
export const DeleteProbelmTypeInterface = (params) => {
  return _http.deleteReq({
    url: `${rootPathPrefix}deleteIssueType`,
    params
  })
}
// /switchTopIssueType 开关问题分类置顶
export const SwitchProbelmTypeInterface = () => {
  return _http.getReq({
    url: `${rootPathPrefix}switchTopIssueType`,
  })
}
// /findIssueList 获取问题
export const GetProbelmInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}findIssueList`,
    data
  })
}
// /addIssue 添加问题
export const AddProbelmInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}addIssue`,
    data
  })
}
// /updateIssue 修改问题
export const UpdateProbelmInterface = (data) => {
  return _http.putReq({
    url: `${rootPathPrefix}updateIssue`,
    data
  })
}
// /deleteIssue?id= 删除问题
export const DeleteProbelmInterface = (params) => {
  return _http.deleteReq({
    url: `${rootPathPrefix}deleteIssue`,
    params
  })
}
// /switchTopIssue?id= 开关问题置顶
export const SwitchProbelmInterface = (params) => {
  return _http.getReq({
    url: `${rootPathPrefix}switchTopIssue`,
    params
  })
}
// /contract/addAdmin?address= 添加管理员
export const AddManageInterface = (data) => {
  return _http.postReq({
    url: `${contractPrefix}addAdmin`,
    data
  })
}
// /contract/removeAdmin?address= 移除管理员
export const RemoveManageInterface = (params) => {
  return _http.deleteReq({
    url: `${contractPrefix}removeAdmin`,
    params
  })
}
// /contract/addSuperAdmin?address= 添加超级管理员
export const AddSuperManageInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}addSuperAdmin`,
    params
  })
}
// /contract/removeSuperAdmin?address= 移除超级管理员
export const RemoveSuperManageInterface = (params) => {
  return _http.deleteReq({
    url: `${contractPrefix}removeSuperAdmin`,
    params
  })
}
// /contract/confirgurePoolAutoAddress?address=&poolId= 配置矿池自动空投地址
export const AutoAirdropInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}confirgurePoolAutoAddress`,
    params
  })
}
// /contract/distribute {poolId [address amount]} 批量转账
export const TransferAccountsInterface = (data) => {
  return _http.postReq({
    url: `${contractPrefix}distribute`,
    data
  })
}
// /contract/withdrawToken {contractAddress tokenContractAddress  spenderAddress amount} 提取合约token
export const WithdrawTokenInterface = (data) => {
  return _http.postReq({
    url: `${contractPrefix}withdrawToken`,
    data
  })
}
// /contract/dischargeStake?address= 解押
export const DischargeStakeInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}dischargeStake`,
    params
  })
}
// /contract/switchExchane 开关交易
export const SwitchExchaneInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}switchExchane`,
    params
  })
}
// /contract/mint?address=&amount= 增发
export const AddPublishInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}mint`,
    params
  })
}
// /contract/freezeAddress?address= 冻结地址
export const FreezeAddressInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}freezeAddress`,
    params
  })
}
// /contract/burnFreezeAddressCoin?address= 销毁冻结地址资产
export const DestroyFreezeAddressInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}burnFreezeAddressCoin`,
    params
  })
}
// /contract/allowSupportedAddress?address=&name= 新增可兑换代币
export const AddExchangeTokensInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}allowSupportedAddress`,
    params
  })
}
// /contract/removeAllowSupportedAddress?address= 移除可兑换代币
export const RemoveExchangeTokensInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}removeAllowSupportedAddress`,
    params
  })
}

// contract/findTransactionList 获取代办事务
export const GetTodoTaskInterface = (data = {}) => {
  return _http.postReq({
    url: `${contractPrefix}findTransactionList`,
    data
  })
}
// contract/findContractAdmin获取管理员设置
export const GetContractSystemInterface = () => {
  return _http.getReq({
    url: `${contractPrefix}findContractAdmin`,
  })
}
// contract/findPoolAutoAddress 获取矿池空托地址
export const GetAirDropAddressInterface = () => {
  return _http.getReq({
    url: `${contractPrefix}findPoolAutoAddress`,

  })
}
// contract/findPoolProduceProportion 获取矿池生产比例
export const GetProductionRatioInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}findPoolProduceProportion`,
    params
  })
}
// contract/findContractSetting 获取Toto合约设置
export const GetTotoConfigInterface = (params) => {
  return _http.getReq({
    url: `${contractPrefix}findPoolProduceProportion`,
    params
  })
}
// toto_exchange  toto交易开启状态  1开启 0关闭
export const SwitchTotoBussisInterface = (params) => {
  return _http.getReq({
    url: `${totoPrefix}toto_exchange`,
    params
  })
}

// toto_owner  toto调度地址
export const DispatchAddrInterface = (params) => {
  return _http.getReq({
    url: `${totoPrefix}toto_owner`,
    params
  })
}
// toto_produce_limit toto生产总量(生产总量限制)
export const ProductionVolumeInterface = (params) => {
  return _http.getReq({
    url: `${totoPrefix}toto_produce_limit`,
    params
  })
}