// @ts-nocheck
import Web3 from "web3";
import Erc20ContractAbi from "@/assets/json/erc20Abi.json";
import OzcoinExpandAbi from "@/assets/json/ozcoinExpandAbi.json";
import TotoExpandAbi from "@/assets/json/totoExpandAbi.json";
import OzcoinStakeExpandAbi from "@/assets/json/ozcoinStakeExpandAbi.json";
import MultiSigWalletAbi from "@/assets/json/multiSigWalletAbi.json";
import ContractAbi from "@/assets/json/contractAbi.json";
// const MultiSigWalletAddress = "0x11CACE84a9408dAD3885f89eEb9B73949e12040E"
// const OZCoinAddress = "0x08E73707Be9Ad704EeF948D21e3996787C1e9E74"
// const TotoAddress = "0x1DE70DBfa3f7E24EF7B0eb671c62D67E369f3Fae"
// const OZCoinTotoStakeAddress = "0xe64b6b14d82742DfC2A0292b6BAaA3C11Aba95F2"
// const BUSDAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
let { VITE_MultiSigWalletAddress: MultiSigWalletAddress, VITE_OZCoinAddress: OZCoinAddress, VITE_TotoAddress: TotoAddress, VITE_BUSDAddress: BUSDAddress, VITE_OZCoinTotoStakeAddress: OZCoinTotoStakeAddress } = import.meta.env
let ethereum = (window as any).ethereum;
let web3 = new Web3(ethereum);
export const useWallatInfo = () => {
  // 签名
  let signature = ({ accountAddress, chainId, id = 0 }) => signatureFn(accountAddress, chainId, id = 0)
  // 开启/关闭TOTO出售
  let openOrCloseTotoSell = ({ accountAddress, chainId, sellFlag = false }) => openOrCloseTotoSellFn({ accountAddress, chainId, sellFlag })
  // 设置toto发行总量
  let setTotoPubulishTotal = ({ accountAddress, chainId, total = 0 }) => setTotoPubulishTotalFn({ accountAddress, chainId, total })
  // 设置toto发行量
  let setTotoPubulish = ({ accountAddress, chainId, num = 0 }) => setTotoPubulishFn({ accountAddress, chainId, num })
  // 生产分配比例
  let productionAllocationRatio = ({ accountAddress, chainId, objVal = {
    team: 0,
    support: 0,
    fund: 0,
    pledge: 0,
    mining: 0,
    vipMining: 0
  } }) => productionAllocationRatioFn({ accountAddress, chainId, objVal })
  // 提取合约中的token
  let extractingTokensFromContracts = ({ accountAddress, chainId, objVal = {
    select: "Toto",
    tokenSelect: "Toto",
    number: 0
  } }) => extractingTokensFromContractsFn({ accountAddress, chainId, objVal })
  //  自动空投地址
  let automaticAirdropAddress = ({ accountAddress, chainId, objVal = {
    id: '', // 类型标识
    address: ''
  } }) => automaticAirdropAddressFn({ accountAddress, chainId, objVal })
  // 添加管理员
  let addManageSytem = ({ accountAddress, chainId, manageName = '' }) => addManageSytemFn({ accountAddress, chainId, manageName })
  // 移除管理员
  let removeManageSytem = ({ accountAddress, chainId, manageName = '' }) => removeManageSytemFn({ accountAddress, chainId, manageName })
  // 添加超级管理员
  let addSuperManageSytem = ({ accountAddress, chainId, manageName = '' }) => addSuperManageSytemFn({ accountAddress, chainId, manageName })
  // 移除超级管理员
  let removeSuperManageSytem = ({ accountAddress, chainId, manageName = '' }) => removeSuperManageSytemFn({ accountAddress, chainId, manageName })
  // 增发ozc
  let addPublishOzc = ({ accountAddress, chainId, tatol = 0 }) => addPublishOzcFn({ accountAddress, chainId, tatol })
  // 增发toto
  let addPublishToto = ({ accountAddress, chainId, tatol = 0 }) => addPublishTotoFn({ accountAddress, chainId, tatol })
  // 冻结地址
  let frezzAddress = ({ accountAddress, chainId, address = '' }) => frezzAddressFn({ accountAddress, chainId, address })
  // 销毁地址
  let destroyAddress = ({ accountAddress, chainId, objVal = { address: '', num: 0 } }) => destroyAddressFn({ accountAddress, chainId, objVal })
  // 更改Toto调度地址
  let changeTotoSchedulingAddress = ({ accountAddress, chainId, address = '' }) => changeTotoSchedulingAddressFn({ accountAddress, chainId, address })
  // OZC新增某代币兑换
  let addTokenExchange = ({ accountAddress, chainId, address = '' }) => addTokenExchangeFn({ accountAddress, chainId, address })
  // OZC移除某代币兑换
  let removeTokenExchange = ({ accountAddress, chainId, address = '' }) => removeTokenExchangeFn({ accountAddress, chainId, address })
  // TOTO解押
  let decompressionAddress = ({ accountAddress, chainId, address = '' }) => decompressionAddressFn({ accountAddress, chainId, address })
  // 批量转账
  let batchAccount = ({ accountAddress, chainId, poolId, list = [] }) => batchAccountFn({ accountAddress, chainId, poolId, list })
  // 通过Token获取代币数量
  let getAmountByToken = ({ accountAddress, token }) => getAmountByTokenFn({ accountAddress, token })
// 通过地址获取ozc数量
  let getAmountByAddress = ({ address }) => getAmountByAddressFn({ address })

  return {
    Web3,
    signature,
    getAmountByAddress,
    openOrCloseTotoSell,
    setTotoPubulishTotal,
    setTotoPubulish,
    productionAllocationRatio,
    extractingTokensFromContracts,
    automaticAirdropAddress,
    addManageSytem,
    removeManageSytem,
    addSuperManageSytem,
    removeSuperManageSytem,
    addPublishOzc,
    addPublishToto,
    frezzAddress,
    destroyAddress,
    changeTotoSchedulingAddress,
    addTokenExchange,
    removeTokenExchange,
    decompressionAddress,
    batchAccount,
    getAmountByToken
  }
}

