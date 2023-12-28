
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfigComp from "./Routers";
import ErrorBoundary from "../error-boundary";
import { WagmiConfig } from "wagmi";
import { wagmiConfigScope } from "./config/wagmi.ts";
function App() {
  return (
    <ErrorBoundary>
      <WagmiConfig config={wagmiConfigScope}>
      <Router>
        <RouterConfigComp />
      </Router>
      </WagmiConfig>
    </ErrorBoundary>

  )
}
export default App
