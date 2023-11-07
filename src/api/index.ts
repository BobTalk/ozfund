import _http from '../Https'
const staffPrefix = '/admin'
const noticPrefix = '/operate'
// 1.获取登录加密key  GET admin/getAccessKey
export const GetAccessKeyInterface = () => {
  return _http.getReq({
    url: `${staffPrefix}/getAccessKey`
  })
}
// 2.登录  POST admin/login {adminId password googleCode}
export const LoginInterFace = (data) => {
  return _http.postReq({
    url: `${staffPrefix}/login`,
    data
  })
}
// 3.登出 GET admin/logout
export const LogoutInterFace = () => {
  return _http.postReq({
    url: `${staffPrefix}/logout`,
  })
}
// 4.修改密码 PUT  admin/updatePassword {oldPassword newPassword}
export const UpdatePasswordInterFace = (data) => {
  return _http.putReq({
    url: `${staffPrefix}/updatePassword`,
    data
  })
}
// 5.修改PIN码 PUT  admin/updatePin  {oldPin newPin}
export const UpdatePinInterFace = (data) => {
  return _http.putReq({
    url: `${staffPrefix}/updatePin`,
    data
  })
}
// 6.绑定谷歌验证器 GET admin/bindGoogleAuth
export const BindGoogleAuthInterFace = (data) => {
  return _http.getReq({
    url: `${staffPrefix}/bindGoogleAuth`,
    data
  })
}
// 7.修改个人信息  PUT admin/updateBaseInfo {nickname mobile}
export const UpdateBaseInfoInterFace = (data) => {
  return _http.putReq({
    url: `${staffPrefix}/updateBaseInfo`,
    data
  })
}
// 获取个人信息
export const GetUserInfo = () => {
  return _http.getReq({
    url: `${staffPrefix}/getAdminInfo`
  })
}
// 8.通用验证PIN码 GET admin/verifyPin?pin=PIN&operationId=OPERATION_ID
export const VerifyPinInterFace = (obj: { pin: '', operationId: '' }) => {
  return _http.getReq({
    url: `${staffPrefix}/verifyPin?pin=${obj.pin}&operationId=${obj.operationId}`,
  })
}
// 9.通用谷歌验证 GET admin/verifyGoogleAuth?googleCode=GOOGLECODE&operationId=OPERATION_ID
export const VerifyGoogleAuthInterFace = (obj: { googleCode: '', operationId: '' }) => {
  return _http.getReq({
    url: `${staffPrefix}/verifyGoogleAuth?googleCode=${obj.googleCode}&operationId=${obj.operationId}`,
  })
}
// 10.获取权限列表 GET admin/findPermissionList 
export const FindPermissionListInterFace = () => {
  return _http.getReq({
    url: `${staffPrefix}/findPermissionList`,
  })
}
// 11.获取管理IP列表 POST admin/findAdminIp  {pageNo pageSize conditions}
export const FindAdminIpInterFace = (data) => {
  return _http.postReq({
    url: `${staffPrefix}/findAdminIp`,
    data
  })
}
// 12.添加管理IP GET admin/addAdminIp {ip address note}
export const AddAdminIpInterFace = (obj: { ip: '', address: '', note: '' }) => {
  return _http.getReq({
    url: `${staffPrefix}/addAdminIp?ip=${obj.ip}&address=${obj.address}&note=${obj.note}`,
  })
}
// 13.开关管理IP PUT admin/switchDisableAdminIp?id=ID
export const SwitchDisableAdminIpInterFace = (id) => {
  return _http.putReq({
    url: `${staffPrefix}/switchDisableAdminIp?id=${id}`,
  })
}
// 14.删除管理IP DELETE admin/deleteAdminIp?id=ID
export const DeleteAdminIpInterFace = (id) => {
  return _http.deleteReq({
    url: `${staffPrefix}/deleteAdminIp?id=${id}`,
  })
}
// 15.查看管理IP日志 POST admin/findAdminIpLog {pageNo pageSize conditions}
export const FindAdminIpLogInterFace = (data) => {
  return _http.postReq({
    url: `${staffPrefix}/findAdminIpLog`,
    data
  })
}
// 16.获取管理员列表 POST admin/findAdminList {pageNo pageSize conditions}
export const FindAdminListInterFace = (data) => {
  return _http.postReq({
    url: `${staffPrefix}/findAdminList`,
    data
  })
}
// 17.获取管理员登录日志 POST admin/findAdminLoginLogList {pageNo pageSize conditions}
export const FindAdminLoginLogListInterFace = (data) => {
  return _http.postReq({
    url: `${staffPrefix}/findAdminLoginLogList`,
    data
  })
}
// 18.获取管理员权限列表 GET admin/findAdminPermissionList?adminId=ADMINID
export const FindAdminPermissionListInterFace = (id) => {
  return _http.getReq({
    url: `${staffPrefix}/findAdminPermissionList?adminId=${id}`,
  })
}
// 19.获取管理员日志 POST admin/findAdminOperationLoglist  {pageNo pageSize conditions}
export const FindAdminOperationLoglistInterFace = (data) => {
  return _http.postReq({
    url: `${staffPrefix}/findAdminOperationLoglist`,
    data
  })
}
// 20.关停管理员账号 PUT admin/closeAdmin?adminId=ADMINID
export const CloseAdminInterFace = (id) => {
  return _http.putReq({
    url: `${staffPrefix}/closeAdmin?adminId=${id}`,
  })
}
// 21.冻结解冻管理员 PUT admin/switchFreezeAdmin?adminId=ADMINID
export const SwitchFreezeAdminInterFace = (id) => {
  return _http.putReq({
    url: `${staffPrefix}/switchFreezeAdmin?adminId=${id}`,
  })
}
// 22.设置员工部门 PUT admin/setAdminDepartment?adminId=ADMINID&department=DEPARTMENT
export const SetAdminDepartmentInterFace = (obj: { id: '', department: "" }) => {
  return _http.putReq({
    url: `${staffPrefix}/setAdminDepartment?adminId=${obj.id}&department=${obj.department}`,
  })
}
// 23.重置员工密码 PUT admin/resetAdminPassword?adminId=ADMINID
export const ResetAdminPasswordInterFace = (id) => {
  return _http.putReq({
    url: `${staffPrefix}/resetAdminPassword?adminId=${id}`,
  })
}
// 24.重置员工PIN码 PUT admin/resetAdminPin?adminId=ADMINID
export const ResetAdminPinInterFace = (id) => {
  return _http.putReq({
    url: `${staffPrefix}/resetAdminPin?adminId=${id}`,
  })
}
// 25.重置员工谷歌验证 PUT admin/resetAdminGoogleAuth?adminId=ADMINID
export const ResetAdminGoogleAuthInterFace = (id) => {
  return _http.putReq({
    url: `${staffPrefix}/resetAdminGoogleAuth?adminId=${id}`,
  })
}
// 26.获取公告列表 POST operate/operation/findAnnouncementList {pageNo pageSize conditions}
export const FindAnnouncementListInterFace = (data) => {
  return _http.postReq({
    url: `${noticPrefix}/operation/findAnnouncementList`,
    data
  })
}
// 27.添加公告 POST operate/operation/addAnnouncement {title content isShow isRoll}
export const AddAnnouncementInterFace = (data) => {
  return _http.postReq({
    url: `${noticPrefix}/operation/addAnnouncement`,
    data
  })
}
// 28.编辑公告 PUT operate/operation/updateAnnouncement {title content isShow isRoll}
export const UpdateAnnouncementInterFace = (data) => {
  return _http.putReq({
    url: `${noticPrefix}/operation/updateAnnouncement`,
    data
  })
}
// 29.删除公告 DELETE operate/operation/deleteAnnouncement?announcementId=ANNOUNCEMENTID
export const DeleteAnnouncementInterFace = (id) => {
  return _http.deleteReq({
    url: `${noticPrefix}/operation/deleteAnnouncement?announcementId=${id}`,
  })
}
// 30.获取提币设置 GET operate/system/findWithdrawConfig 
export const FindWithdrawConfigInterFace = () => {
  return _http.getReq({
    url: `${noticPrefix}/system/findWithdrawConfig`,
  })
}
// 31.修改提币设置 PUT operate/system/updateWithdrawConfig 
export const UpdateWithdrawConfigInterFace = () => {
  return _http.putReq({
    url: `${noticPrefix}/system/updateWithdrawConfig`,
  })
}
// 32.获取资产统计设置 GET operate/system/findUserAssetsCollectionConfig
export const FindUserAssetsCollectionConfigInterFace = () => {
  return _http.getReq({
    url: `${noticPrefix}/system/findUserAssetsCollectionConfig`,
  })
}
// 33.获取汇率 GET opearte/system/findCurrencyExchangeRate 
export const FindCurrencyExchangeRateInterFace = () => {
  return _http.getReq({
    url: `${noticPrefix}/system/findCurrencyExchangeRate`,
  })
}
// 34.获取中转地址配置 GET operate/system/findTransferWalletConfig
export const FindTransferWalletConfigInterFace = () => {
  return _http.getReq({
    url: `${noticPrefix}/system/findTransferWalletConfig`,
  })
}
// 35.修改中转地址配置 PUT operate/system/updateTransferWalletConfig
export const UpdateTransferWalletConfigInterFace = () => {
  return _http.putReq({
    url: `${noticPrefix}/system/updateTransferWalletConfig`,
  })
}

// 36.获取储备地址配置 GET operate/system/findReserveWalletConfig
export const FindReserveWalletConfigInterFace = () => {
  return _http.getReq({
    url: `${noticPrefix}/system/findReserveWalletConfig`,
  })
}
// 37.修改储备地址配置 PUT operate/system/updateReserveWalletConfig
export const UpdateReserveWalletConfigInterFace = () => {
  return _http.putReq({
    url: `${noticPrefix}/system/updateReserveWalletConfig`,
  })
}
// 38.修改手续费地址配置 PUT operate/system/updateFeeWalletConfig
export const UpdateFeeWalletConfigInterFace = () => {
  return _http.putReq({
    url: `${noticPrefix}/system/updateFeeWalletConfig`,
  })
}