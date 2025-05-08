import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PastLogs from "./pages/PastLogs";
import AuthenticatedRoute from "./containers/AuthenticatedRoute";
import { authenticate, resetAuthenticateState } from "./context/slices/auth.slice";

function App() {
  const dispatch = useDispatch();
  const { authenticationIsLoading, isAuthenticated } =  useSelector((state)=>state.auth)
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));

  useEffect(()=> {
    if(authTokens && !isAuthenticated){
      dispatch(authenticate())
    } else {
      dispatch(resetAuthenticateState())
    }
  },[])

  if(authenticationIsLoading){
    return <div className="h-screen flex justify-center items-center">
    <div>
      <p>Waiting.....................</p>
    </div>
  </div>
  }
  return (
    <Router>
      <main className="bg-[#F5F5F7] h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthenticatedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/past-logs" element={<PastLogs />} />
          </Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App
