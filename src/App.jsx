
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfigComp from "./Routers";
import ErrorBoundary from "../error-boundary";
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <RouterConfigComp />
      </Router>
    </ErrorBoundary>
  )
}

export default App
