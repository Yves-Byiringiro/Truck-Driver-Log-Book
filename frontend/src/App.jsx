import { BrowserRouter as Router, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PastLogs from "./pages/PastLogs";

function App() {
  return (
    <Router>
      <main className="bg-[#F5F5F7] h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/past-logs" element={<PastLogs />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
