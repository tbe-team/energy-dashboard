import Dashboard from "./pages/Dashboard"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DeviceDetail from "./pages/DeviceDetail";
function App() {

  return (
    <>
      <main className="h-full bg-slate-100">
        <Router>
          <Routes>
            <Route
              path='/*'
              element={
                <>
                  <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/detail' element={<DeviceDetail />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App