function getAmountByAddressFn({address }){
  if(!address)return Promise.reject("地址不存在")
  // 定义合约
  let {erc20ContractAbi} = initAbi()
  let myContract = new web3.eth.Contract(erc20ContractAbi, OZCoinAddress,{
    from: address
  });
  return myContract.methods.balanceOf(address).call().then(res=>{
   return web3.utils.toWei(String(res), "ether")
  })
  // console.log('res: ', res);
}
async function getAmountByTokenFn({ accountAddress, token }) {
  token = token.toLocaleLowerCase()
  let abi = initAbi().erc20ContractAbi;
  let tContractAddress;
  switch (token) {
    case "ozcoin":
      tContractAddress = OZCoinAddress;
      break;
    case "toto":
      tContractAddress = TotoAddress
      break;
    default:
      tContractAddress = BUSDAddress
  }
  // web3.eth.getBalance(accountAddress).then(res=>console.log(res)); // 查询以太币余额
  // 定义合约
  let myContract = new web3.eth.Contract(abi, tContractAddress, {
    from: accountAddress, // default from address
    gasLimit: 70000,
    gasPrice: '100000000' // default gas price in wei, 10 gwei in this case
  });
  myContract.methods.balanceOf(accountAddress).call({ from: accountAddress }, function(error, result) {
    if (!error) {
      let ubalance = state.web3.utils.fromWei(String(result), 'ether');
      console.log(ubalance, 'ubalance')
    } else {
      console.log(error, '获取金额错误');
    }
  });
}
function batchAccountFn({ accountAddress, chainId, poolId, list }) {
  let transferInfos = [];
  for (let index = 0; index < list.length; index++) {
    let { address, amount } = list[index];
    transferInfos.push([address, web3.utils.toWei(amount, "ether")])
  }
  let { totoExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(totoExpandAbi, TotoAddress, {
    from: accountAddress,
  });
  let submitTransactionFunctionData = genTransactionFunction(TotoAddress, myContract.methods.distribute(poolId, transferInfos).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function decompressionAddressFn({ accountAddress, chainId, address }) {
  let { ozcoinStakeExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(ozcoinStakeExpandAbi, OZCoinTotoStakeAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(OZCoinTotoStakeAddress, myContract.methods.changeAccountStakeExpirationTimestamp(address).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function removeTokenExchangeFn({ accountAddress, chainId, address }) {
  let { ozcoinExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(ozcoinExpandAbi, OZCoinAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(OZCoinAddress, myContract.methods.removeSupportedAddressAllow(address).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function addTokenExchangeFn({ accountAddress, chainId, address }) {
  let { ozcoinExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(ozcoinExpandAbi, OZCoinAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(OZCoinAddress, myContract.methods.allowSupportedAddress(address).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function changeTotoSchedulingAddressFn({ accountAddress, chainId, address }) {
  let { totoExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(totoExpandAbi, TotoAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(TotoAddress, myContract.methods.setContractOwner(address).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}

function destroyAddressFn({ accountAddress, chainId, objVal }) {
  let { ozcoinExpandAbi } = initAbi()
  let total = web3.utils.toWei(objVal.num, 'ether');
  let myContract = new web3.eth.Contract(ozcoinExpandAbi, OZCoinAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(OZCoinAddress, myContract.methods.burnFreezeAddressCoin(objVal.address, total).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function frezzAddressFn({ accountAddress, chainId, address }) {
  let { ozcoinExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(ozcoinExpandAbi, OZCoinAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(OZCoinAddress, myContract.methods.freezeAddress(address).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function addPublishTotoFn({ accountAddress, chainId, tatol:val }) {
  let { erc20ContractAbi } = initAbi()
  let myContract = new web3.eth.Contract(erc20ContractAbi, OZCoinAddress, {
    from: accountAddress, // default from address
  });
  let mintUint = web3.utils.toWei(String(val), "ether");
  let submitTransactionFunctionData = genTransactionFunction(TotoAddress, myContract.methods.mint(accountAddress, mintUint).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function addPublishOzcFn({ accountAddress, chainId, tatol:val }) {
  let { erc20ContractAbi } = initAbi()
  console.log('val: ', val);
  let mintUint = web3.utils.toWei(String(val), "ether");
  let myContract = new web3.eth.Contract(erc20ContractAbi, OZCoinAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(OZCoinAddress, myContract.methods.mint(accountAddress, mintUint).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function removeSuperManageSytemFn({ accountAddress, chainId, manageName }) {
  let { multiSigWalletAbi } = initAbi()
  let myContract = new web3.eth.Contract(multiSigWalletAbi, MultiSigWalletAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(MultiSigWalletAddress, myContract.methods.removeSuperAdmin(manageName).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function addSuperManageSytemFn({ accountAddress, chainId, manageName }) {
  let { multiSigWalletAbi } = initAbi()
  let myContract = new web3.eth.Contract(multiSigWalletAbi, MultiSigWalletAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(MultiSigWalletAddress, myContract.methods.addSuperAdmin(manageName).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function addManageSytemFn({ accountAddress, chainId, manageName }) {
  let { multiSigWalletAbi } = initAbi()
  let myContract = new web3.eth.Contract(multiSigWalletAbi, MultiSigWalletAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(MultiSigWalletAddress, myContract.methods.addAdmin(manageName).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function removeManageSytemFn({ accountAddress, chainId, manageName }) {
  let { multiSigWalletAbi } = initAbi()
  let myContract = new web3.eth.Contract(multiSigWalletAbi, MultiSigWalletAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(MultiSigWalletAddress, myContract.methods.removeAdmin(manageName).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function automaticAirdropAddressFn({ accountAddress, chainId, objVal }) {
  let { totoExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(totoExpandAbi, TotoAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(TotoAddress, myContract.methods.configurePoolAutoAddress(objVal.id, objVal.address).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function extractingTokensFromContractsFn({ accountAddress, chainId, objVal }) {
  let tContractAddress;
  switch (objVal.select) {
    case "OZCoin":
      tContractAddress = OZCoinAddress;
      break;
    case "Toto":
      tContractAddress = OZCoinAddress;
      break;
    case "Stake":
      tContractAddress = OZCoinTotoStakeAddress;
      break;
  }
  let tokenContractAddress;
  switch (objVal.tokenSelect) {
    case "OZCoin":
    case "Toto":
      tokenContractAddress = OZCoinAddress;
      break;
    case "Stake":
      tokenContractAddress = OZCoinTotoStakeAddress;
      break;
    case "BUSD":
      tokenContractAddress = BUSDAddress;
      break;
  }
  let { erc20ContractAbi } = initAbi()
  let withdrawTokenAmount = web3.utils.toWei(String(objVal.number), "ether");
  let myContract = new web3.eth.Contract(erc20ContractAbi, tContractAddress, {
    from: accountAddress,
  });
  myContract.methods.withdrawToken(tokenContractAddress, accountAddress, withdrawTokenAmount).encodeABI()
  let submitTransactionFunctionData = genTransactionFunction(tContractAddress, myContract.methods.withdrawToken(tokenContractAddress, accountAddress, withdrawTokenAmount).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function productionAllocationRatioFn({ accountAddress, chainId, objVal }) {
  let { totoExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(totoExpandAbi, TotoAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(TotoAddress, myContract.methods.setPoolDistributeProportion(...Object.values(objVal)).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function setTotoPubulishFn({ accountAddress, chainId, num }) {
  let { totoExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(totoExpandAbi, TotoAddress, {
    from: accountAddress,
  });
  let submitTransactionFunctionData = genTransactionFunction(TotoAddress, myContract.methods.setNextProduction(web3.utils.toWei(String(num), "ether")).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function setTotoPubulishTotalFn({ accountAddress, chainId, total }) {
  let { totoExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(totoExpandAbi, TotoAddress, {
    from: accountAddress,
  });
  let productionLimit = web3.utils.toWei(String(total), "ether");
  let submitTransactionFunctionData = genTransactionFunction(TotoAddress, myContract.methods.setProductionLimit(productionLimit).encodeABI(), accountAddress)
  return new Promise(resolve => {
    resolve(requestContractFunction(accountAddress, chainId, submitTransactionFunctionData))
  })
}
function openOrCloseTotoSellFn({ accountAddress, chainId, sellFlag }) {
  let tContractAddress;
  switch (sellFlag) {
    case "OZCoin":
      tContractAddress = OZCoinAddress;
      break;
    case "Toto":
      tContractAddress = TotoAddress;
      break;
  }
  let { totoExpandAbi } = initAbi()
  let myContract = new web3.eth.Contract(totoExpandAbi, tContractAddress, {
    from: accountAddress, // default from address
  });
  let submitTransactionFunctionData = genTransactionFunction(tContractAddress, myContract.methods.switchExchange().encodeABI(), accountAddress)
  return new Promise((resolve) => {
    requestContractFunction(accountAddress, chainId, submitTransactionFunctionData);
  })

}
function signatureFn(accountAddress, chainId, id) {
  let { multiSigWalletAbi } = initAbi()
  let myContract = new web3.eth.Contract(multiSigWalletAbi, MultiSigWalletAddress, {
    from: accountAddress,
  });
  let transactionId = web3.utils.toWei(String(id), "wei");
  return new Promise((resolve) => {
    resolve(requestContractFunction(accountAddress, chainId, myContract.methods.confirmTransaction(transactionId).encodeABI()))
  })

}
function initAbi(): any {
  let obj: any = {}
  obj.erc20ContractAbi = Erc20ContractAbi;
  obj.ozcoinExpandAbi = OzcoinExpandAbi;
  obj.totoExpandAbi = TotoExpandAbi;
  obj.ozcoinStakeExpandAbi = OzcoinStakeExpandAbi;
  obj.multiSigWalletAbi = MultiSigWalletAbi;
  obj.contractAbi = ContractAbi
  return obj
}
function genTransactionFunction(targetAddress, transactionFunctionData, accountAddress) {
  let dataBytes = web3.utils.hexToBytes(transactionFunctionData);
  let { multiSigWalletAbi } = initAbi()
  let myContract = new web3.eth.Contract(multiSigWalletAbi, MultiSigWalletAddress, {
    from: accountAddress, // default from address
  });
  return myContract.methods.submitTransaction(targetAddress, dataBytes).encodeABI();
}
const requestContractFunction = async (accountAddress, chainId, functionData) => {
  let ethereum = (window as any).ethereum;
  let web3: any = new Web3(ethereum);
  let nonce = await web3.eth.getTransactionCount(accountAddress, 'pending');
  var rawTransaction = {
    "from": accountAddress,
    "nonce": web3.utils.toHex(nonce),
    "to": MultiSigWalletAddress,
    "value": "0x0",
    "data": functionData,
    chainId
  };
  await ethereum.request({
    method: 'eth_sendTransaction',
    params: [rawTransaction],
  })
  console.log('钱包参数info: ', rawTransaction);
}