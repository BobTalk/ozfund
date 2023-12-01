import _http from "../Https";
let env = process.env.NODE_ENV == 'development'?'/':'/api/'
const adminPrefix = `${env}admin`
export const GetAccessKeyInterface = ()=>{
  return _http.getReq({
    url: `${adminPrefix}/getAccessKey`
  })
}
export const LoginInterface = (data)=>{
  return _http.postReq({
    url: `${adminPrefix}/login`,
    data
  })
}
export const LogoutInterface = ()=>{
  return _http.getReq({
    url: `${adminPrefix}/logout`
  })
}
export const GetCrtIpAddreaaInterface = ()=>{
  return _http.getReq({
    url: `${adminPrefix}/myIp`
  })
}
export const GetAdminInfoInterface = (params)=>{
  return _http.getReq({
    url: `${adminPrefix}/getAdminInfo`,
    params
  })
}
export const CloseAccountInterface = (params)=>{
  return _http.putReq({
    url: `${adminPrefix}/closeAdmin`,
    params
  })
}
export const UpdatePasswordInterface = ()=>{
  return _http.putReq({
    url: `${adminPrefix}/updateAdminPassword`
  })
}
export const GetPermissionInterface = ()=>{
  return _http.getReq({
    url: `${adminPrefix}/findPermissionList`
  })
}
export const FindListInterface = (data)=>{
  return _http.postReq({
    url: `${adminPrefix}/findAdminList`,
    data
  })
}
// 新增员工
export const AddStaffInterface = (data)=>{
  return _http.postReq({
    url: `${adminPrefix}/openAdmin`,
    data
  })
}
export const GetLoginLogInterface = ()=>{
  return _http.getReq({
    url: `${adminPrefix}/findAdminLoginLog`
  })
}
export const GetOperationLogInterface = ()=>{
  return _http.getReq({
    url: `${adminPrefix}/findAdminOperationLog`
  })
}
export const SwitchFreezeAccountInterface = (params)=>{
  return _http.putReq({
    url: `${adminPrefix}/switchFreezeAdmin`,
    params
  })
}
export const ResetPwdInterface = (params)=>{
  return _http.putReq({
    url: `${adminPrefix}/resetAdminPassword`,
    params
  })
}
export const UpdatePermissionInterface = (data)=>{
  return _http.putReq({
    url: `${adminPrefix}/setAdminPermission`,
    data
  })
}
export const GetIpListInterface = ()=>{
  return _http.getReq({
    url: `${adminPrefix}/findAdminIpList`
  })
}
export const AddIpInterface = ()=>{
  return _http.getReq({
    url: `${adminPrefix}/addAdminIp`
  })
}
export const GetIpLogListInterface = ()=>{
  return _http.getReq({
    url: `${adminPrefix}/findAdminIpLogList`
  })
}
export const UpdateInfoInterface = (data)=>{
  return _http.putReq({
    url: `${adminPrefix}/updateAdminInfo`,
    data
  })
}