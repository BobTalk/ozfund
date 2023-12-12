import dayjs from "dayjs";
import { activePath, activePathToName } from "@/Pages/Layout/activeRouterConfig";
const AseKey = 'abcopekiYHJFMGTO';
// const { AES, enc, mode, pad, DES } = require('crypto-js')
import { AES, enc, mode, pad, DES } from 'crypto-js'
import { number } from "echarts";
const SessionStorage = window.sessionStorage
const mergeClassName = (...arg: string[]) => {
  let param = arg.filter(item => !['undefined', 'null'].includes(item)).filter(Boolean)
  return param.join(" ").trim()
}
const dataType = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLocaleLowerCase()
}
/**
 * @summary 加密
 * @param message 
 * @param key 
 * @returns 
 */
const encrypt = (message: string, key: string = AseKey) => {
  return AES.encrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString()
}
const encryptByDES = (message: string, key: string = AseKey) => {
  return DES.encrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString()
}
/**
 * @summary 解密
 * @param message 
 * @param key 
 * @returns 
 */
const decrypt = (message: string | null | undefined, key: string = AseKey) => {
  if (!message) return message
  return AES.decrypt(message, enc.Utf8.parse(key), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  }).toString(enc.Utf8);
}

/**
 * @summary 获取session
 * @param {*} name 
 */
function getSession(name: string) {
  if (!name.endsWith("_ozfund")) {
    name = name + "_ozfund"
  }
  let value: any = decrypt(SessionStorage.getItem(name))
  try {
    value = JSON.parse(value)
    if (value['_flag'] === 'boolean') {
      value = Boolean(Number(value.val))
    }
    return value
  } catch (error) {
    return value
  }
}
/**
* @summary 设置session
* @param {*} name 
* @param {*} value 
*/
function setSession(name: string, value: any) {
  if (dataType(value) === 'boolean') value = JSON.stringify({ _flag: 'boolean', val: Number(value) })
  else if (dataType(value) === 'object') value = JSON.stringify({ ...value, _flag: 'object' })
  if (!name.endsWith("_ozfund")) {
    name = name + "_ozfund"
  }
  return SessionStorage.setItem(name, encrypt(value))
}
/**
* @summary 移除某一个session
* @param {*} name 
*/
function removeSession(name: string) {
  return SessionStorage.removeItem(name)
}
/**
 * 
 * @returns 移除全部session
 */
function clearSession() {
  return SessionStorage.clear()
}

/**
 * @summary 千分符参数
 * @param {*} num 数据源
 */
const thousands = (num: number): string => {
  if (!num) return "0";
  if (typeof num === 'string' || typeof num === 'number') {
    return (num.toString().indexOf('.') !== -1) ? Number(num).toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }

  return num
}

// 日期处理
const timeFormate = (time: string | Date, format: string = 'YYYY-MM-DD'): string => {
  if (!time) return "--";
  return dayjs(time).format(format)
}
const formatEnum = (enumData) => {
  let enumObj = JSON.parse(JSON.stringify(enumData))
  let allKey = Object.keys(enumObj)
  // let r = allKey.slice(allKey.length / 2)
  let r = allKey.filter(item => !/^\d{1,}$/.test(item))
  return r.map(item => ({
    value: enumObj[item],
    label: item
  }))
}

const breadSite = (key:string) => {
  let activeKey = activePathToName[key];
  let activeP = activePath[key];
  if (activeKey?.length > 1) {
    return activeKey.map((item, idx, arr) => {
      return idx === arr.length - 1 || !idx
        ? { title: item }
        : { title: item, href: activeP[idx] };
    });
  } else {
    return [{ title: activePathToName?.[key]?.[0] ?? "--" }]
  }
}
function timeJoin(time, isPre = false) {
  if (!time) return null
  return isPre ? time + " 23:59:59" : time + " 00:00:00"
}
function getTableShowLine(el, btnHeight, lineHeight=55){
  return Math.round((el?.clientHeight - 64 - btnHeight) / lineHeight)
}
 const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}

 const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}
export {
  formatBalance,
  formatChainAsNum,
  timeJoin,
  getTableShowLine,
  breadSite,
  mergeClassName,
  encrypt,
  decrypt,
  thousands,
  dataType,
  setSession,
  getSession,
  removeSession,
  encryptByDES,
  timeFormate,
  clearSession,
  formatEnum
}