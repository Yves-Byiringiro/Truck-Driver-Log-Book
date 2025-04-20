import { BrowserRouter as Router, Route, Routes } from "react-router"
import Home from "./pages/Home"
import PastLogs from "./pages/PastLogs"

function App() {
  return (
    <Router>
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/past-logs" element={<PastLogs />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
