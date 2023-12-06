import _http from "../Https";
let env = process.env.NODE_ENV == 'development' ? '/' : '/api/'
let rootPathPrefix = `${env}root/`
const adminPrefix = `${env}admin`
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
export const GetIpLogListInterface = () => {
  return _http.getReq({
    url: `${adminPrefix}/findAdminIpLogList`
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
export const GetEmailTempInterface = (params) => {
  return _http.getReq({
    url: `${rootPathPrefix}findEmailTemplate`,
    params
  })
}



// /addEmailTemplate 添加邮箱模板
export const AddEmailTempInterface = (data) => {
  return _http.postReq({
    url: `${rootPathPrefix}addEmailTemplate`,
    data
  })
}
// /getEmailTemplate?id= 获取邮箱模板内容
export const GetEmailTempInfoInterface = (params) => {
  return _http.postReq({
    url: `${rootPathPrefix}getEmailTemplate`,
    params
  })
}
// 0 获取定时邮件任务 1 获取定时邮件发送记录
export const GetEmailTimeTaskInterface = (flag) => {
  return _http.getReq({
    url: `${rootPathPrefix}findEmailTask/${flag}`,
  })
}
// /addEmailTask 添加邮件任务
export const AddEmailTaskInterface = (data) => {
  return _http.getReq({
    url: `${rootPathPrefix}addEmailTask`,
    data
  })
}

// /updateEmailTask 修改邮件任务
export const UpdateEmailTaskInterface = (data) => {
  return _http.getReq({
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