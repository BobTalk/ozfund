// import { createPublicClient, http } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { arbitrum, mainnet } from 'wagmi/chains'
const chains = [mainnet, arbitrum]
console.log('chains: ', chains);
const {publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

const wagmiConfigScope = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    })
  ],
  publicClient,
  webSocketPublicClient
})

export {
  wagmiConfigScope
}